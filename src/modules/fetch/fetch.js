import parsePaginationLinks from 'parse-link-header'
import eachLimit from 'async/eachLimit'
import range from 'lodash/range'
import EventEmitter from 'eventemitter3'

const PARALLEL_REQUESTS_LIMIT = 25

export default class Fetch extends EventEmitter {

    /**
     * @param {Object} fetchOptions This object will be passed to window.fetch()
     *                                (@see https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)
     * @param {Object} defaultQuery Default query params that will be appended to every request
     */
    constructor({ fetchOptions = {}, defaultQuery = {}, options = {} }) {

        super()

        this.fetchOptions = fetchOptions
        this.defaultQuery = defaultQuery
        this.options = options

    }

    /**
     * Perform a GET request to the endpoint
     * @param {string} endpoint REST API endpoint
     * @param {Object} [query] Object that will be converted to the query string
     * @returns {Promise}
     */
    async get(endpoint, query = {}) {

        const { body } = await this.doFetch(endpoint, query)

        return body

    }

    /**
     * Perform series of a GET requests to the endpoint and all links from Link header
     * @param {string} endpoint REST API endpoint
     * @param {Object} [query] Object that will be converted to the query string
     * @returns {Promise}
     */
    async getCollection(endpoint, query = {}) {
        
        const result = []
        const { body, headers } = await this.doFetch(endpoint, query)
        const pages = parsePaginationLinks(headers.get('Link'))

        Array.prototype.push.apply(result, body)

        // If collection has more than one page
        if (pages && pages.last) {

            const lastPage = parseInt(pages.last.page, 10)
            
            await this.fetchOtherPages(endpoint, query, lastPage, result)

        }

        return result

    }

    /**
     * Performs parallel requests in order to fetch all remainding pages of collection
     * @param {string} endpoint 
     * @param {Object} query 
     * @param {number} total 
     * @param {Array} result 
     * @returns {Promise.<Object>}
     */
    fetchOtherPages(endpoint, query, total, result) {

        const delta = 1 / total
        let progress = delta // As far as first page already fetched
        let current = 2

        // Emit for first page
        this.emit('progress', { progress, current: 1, total })
        
        return new Promise((resolve, reject) => eachLimit(
            range(current, total + 1),
            PARALLEL_REQUESTS_LIMIT,
            (currentPage, next) => {
            
                const optionsWithPage = Object.assign({ page: currentPage }, query)

                this.doFetch(endpoint, optionsWithPage)
                    .then(nthPageResponse => {
                        
                        Array.prototype.push.apply(result, nthPageResponse.body)
                        
                        progress += delta
                        this.emit('progress', { progress, current, total })
                        current += 1

                        return next()

                    })
                    .catch(error => next(error))

            }, 
            (finalError) => {
                
                if (finalError) return reject(finalError)
                
                return resolve(result)

            }
        ))

    }

    /**
     * 
     * @param {string} endpoint 
     * @param {Object} query
     */
    async doFetch(endpoint, query = {}) {
        
        const url = this.mergeUrl(endpoint, query)
        const fetchOptions = Object.assign({ method: 'get' }, this.fetchOptions)    
        
        return await fetch(url, fetchOptions)
            .then(this.controlAbuse.bind(this))
            .then(this.emitRateLimits.bind(this))
            .then(this.enhanceRateLimitError.bind(this))
            .then(this.checkStatus.bind(this))

    }

    mergeUrl(endpoint, query = {}) {

        const url = new URL(endpoint)
        
        // Add defaultQuery to URL's searchParams
        Object.keys(this.defaultQuery).forEach(key =>
            url.searchParams.set(key, this.defaultQuery[key])
        )

        // Add query values from args to URL's searchParams
        Object.keys(query).forEach(key =>
            url.searchParams.set(key, query[key])
        )

        return url.toString()
            
    }

    controlAbuse(response) {

        return new Promise((resolve, reject) => {

            const { status } = response
            const { isAbused } = this.options
            /**
             * We can not access 'Retry-After' as it's not in Access-Control-Expose-Headers,
             * so hardcode it here
             */
            const RETRY_AFTER = 60 

            response.clone().json().then(body => {

                if (typeof isAbused === 'function' && isAbused(status, body)) {

                    let remainedTime = RETRY_AFTER
                    const timer = setInterval(
                        () => this.emit('await-abuse', --remainedTime),
                        1000
                    )
                    
                    setTimeout(
                        () => {

                            clearInterval(timer)

                            const url = this.mergeUrl(response.url)

                            return fetch(url, this.fetchOptions)
                                .then(this.controlAbuse.bind(this))
                                .then(resolve)

                        },
                        RETRY_AFTER * 1000
                    )

                } else {

                    return resolve(response)

                }

            }).catch(error => reject(error))
        
        }) 

    }

    emitRateLimits(response) {

        const { headers } = response
        const { 
            rateLimitHeaderNameLimit,
            rateLimitHeaderNameRemaining, 
            rateLimitHeaderNameReset,
        } = this.options
        const limit = headers.get(rateLimitHeaderNameLimit)
        const remaining = headers.get(rateLimitHeaderNameRemaining)
        const reset = headers.get(rateLimitHeaderNameReset)

        this.emit('rate-limits', {
            progress: (limit !== 0) ? (remaining / limit) : 1,
            remaining,
            limit,
            reset,
        })

        return Promise.resolve(response)

    }

    enhanceRateLimitError(response) {

        return new Promise((resolve, reject) => {

            const { status, headers } = response
            const { 
                isRateLimitExceeded, 
                rateLimitHeaderNameReset,
            } = this.options
            const reset = headers.get(rateLimitHeaderNameReset)
            const timeRemained = Math.round((reset - Date.now() / 1000) / 60)

            response.clone().json().then(body => {

                if (typeof isRateLimitExceeded === 'function' && isRateLimitExceeded(status, body)) {

                    return reject(new Error(`${body.message} Recharge in ~${timeRemained} minutes`))

                }

                return resolve(response)

            }).catch(error => reject(error))
        
        }) 
            
    }
    
    /**
     * Checks response status code. If response is not ok - throws Error
     * @param {Response} response
     * @returns {Response|Error}
     * @private
     */
    async checkStatus(response) {

        if (response.status >= 200 && response.status < 300) {

            return Promise.resolve({
                headers: response.headers,
                body: await response.json(),
            })

        } else if (response.status >= 400 && response.status < 500) {

            return response
                .json()
                .then((jsonError) => Promise.reject(new Error(jsonError.message)))

        }

        return Promise.reject(new Error('Bad Gateway'))

    }

}

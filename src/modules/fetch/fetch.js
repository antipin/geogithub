import parsePaginationLinks from 'parse-link-header'
import each from 'async/each'
import range from 'lodash/range'
import EventEmitter from 'eventemitter3'

export default class Fetch extends EventEmitter {

    /**
     * @param {Object} fetchOptions This object will be passed to window.fetch()
     *                                (@see https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch)
     * @param {Object} defaultQuery Default query params that will be appended to every request
     */
    constructor({ fetchOptions = {}, defaultQuery = {} }) {

        super()

        this.fetchOptions = fetchOptions
        this.defaultQuery = defaultQuery

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
        let current = 1
        
        return new Promise((resolve, reject) => each(
            range(current, total + 1),
            (currentPage, next) => {
            
                const optionsWithPage = Object.assign({ page: currentPage }, query)

                this.doFetch(endpoint, optionsWithPage)
                    .then(nthPageResponse => {
                        
                        Array.prototype.push.apply(result, nthPageResponse.body)
                        
                        progress += delta
                        current += 1
                        this.emit('progress', { progress, current, total })

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
        
        const fetchOptions = Object.assign({ method: 'get' }, this.fetchOptions)
        const extendedQuery = Object.assign({}, this.defaultQuery, query)
        const url = new URL(endpoint)
        url.search = (new URLSearchParams(extendedQuery)).toString()
        
        return await fetch(url.toString(), fetchOptions).then(Fetch.checkStatus)

    }
    
    /**
     * Checks response status code. If response is not ok - throws Error
     * @param {Response} response
     * @returns {Response|Error}
     * @private
     * @static
     */
    static async checkStatus(response) {

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

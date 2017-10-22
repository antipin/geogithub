import eachLimit from 'async/eachLimit'
import pick from 'lodash/pick'
import Fetch from '../fetch'
import datasetHistory from './dataset-history.json'
import datasetReat from './dataset-react.json'
import datasetNode from './dataset-node.json'
import datasetBootstrap from './dataset-bootstrap.json'

const PARALLEL_REQUESTS_LIMIT = 25
const MAPBOX_BASE_URL = 'https://api.mapbox.com'
const GITHUB_BASE_URL = 'https://api.github.com/repos'
const COLLECTION_PER_PAGE = 100

export default class GeoGithubDataprovider {

    constructor({ repoPath, githubToken, mapboxToken }) {
        
        this.repoPath = repoPath
        this.github = GeoGithubDataprovider.makeGithubFetcher(githubToken)
        this.mapbox = GeoGithubDataprovider.makeMapboxFetcher(mapboxToken)

    }

    fetch() {
        
        const mapRepoPathToDataset = {
            'ReactTraining/history': datasetHistory,
            'facebook/react': datasetReat,
            'nodejs/node': datasetNode,
            'twbs/bootstrap' :datasetBootstrap,
        }
        const preloadedDataset = mapRepoPathToDataset[this.repoPath]

        if (preloadedDataset) {

            return new Promise(resolve => {
    
                setTimeout(() => resolve(preloadedDataset), 100)
    
            })

        }

        console.timeEnd('fetching')
        
        return this.fetchRepo()
            .then(this.fetchContributors.bind(this))
            .then(this.fetchContributorLocations.bind(this))
            .then(this.fetchGeo.bind(this))
            .then(this.fetchCommits.bind(this))
            .then(console.timeEnd('fetching'))
            
    }
        
    /**
     * Fetches repo details
     */
    async fetchRepo() {

        const dataset = {}
        const repoData = await this.github.get(`${GITHUB_BASE_URL}/${this.repoPath}`)

        // Enrich dataset with repo details
        dataset.repo = GeoGithubDataprovider.formatRepo(repoData)

        return Promise.resolve(dataset)

    }

    /**
     * Fetches all contributors
     * @param {Object} dataset 
     */
    async fetchContributors(dataset) {
        
        const { repo } = dataset

        if (!repo) {

            throw new TypeError('fetchContributors needs dataset.repo to be fetched')

        }

        const contributorsData = await this.github.getCollection(repo.contributors_url, {
            per_page: COLLECTION_PER_PAGE
        })

        // Enrich dataset with contributors
        dataset.contributors = contributorsData.reduce(
            (result, cotributorData) => {
              
                result[cotributorData.id] = GeoGithubDataprovider.formatCotributor(cotributorData)

                return result

            },
            Object.create(null)
        )

        return Promise.resolve(dataset)

    }

    /**
     * For each contributor fetches detaild information (in order to get location)
     * @param {Object} dataset 
     */
    fetchContributorLocations(dataset) {
        
        return new Promise((resolve, reject) => {

            const { contributors } = dataset

            if (!contributors) {

                return reject(
                    new TypeError('fetchContributorLocations needs dataset.contributors to be fetched')
                )

            }

            const cotributorUrls = Object.keys(contributors).map(
                cotributorId => contributors[cotributorId].url
            )
            
            eachLimit(
                cotributorUrls,
                PARALLEL_REQUESTS_LIMIT,
                (cotributorUrl, next) => {
                    
                    this.github.get(cotributorUrl)
                        .then(cotributorData => {
                            
                            // Enrich contributor with some details
                            Object.assign(
                                dataset.contributors[cotributorData.id],
                                pick(cotributorData, 'location', 'name', 'email')
                            )
                            
                            return next()

                        })
                        .catch(error => next(error))

                },
                (finalError) => {

                    if (finalError) return reject(finalError)

                    return resolve(dataset)

                }
            )

        })

    }

    /**
     * For each location fetches geo data
     * @param {Object} dataset 
     */
    fetchGeo(dataset) {

        return new Promise((resolve, reject) => {
            
            const { contributors } = dataset

            if (!contributors) {

                return reject(
                    new TypeError('fetchGeo needs dataset.contributors to be fetched')
                )

            }

            const cotributorLocations = Object.keys(contributors).map(
                cotributorId => contributors[cotributorId].location
            )
            const uniqueCotributorLocations = new Set(cotributorLocations)
            
            dataset.locations = {}
            
            eachLimit(
                uniqueCotributorLocations,
                PARALLEL_REQUESTS_LIMIT,
                (cotributorLocation, next) => {
                    
                    if (!cotributorLocation) return next()
                    
                    const safeLocation = encodeURIComponent(cotributorLocation)
                    const geocodeUrl = `${MAPBOX_BASE_URL}/geocoding/v5/mapbox.places/${safeLocation}.json`
                    this.mapbox.get(geocodeUrl, { limit: 1 })
                        .then(geocodeData => {

                            const location = GeoGithubDataprovider.formatGeo(geocodeData)

                            if (location !== null) {
                                
                                dataset.locations[cotributorLocation] = location

                            }

                            return next()

                        })
                        .catch(error => next(error))

                },
                (finalError) => {

                    if (finalError) return reject(finalError)

                    return resolve(dataset)

                }
            )

        })
            
    } 

    /**
     * Fetches all commits
     * @param {Object} dataset  
     * @returns {Promise.<Object>}
     */
    async fetchCommits(dataset) {

        const { repo } = dataset

        if (!repo) {

            throw new TypeError('fetchContributors needs dataset.repo to be fetched')

        }

        const commitsData = await this.github.getCollection(`${GITHUB_BASE_URL}/${this.repoPath}/commits`, {
            per_page: COLLECTION_PER_PAGE
        })

        // Enrich dataset with commits
        dataset.commits = commitsData
            .map(commitData => GeoGithubDataprovider.formatCommit(commitData))
            .filter(commitData => commitData !== null)

        return Promise.resolve(dataset)

    }

    static formatRepo(data) {

        return pick(data, [
            'id',
            'name',
            'full_name',
            'contributors_url'
        ])

    }

    static formatCotributor(data) {

        return pick(data, [
            'id',
            'url',
            'location',
            'login',
            'name',
        ])

    }

    static formatGeo(data) {

        const { features } = data

        if (features.length === 0) return null

        const [ location ] = features
        const { context } = location
        let country = null

        if (Array.isArray(context) && context.length > 0) {

            const countryObj = context[context.length - 1]
            
            country = countryObj.text || ''

        } else {

            country = location.text // Assume that if location.context is empty, name is a country name

        }

        return {
            name: location.text,
            coords: location.center,
            country,
        }

    }

    static formatCommit(data) {
    
        const { author, commit } = data

        if (author == null) {

            return null

        }

        return {
            user_id: author.id,
            date: commit.author.date,
        }

    }

    static makeGithubFetcher(accessToken) {

        const fetchOptions = {
            headers: {
                'Accept': 'application/json; charset=UTF-8',
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `token ${accessToken}`,
            },
            mode: 'cors',
        }

        return new Fetch({ fetchOptions }) 

    }

    static makeMapboxFetcher(accessToken) {

        const fetchOptions = {
            headers: {
                'Accept': 'application/json; charset=UTF-8',
                'Content-type': 'application/json; charset=UTF-8',
            },
            mode: 'cors',
        }
        const defaultQuery = {
            access_token: accessToken
        }

        return new Fetch({ fetchOptions, defaultQuery }) 

    }

}
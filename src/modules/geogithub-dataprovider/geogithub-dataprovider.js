import eachLimit from 'async/eachLimit'
import pick from 'lodash/pick'
import Fetch from '../fetch'

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
        
        return this.fetchRepo()
            .then(this.fetchContributors.bind(this))
            .then(this.fetchContributorLocations.bind(this))
            .then(this.fetchGeo.bind(this))
            .then(this.fetchCommits.bind(this))
            
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

                            dataset.locations[cotributorLocation] = GeoGithubDataprovider.formatGeo(geocodeData)
                            
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
        dataset.commits = commitsData.map(commitData => GeoGithubDataprovider.formatCommit(commitData))

        return Promise.resolve(dataset)

    }

    static formatRepo(data) {

        return pick(data, [
            'id',
            'name',
            'full_name',
            'language',
            'languages_url',
            'created_at',
            'updated_at',
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
            'type',
        ])

    }

    static formatGeo(data) {

        const { features } = data

        if (features.length === 0) return null

        const [ location ] = features

        return {
            name: location.text,
            coords: location.center,
        }

    }

    static formatCommit(data) {
    
        const { sha, author, commit } = data

        if (author == null) {

            return null

        }

        return {
            id: sha,
            message: commit.message,
            date: commit.author.date,
            author: pick(author, 'id', 'login')
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
import { GeoGithubDataprovider } from './modules'

const { GITHUB_TOKEN, MAPBOX_TOKEN } = process.env
const REPO_PATH = 'ReactTraining/history'

;(async function () {

    try {

        const geoGithubDataprovider = new GeoGithubDataprovider({
            repoPath: REPO_PATH,
            githubToken: GITHUB_TOKEN,
            mapboxToken: MAPBOX_TOKEN,
        })

        console.time('fetching')
        const dataset = await geoGithubDataprovider.fetch()
        console.timeEnd('fetching')
        console.log(dataset)

    } catch (error) {

        console.error(error)

    }

}())

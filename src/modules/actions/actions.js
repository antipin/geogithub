import { createAction } from 'redux-actions'
import { GeoGithubDataprovider, GeoEventsTimeline } from '../'

const sigmoidFunc = (x) => 1 / (1 + Math.pow(Math.E, -(x - 4)))

const selectRepo = createAction('SELECT_REPO')
const fetchRepoDatasetProgress = createAction('FETCH_REPO_DATASET_PROGRESS')
const fetchRepoDatasetSucceeded = createAction('FETCH_REPO_DATASET_SUCCEEDED')
const fetchRepoDatasetFailed = createAction('FETCH_REPO_DATASET_FAILED')
const fetchRepoDataset = createAction('FETCH_REPO_DATASET', ({ repoPath, githubToken, mapboxToken }) =>
    (dispatch) => {
    
        const geoGithubDataprovider = new GeoGithubDataprovider({ repoPath, githubToken, mapboxToken })
        
        // Fake progress
        let progress = 0
        const progressTimer = setInterval(
            () => {

                progress += 0.5

                dispatch(fetchRepoDatasetProgress(
                    sigmoidFunc(progress)
                ))

            },
            500
        )

        geoGithubDataprovider.fetch()
            .then(dataset => { 
                
                clearInterval(progressTimer)
                dispatch(fetchRepoDatasetProgress(1))
                
                return Promise.resolve(dataset)

            })
            // Convert raw dataset into
            .then(dataset => Promise.resolve(
                new GeoEventsTimeline({
                    events: dataset.commits,
                    users: dataset.contributors,
                    locations: dataset.locations,
                })
            ))
            .then((commitsTimeline) => dispatch(
                fetchRepoDatasetSucceeded(commitsTimeline)
            ))
            .catch(error => {
                
                clearInterval(progressTimer)
                console.error(error)
                dispatch(fetchRepoDatasetFailed(error))

            })
    
    })

const startVisualisation = createAction('START_VISUALISATION')
const completeVisualisation = createAction('COMPLETE_VISUALISATION')
const tryAgain = createAction('TRY_AGAIN')

export default {
    selectRepo,
    fetchRepoDataset,
    startVisualisation,
    completeVisualisation,
    tryAgain,
}
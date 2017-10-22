import { createAction } from 'redux-actions'
import { GeoGithubDataprovider, GeoEventsTimeline } from '../'

const selectRepo = createAction('SELECT_REPO')
const fetchRepoDatasetProgress = createAction('FETCH_REPO_DATASET_PROGRESS')
const fetchRepoDatasetRateLimits = createAction('FETCH_REPO_DATASET_RATE_LIMITS')
const fetchRepoDatasetSucceeded = createAction('FETCH_REPO_DATASET_SUCCEEDED')
const fetchRepoDatasetFailed = createAction('FETCH_REPO_DATASET_FAILED')
const fetchRepoDataset = createAction('FETCH_REPO_DATASET', ({ repoPath, githubToken, mapboxToken }) =>
    (dispatch) => {
    
        const geoGithubDataprovider = new GeoGithubDataprovider({ repoPath, githubToken, mapboxToken })
        
        geoGithubDataprovider.on('progress', ({ progress, task }) => 
            dispatch(fetchRepoDatasetProgress({ progress, task }))
        )

        geoGithubDataprovider.on('github-rate-limits', ({ progress, remaining, limit }) => 
            dispatch(fetchRepoDatasetRateLimits({ progress, remaining, limit }))
        )

        geoGithubDataprovider.fetch()
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
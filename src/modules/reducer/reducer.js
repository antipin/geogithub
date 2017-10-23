import { handleActions } from 'redux-actions'

function makeReducer({ initialState, modes }) {

    const handlers = {
        SELECT_REPO: (state, action) => ({
            ...state,
            mode: modes.repo_is_selected,
            repo_path: action.payload
        }),
        FETCH_REPO_DATASET: (state) => ({
            ...state,
            mode: modes.fetching_repo_dataset,
        }),
        FETCH_REPO_DATASET_PROGRESS: (state, action) => ({
            ...state,
            progressTask: action.payload.task,
            progress: action.payload.progress,
        }),
        FETCH_REPO_DATASET_RATE_LIMITS: (state, action) => ({
            ...state,
            rateLimitsProgress: action.payload.progress,
            rateLimitsRemaining: action.payload.remaining,
            rateLimitsLimit: action.payload.limit,
            rateLimitsReset: action.payload.reset,
        }),
        FETCH_REPO_DATASET_FAILED: (state, action) => ({
            ...state,
            mode: modes.fetching_repo_dataset_failed,
            error: action.payload,
        }),
        FETCH_REPO_DATASET_SUCCEEDED: (state, action) => ({
            ...state,
            mode: modes.fetching_repo_dataset_succeded,
            commitsTimeline: action.payload
        }),
        START_VISUALISATION: (state) => ({
            ...state,
            mode: modes.visualising_repo_dataset,
        }),
        COMPLETE_VISUALISATION: (state) => ({
            ...state,
            mode: modes.visualisation_completed,
        }),
        TRY_AGAIN: () => ({
            ...initialState,
        }),
    }    

    return handleActions(handlers, initialState)

}

export default makeReducer

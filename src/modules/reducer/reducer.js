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
            progress: action.payload,
        }),
        FETCH_REPO_DATASET_FAILED: (state, action) => ({
            ...state,
            mode: modes.fetching_repo_dataset_failed,
            error: action.payload,
        }),
        FETCH_REPO_DATASET_SUCCEEDED: (state, action) => ({
            ...state,
            mode: modes.fetching_repo_dataset_succeded,
            dataset: action.payload,
        }),
        VISUALISATION_STARTED: (state) => ({
            ...state,
            mode: modes.visualising_repo_dataset,
        }),
        VISUALISATION_COMPLETED: (state) => ({
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

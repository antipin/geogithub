import keymirror from 'keymirror'
import { handleActions } from 'redux-actions'

const MODES = keymirror({
    waiting_for_repo_selection: '',
    repo_is_selected: '',
})
const INITIAL_STATE = {
    mode: MODES.waiting_for_repo_selection,
}

function makeReducer() {

    const handlers = {
        SELECT_REPO: (state, action) => ({
            ...state,
            mode: MODES.repo_is_selected,
            repo_name: action.payload
        }),
    }    

    return handleActions(handlers, INITIAL_STATE)

}

export default makeReducer

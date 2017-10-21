import keymirror from 'keymirror'
import { makeReducer, makeStore, makeRenderer } from './modules'

try {

    const env = process.env
    
    /**
     * Access tokens for external APIs
     */
    const { NODE_ENV, GITHUB_TOKEN, MAPBOX_TOKEN } = env

    /**
     * Application can be in the following states
     */
    const modes = keymirror({
        waiting_for_repo_selection: '',
        repo_is_selected: '',
        fetching_repo_dataset: '',
        fetching_repo_dataset_failed: '',
        fetching_repo_dataset_succeded: '',
        visualising_repo_dataset: '',
        visualisation_completed: '',
    })

    /**
     * Initial application state
     */
    const initialState = {
        mode: modes.waiting_for_repo_selection,
        env: { GITHUB_TOKEN, MAPBOX_TOKEN }
    }

    /**
     * Tie up together main app modules
     */
    const reducer = makeReducer({ initialState, modes })
    const store = makeStore({ reducer, initialState, isDevelopment: (NODE_ENV === 'development') })
    const render = makeRenderer({ store })

    /**
     * render app
     */
    render()

} catch (error) {

    console.error(error)

}

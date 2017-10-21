import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BaseLayout, Mapbox, RepoPicker, RepoFetcher } from '../'

class Root extends Component {

    render() {

        const { mode } = this.props

        return (
            <BaseLayout>
                <Mapbox/>
                { Root.modeToComponent(mode) }
            </BaseLayout>
        )

    }

    static modeToComponent(mode) {
    
        /*
            Application can be in the following modes:
                1. waiting_for_repo_selection
                2. repo_is_selected (attrs: repo_name)
                3. fetching_repo_dataset (attrs: progress)
                    3.1. fetching_repo_dataset_failed (attrs: error)
                    3.2. fetching_repo_dataset_succeded (attrs: dataset)
                4. visualising_repo_dataset
                5. visualisation_completed
        */
        
        switch (mode) {
    
            default:
            case 'waiting_for_repo_selection':
                return <RepoPicker/>
    
            case 'repo_is_selected':
            case 'fetching_repo_dataset':
                return <RepoFetcher/> // Progress bar
    
            case 'fetching_repo_dataset_failed':
                return <RepoPicker/> // Error
    
            case 'fetching_repo_dataset_succeded':
            case 'visualising_repo_dataset':
                return <RepoPicker/> // Visualizer
    
            case 'visualisation_completed':
                return <RepoPicker/> // Final screen
    
        }
    
    }

}

const mapStateToProps = (state) => ({
    mode: state.mode
})

export default connect(mapStateToProps)(Root)

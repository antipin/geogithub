import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BaseLayout, ErrorBox, Mapbox, RepoPicker, RepoFetcher, TryAgain } from '../'

class Root extends Component {

    render() {

        const { mode } = this.props

        return (
            <BaseLayout>
                <Mapbox/>
                { this.modeToComponent(mode) }
            </BaseLayout>
        )

    }

    modeToComponent(mode) {

        const { errorMessage } = this.props
        
        switch (mode) {
    
            case 'waiting_for_repo_selection':
                return <RepoPicker/>
    
            case 'repo_is_selected':
            case 'fetching_repo_dataset':
                return <RepoFetcher/>
    
            case 'fetching_repo_dataset_failed':
                return (
                    <ErrorBox title="Looks like something went wrong with data fetching">
                        { errorMessage }
                    </ErrorBox>
                )
    
            case 'fetching_repo_dataset_succeded':
            case 'visualising_repo_dataset':
                return null // Visualizer
    
            case 'visualisation_completed':
                return <TryAgain/> // Final screen

            default:
                return null
    
        }
    
    }

}

const mapStateToProps = (state) => ({
    mode: state.mode,
    errorMessage: state.error && state.error.message || null,
})

export default connect(mapStateToProps)(Root)

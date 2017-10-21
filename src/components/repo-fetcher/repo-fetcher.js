import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../modules'
import style from './repo-fetcher.css'

class RepoFetcher extends Component {

    constructor(props) {

        super(props)

        this.state = {
            progress: 0,
        }

    }
    
    componentDidMount() {
        
        const { dispatch, repoPath, githubToken, mapboxToken } = this.props
        const { fetchRepoDataset } = actions

        dispatch(fetchRepoDataset({ repoPath, githubToken, mapboxToken }))

    }

    render() {

        const { progress } = this.props
        const width = `${Math.round(progress * 100)}%`
        
        return (
            <div className={style.root}>
                <div className={style.dialog}>
                    <h2 className={style.dialogTitle}>
                        Fetching dataset
                    </h2>
                    <div className={style.dialogBody}>
                        <div className={style.progressBar}>
                            <div className={style.progress} style={{ width }}/>
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }

}

const mapStateToProps = (state) => ({
    repoPath: state.repo_path,
    githubToken: state.env.GITHUB_TOKEN,
    mapboxToken: state.env.MAPBOX_TOKEN,
    progress: state.progress,
})

export default connect(mapStateToProps)(RepoFetcher)
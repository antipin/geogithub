import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../modules'
import style from './repo-fetcher.css'

const COLOR_OK = '#24a122'
const COLOR_WARNING = '#ff7f00'
const COLOR_DANGER = '#d8241f'

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
        
        const { 
            progress, progressTask, repoPath,
            rateLimitsProgress, rateLimitsRemaining, rateLimitsLimit 
        } = this.props
        const width = `${Math.round(progress * 100)}%`
        const rateLimitColor = rateLimitsProgress > 0.5 ? COLOR_OK : 
            (rateLimitsProgress > 0.2) ? COLOR_WARNING : COLOR_DANGER
        
        return (
            <div className={style.root}>
                <h2 className={style.dialogTitle}>
                    { `Fetching dataset for ${repoPath}` }
                </h2>
                <div className={style.dialogBody}>
                    <div className={style.progressBar}>
                        <div className={style.progress} style={{ width }}/>
                    </div>
                    <div className={style.task}>
                        { progressTask }
                    </div>
                    {
                        (rateLimitsRemaining + rateLimitsLimit !== 0) ? (
                            <div className={style.rateLimits}>
                                <span className={style.rateLimitsLabel}>
                                    Reqests remainded:
                                </span>
                                <span className={style.rateLimitsValue}>
                                    <span style={{ color: rateLimitColor }}>{rateLimitsRemaining}</span>
                                    { ` / ${rateLimitsLimit} ` }
                                </span>
                            </div>
                        ) : null
                    }
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
    progressTask: state.progressTask,
    rateLimitsProgress: state.rateLimitsProgress || 1,
    rateLimitsRemaining: state.rateLimitsRemaining || 0,
    rateLimitsLimit: state.rateLimitsLimit || 0,
})

export default connect(mapStateToProps)(RepoFetcher)
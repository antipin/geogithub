import React, { Component } from 'react'
import { connect } from 'react-redux'
import style from './repo-fetcher.css'

class RepoFetcher extends Component {

    constructor(props) {

        super(props)

        this.state = {
            progress: 0,
        }

    }
    
    componentDidMount() {

        // const { dispatch } = this.props

        // dispatch('START FETCH!')

    }

    render() {
        
        return (
            <div className={style.root}>
                <div className={style.dialog}>
                    <h2 className={style.dialogTitle}>
                        Fetching dataset
                    </h2>
                    <div className={style.dialogBody}>
                        Loading...
                    </div>
                </div>
            </div>
        )
        
    }

}

const mapStateToProps = (state) => (state)

export default connect(mapStateToProps)(RepoFetcher)
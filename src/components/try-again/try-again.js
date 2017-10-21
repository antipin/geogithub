import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../modules'
import style from './try-again.css'

class TryAgain extends Component {

    constructor(props) {

        super(props)

        this.handleTryAgainClick = this.handleTryAgainClick.bind(this)

    }

    render() {
        
        return (
            <div className={style.root}>
                <div className={style.dialog}>
                    <h2 className={style.dialogTitle}>
                        Try again?
                    </h2>
                    <div className={style.dialogBody}>
                        <div className={style.button} onClick={this.handleTryAgainClick}>
                            ok
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }

    handleTryAgainClick() {

        const { dispatch } = this.props
        const { tryAgain } = actions
        
        dispatch(tryAgain())
        
    }

}

export default connect()(TryAgain)
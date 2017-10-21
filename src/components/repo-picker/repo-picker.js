import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../modules'
import style from './repo-picker.css'

const KEY_ESC = 27
const KEY_RETURN = 13

class RepoPicker extends Component {

    constructor(props) {

        super(props)

        this.state = {
            repoName: '',
        }

        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleSearchKeyDown = this.handleSearchKeyDown.bind(this)
        this.handleGoClick = this.handleGoClick.bind(this)

    }
    
    componentDidMount() {

        this.input.focus()

    }

    render() {
        
        return (
            <div className={style.root}>
                <div className={style.dialog}>
                    <h2 className={style.dialogTitle}>
                        Type in github repo name for visualisation
                    </h2>
                    <div className={style.dialogBody}>
                        <div className={style.fieldInput}>
                            <input
                                type="text" 
                                className={style.input}
                                onChange={this.handleSearchChange}
                                onKeyDown={this.handleSearchKeyDown}
                                ref={(elem) => (this.input = elem)}
                                placeholder="facebook/react"
                            />
                        </div>
                    </div>
                    <div className={style.dialogFooter}>
                        <div className={style.button} onClick={this.handleGoClick}>
                            go!
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }

    handleSearchChange(event) {
        
        this.setState({
            ...this.state,
            repoName: event.target.value,
        })

    }

    handleSearchKeyDown(event) {
        
        const { state } = this
        const keys = [ KEY_ESC, KEY_RETURN ]
        const { keyCode } = event

        if (keys.includes(keyCode)) {

            event.preventDefault()

        }

        if (keyCode === KEY_ESC) {

            this.setState({
                ...state,
                repoName: '',
            })

        }

        if (keyCode === KEY_RETURN) {

            this.doSelectRepo()

        }

    }

    handleGoClick() {

        this.doSelectRepo()

    }

    doSelectRepo() {
        
        const { dispatch } = this.props
        const { repoName } = this.state
        const { selectRepo } = actions
        
        dispatch(selectRepo(repoName))
        
    }

}

export default connect()(RepoPicker)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../modules'
import style from './repo-picker.css'

const KEY_ESC = 27
const KEY_RETURN = 13
const EXAMPLES = [
    'facebook/react', 'nodejs/node', 'twbs/bootstrap', 'ReactTraining/history', 'angular/angular.js',
    'facebook/react-native', 'jquery/jquery', 'atom/atom', 'meteor/meteor', 'moby/moby', 'golang/go',
    'kubernetes/kubernetes', 'rust-lang/rust', 'laravel/laravel', 'symfony/symfony', 'rails/rails',
    'jakubroztocil/httpie', 'nvbn/thefuck', 'pallets/flask', 'django/django',
]

class RepoPicker extends Component {

    constructor(props) {

        super(props)

        this.state = {
            repoPath: '',
        }

        this.handleExampleClick = this.handleExampleClick.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleSearchKeyDown = this.handleSearchKeyDown.bind(this)
        this.handleGoClick = this.handleGoClick.bind(this)

    }
    
    componentDidMount() {

        this.input.focus()

    }

    render() {

        const { repoPath } = this.state
        
        return (            
            <div className={style.root}>
                <h2 className={style.dialogTitle}>
                    Type in github repo name for visualisation
                </h2>
                <div className={style.dialogBody}>
                    <div className={style.field}>
                        <div className={style.fieldInput}>
                            <input
                                type="text" 
                                className={style.input}
                                onChange={this.handleSearchChange}
                                onKeyDown={this.handleSearchKeyDown}
                                ref={(elem) => (this.input = elem)}
                                value={repoPath}
                                placeholder="facebook/react"
                            />
                        </div>
                        <div className={style.fieldDescription}>
                            <span className={style.exampleTitle}>Examples:</span>
                            {
                                EXAMPLES.map(example => (
                                    <span
                                        key={example} 
                                        onClick={this.handleExampleClick.bind(this, example)}
                                        className={style.example}>
                                        { example }
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={style.dialogFooter}>
                    <div className={style.button} onClick={this.handleGoClick}>
                        go!
                    </div>
                </div>
            </div>
        )
        
    }

    handleExampleClick(example) {
        
        this.setState({
            ...this.state,
            repoPath: example,
        })

    }

    handleSearchChange(event) {
        
        this.setState({
            ...this.state,
            repoPath: event.target.value,
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
                repoPath: '',
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
        const { repoPath } = this.state
        const { selectRepo } = actions
        
        dispatch(selectRepo(repoPath))
        
    }

}

export default connect()(RepoPicker)
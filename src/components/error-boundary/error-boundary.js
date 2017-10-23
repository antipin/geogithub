import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
    
    constructor(props) {
      
        super(props)
        this.state = { hasError: false }

    }
  
    componentDidCatch(error, info) {
      
        this.setState({ hasError: true })

        console.error(error)
        console.log(info)
      
    }
  
    render() {

        const { hasError } = this.state
        
        if (hasError) {
            
            return <h1>Something went wrong.</h1>

        }
      
        return this.props.children

    }

}
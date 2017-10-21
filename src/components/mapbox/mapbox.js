import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapboxGL from 'mapbox-gl'
import eachLimit from 'async/eachLimit'
import { actions } from '../../modules'
import mapboxStyle from './vendor/mapbox-rules'
import style from './mapbox.css'

const MAPBOX_STYLE = 'mapbox://styles/mapbox/dark-v9'
const ACTIVE_MODES = [ 
    'fetching_repo_dataset_succeded',
    'visualising_repo_dataset',
]
class Mapbox extends Component {

    constructor() {
        
        super()

        const { MAPBOX_TOKEN } = process.env

        mapboxGL.accessToken = MAPBOX_TOKEN

        this.state = {
            isMapLoaded: false,
        }

    }

    componentDidMount() {

        Mapbox.injectCSS(mapboxStyle)

        this.map = new mapboxGL.Map({
            container: this.container,
            style: MAPBOX_STYLE,
            minZoom: 1,
            maxZoom: 3,
            center: [ 10, 36 ],
            zoom: 1.37,
            interactive: false,
        })

        this.map.on('load', () => {

            this.setState({
                ...this.state,
                isMapLoaded: true,
            })

        })
        
    }

    render() {

        const { mode } = this.props
        const { isMapLoaded } = this.state
        const containerClassNames = [ style.root ]

        if (isMapLoaded) {
            
            containerClassNames.push(style.rootWithMap)

        }

        if (ACTIVE_MODES.includes(mode) === false) {

            containerClassNames.push(style.rootInactive)

        }

        return (
            <div
                className={containerClassNames.join(' ')} 
                ref={ elem => (this.container = elem) } />
        )
    
    }

    componentDidUpdate() {

        const { dispatch, mode, dataset } = this.props
        const { startVisualisation, completeVisualisation } = actions

        switch (mode) {

            case 'fetching_repo_dataset_succeded':
                
                // Waiting for animations to complete
                setTimeout(
                    () => dispatch(startVisualisation()),
                    1000
                )
                break

            case 'visualising_repo_dataset':
                Mapbox.plotMarkers(this.map, dataset).then(() => dispatch(completeVisualisation()))
                break

            default:
                // do-nothing

        }

    }

    static createMarkerElem() {

        const marker = document.createElement('div')
        const markerInner = document.createElement('div')
        
        marker.className = style.marker
        markerInner.className = style.markerInner
        marker.appendChild(markerInner)

        return marker

    }
    
    static plotMarkers(map, dataset) {

        return new Promise((resolve, reject) => {

            const { commits, contributors, locations } = dataset
    
            eachLimit(
                commits,
                1,
                (commit, next) => setTimeout(
                    () => {

                        if (!commit) {
                            
                            return next()

                        }
            
                        const contributor = contributors[commit.author.id]
            
                        if (!contributor) {
                            
                            return next()

                        }
            
                        const location = locations[contributor.location]
            
                        if (!location) {

                            return next()
                            
                        }
            
                        const marker = new mapboxGL.Marker(Mapbox.createMarkerElem())
                        marker.setLngLat(Mapbox.addNoizeToCoords(location.coords))
                        marker.addTo(map)
                        
                        return next()

                    },
                    10
                ),
                (finalError) => {
    
                    if (finalError) return reject(finalError)
    
                    return resolve()
    
                }
            )

        }) 
        
    }

    static injectCSS(rules) {

        if (window && typeof window === 'object' && window.document) {

            const { document } = window
            const head = document.head || document.getElementsByTagName('head')[0]
            const styleElement = document.createElement('style')
            styleElement.innerHTML = rules
            head.appendChild(styleElement)

        }
        
    }

    static addNoizeToCoords(coords) {

        const [ lng, lat ] = coords
        const sign = Math.random() > 0.5 ? 1 : -1
        const mistake = sign * (Math.random())

        return [
            lng + mistake,
            lat + mistake,
        ]

    }

}

const mapStateToProps = (state) => ({
    mode: state.mode,
    dataset: state.dataset,
})

export default connect(mapStateToProps)(Mapbox)
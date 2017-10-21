import React, { Component } from 'react'
import mapboxGL from 'mapbox-gl'
import eachLimit from 'async/eachLimit'
import mapboxStyle from './vendor/mapbox-rules'
import style from './mapbox.css'

const MAPBOX_STYLE = 'mapbox://styles/mapbox/dark-v9'

export default class Mapbox extends Component {

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

        const map = new mapboxGL.Map({
            container: this.container,
            style: MAPBOX_STYLE,
            minZoom: 1,
            maxZoom: 3,
            center: [ 10, 36 ],
            zoom: 1.37,
            interactive: false,
        })

        // map.on('load', () => Mapbox.plotMarkers(map).then(() => console.log('PLOTTER COMPLETED ITS JOB')))
        map.on('load', () => {

            this.setState({
                ...this.state,
                isMapLoaded: true,
            })

        })
        
    }

    shouldComponentUpdate() {
        
        return (this.state.isMapLoaded === false)
        
    }

    render() {

        const { isMapLoaded } = this.state
        const containerClassName = isMapLoaded ? 
            [ style.root, style.rootWithMap ].join(' ') :
            style.root
        
        return (
            <div className={containerClassName} ref={ elem => (this.container = elem) } />
        )
    
    }

    static createMarkerElem() {

        const marker = document.createElement('div')
        const markerInner = document.createElement('div')
        
        marker.className = style.marker
        markerInner.className = style.markerInner
        marker.appendChild(markerInner)

        return marker

    }
    
    static plotMarkers(map) {

        return new Promise((resolve, reject) => {

            const { commits, contributors, locations } = window.dataset
    
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
                        marker.setLngLat(location.coords)
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

}


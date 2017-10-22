import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapboxGL from 'mapbox-gl'
import { timer as d3Timer } from 'd3-timer'
import { easeCubic } from 'd3-ease'
import { actions } from '../../modules'
import mapboxStyle from './vendor/mapbox-rules'
import style from './mapbox.css'

const ANIMATION_MS_PER_DAY = 10
const ANIMATION_POINT_SIZE = 2
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
            container: this.mapContainer,
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

        this.prepareCanvas()

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
            <div className={containerClassNames.join(' ')}>
                <div className={style.map} ref={ elem => (this.mapContainer = elem) } />
                <canvas 
                    className={style.events}
                    ref={elem => (this.canvas = elem)}
                />
            </div>
        )
    
    }

    componentDidUpdate() {

        const { dispatch, mode } = this.props
        const { startVisualisation, completeVisualisation } = actions

        switch (mode) {

            case 'fetching_repo_dataset_succeded':
                
                // Waiting for animations to complete
                setTimeout(
                    () => dispatch(startVisualisation()),
                    1000
                )
                break

            case 'visualising_repo_dataset': {

                const { commitsTimeline } = this.props

                // Prepare canvas model from commitsTimeline
                const canvasModel = Mapbox.convertEventsTimelineToModel({
                    timeline: commitsTimeline,
                    calcSourceLayout: this.convertLatLngToCanvasCoords.bind(this),
                    calcTargetLayout: this.convertEventToTimelineCoords.bind(this),
                    pointSize: ANIMATION_POINT_SIZE,
                })

                this.animateFromMapToTimeline(canvasModel, commitsTimeline.days)
                    .then(() => setTimeout(
                        () => dispatch(completeVisualisation()),
                        1000
                    ))
                break
                
            }

            default:
                // do-nothing

        }

    }

    convertLatLngToCanvasCoords(coords) {
        
        const [ lng, lat ] = coords
        const lngSign = Math.random() > 0.5 ? 1 : -1
        const latSign = Math.random() > 0.5 ? 1 : -1
        const lngMistake = lngSign * (Math.random())
        const latMistake = latSign * (Math.random())

        return this.map.project([
            lng + lngMistake,
            lat + latMistake,
        ])

    }

    convertEventToTimelineCoords(item, days, maxPerDay, pointSize) {

        const sideOffset = 100
        const bottomOffset = 10
        const { width, height } = this.canvas.getBoundingClientRect()
        const lengthOfTimeline = width - 2 * sideOffset
        const pxPerDay = lengthOfTimeline / days

        return {
            x: sideOffset + item.day * pxPerDay,
            y: (height - bottomOffset) - (pointSize * item.order),
        }

    }

    prepareCanvas() {
        
        const scaleRato = window.devicePixelRatio || 1
        const canvasClientRect = this.canvas.getBoundingClientRect()
        this.canvas.height = canvasClientRect.height * scaleRato
        this.canvas.width = canvasClientRect.width * scaleRato
        this.ctx = this.canvas.getContext('2d')
        this.ctx.scale(scaleRato, scaleRato)        
    
    }   
        
    animateFromMapToTimeline(points, days) {

        return new Promise((resolve) => {
            
            const duration = days * ANIMATION_MS_PER_DAY
            const timer = d3Timer((elapsed) => {
    
                const progress = elapsed / duration
    
                points.forEach(point => {
    
                    const { sourcePos, targetPos, currentPos, startTime, endTime } = point
    
                    if (progress >= startTime) {
    
                        const localDuration = endTime - startTime
                        const localProgress = Math.min(1, easeCubic((progress - startTime) / localDuration))
    
                        point.isVisible = true
                        currentPos.x = sourcePos.x * (1 - localProgress) + targetPos.x * localProgress
                        currentPos.y = sourcePos.y * (1 - localProgress) + targetPos.y * localProgress
    
                    }
    
                })
    
                this.draw(points)
    
                if (progress >= 1) {
    
                    timer.stop()
                    this.clear()
                    
                    return resolve()
    
                }
    
            })

        })

    }

    draw(points) {

        const { width, height } = this.canvas
        const ctx = this.ctx
        
        ctx.clearRect(0, 0, width, height)
    
        points.forEach(point => {
            
            const { isVisible, currentPos, color, size } = point
            
            if (isVisible) {

                ctx.fillStyle = color
                ctx.fillRect(currentPos.x, currentPos.y, size, size)

            }

        })

    }

    clear() {
        
        const { width, height } = this.canvas        
        this.ctx.clearRect(0, 0, width, height)

    }

    static convertEventsTimelineToModel({ timeline, pointSize, calcSourceLayout, calcTargetLayout }) {
        
        const { days, items, maxPerDay } = timeline
        const translateTime = 60
        const totalAnimationDays = days + translateTime

        return items.map(item => ({
            isVisible: false,
            sourcePos: calcSourceLayout(item.coords),
            currentPos: calcSourceLayout(item.coords),
            targetPos: calcTargetLayout(item, days, maxPerDay, pointSize),
            color: '#FFFFFF', // todo: Map contries to colors 
            size: pointSize,
            startTime: item.day / totalAnimationDays,
            endTime: (item.day + translateTime) / totalAnimationDays,
        }))

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

const mapStateToProps = (state) => ({
    mode: state.mode,
    commitsTimeline: state.commitsTimeline,
})

export default connect(mapStateToProps)(Mapbox)
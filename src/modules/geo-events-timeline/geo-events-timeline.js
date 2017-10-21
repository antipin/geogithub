
class GeoEvent {

    constructor({ coords, country, day, order }) {

        /**
         * LatLng geo coordinates of the event
         */
        this.coords = coords
        
        /**
         * Country name
         */
        this.country = country
        
        /**
         * Day number of the event relative to all events in a collection
         */
        this.day = day

        /**
         * Event order iside the day
         */
        this.order = order

    }

}

export default class GeoEventsTimeline {

    constructor({ events, users, locations }) {

        const items = events.slice(0)

        GeoEventsTimeline.sortByDate(items)

        const lastEvent = items[items.length - 1]
        const firstEvent = items[0]
        const firstEventDate = GeoEventsTimeline.roundDate(firstEvent.date)
        const lastEventDate = GeoEventsTimeline.roundDate(lastEvent.date)
        const daysTotal = GeoEventsTimeline.daysInInterval(firstEventDate, lastEventDate) + 1
        const inDayOrders = {}
        const result = []
        let maxPerDay = 0

        items.forEach(event => {

            const eventDate = GeoEventsTimeline.roundDate(event.date)
            const user = users[event.user_id]

            if (!user) return

            const location = locations[user.location]

            if (!location) return

            const dayNumber = GeoEventsTimeline.daysInInterval(firstEventDate, eventDate)
            inDayOrders[dayNumber] = (inDayOrders[dayNumber] === undefined) ?
                0 : inDayOrders[dayNumber]

            inDayOrders[dayNumber] += 1

            maxPerDay = Math.max(maxPerDay, inDayOrders[dayNumber])

            result.push(new GeoEvent({
                coords: location.coords, 
                country: location.country,
                day: dayNumber,
                order: inDayOrders[dayNumber],
            }))

        })

        this.items = result
        this.days = daysTotal
        this.maxPerDay = maxPerDay

    }

    static sortByDate(items) {
        
        items.sort((a, b) => {
    
            const aDate = new Date(a.date)
            const bDate = new Date(b.date)
    
            if (aDate < bDate) {
            
                return -1
            
            }
    
            if (aDate > bDate) {
            
                return 1
            
            }
    
            return 0
    
        })
    
    }

    static daysInInterval(begin, end) {

        return (end - begin) / (24 * 60 * 60 * 1000)

    }

    static roundDate(dateString) {
        
        const date = new Date(dateString)
        date.setUTCHours(12, 0, 0, 0)
        
        return date

    }
    
}

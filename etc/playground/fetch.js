import eachLimit from 'async/eachLimit'
import request from 'request'
import parsePaginationLinks from 'parse-link-header'

const TOKEN = '' // Insert token here
const REPO_PATH = 'facebook/react'
const headers = {
    'authorization': `token ${TOKEN}`,
    'user-agent': 'geogithub 0.0.1',
 }

 const dataset = {
     repo: null,
     users: {},
     commits: []
 }
  
function fetchContributors(url, accum, callback) {

    if (url) {

        request.get({ url: url, json: true, headers }, (error, response, users) => {
            
            if (error) return callback(error)

            const pagination = parsePaginationLinks(response.headers.link)

            for (const user of users) {
    
                accum[user.id] = {
                    id: user.id,
                    login: user.login,
                    url: user.url,
                }
    
            }

            if (pagination.next.page <= 3) {

                return fetchContributors(pagination.next.url, accum, callback)

            }

            return callback(null, accum)

        })

    } else {

        return callback(null, accum)

    }

}

request.get({ url: `https://api.github.com/repos/${REPO_PATH}`, json: true, headers }, (error, response, body) => {

    if (error) return console.error(error)

    dataset.repo = body

    // Fetching contributors
    console.log(`Fething contributors from ${body.contributors_url}`)

    fetchContributors(body.contributors_url, dataset.users, (contributorsError, contributors) => {

        if (contributorsError) return console.error(contributorsError)

        console.log(`Total number of contributors: ${Object.keys(dataset.users).length}`)

        eachLimit(Object.keys(dataset.users), 50, (userId, next) => {
            
            const user = dataset.users[userId]

            console.log(`Fetching user ${user.login} [${user.id}]`)

            request.get({ url: user.url, json: true, headers }, (userError, response, userDetails) => {

                if (userError) return next(userError)

                dataset.users[userId].location = userDetails.location

                return next()

            })

        }, (userDetailsError) => {
            
            if(userDetailsError) {
                
                console.error(userDetailsError)

            } else {

                const locations = Object.keys(dataset.users).reduce(
                    (result, userId) => {
                        
                        const user = dataset.users[userId]
                        const locationKey = user.location === null ? "none" : user.location

                        result[locationKey] = result[locationKey] || 0
                        result[locationKey] += 1

                        return result

                    },
                    {}
                )

            }

        })

    })

})
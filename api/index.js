const express = require("express");
const app = express();
const port = process.env.PORT || '8080'
const bodyParser = require('body-parser')
const rp = require('request-promise')
const R = require('ramda')
const {GQL_DOMAIN} = require('./config')

app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Headers', ['Content-Type'])
  if (res.method === 'OPTIONS') res.end("")

  next()
})

app.post("/launches", (req, res) => {
  const {filters = []} = req.body
  if (!(filters instanceof Array)) return res.json({errors: "filters must be an array"})
  if (filters.some(x => typeof x !== "string")) return res.json({errors: "filtes must be an array of strings"})
  const query = getFullQuery(filters)
  return rp({
    uri: `http://${GQL_DOMAIN}:4468`
  , method: 'POST'
  , body: JSON.stringify({query})
  , headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(r => res.json(r))
  .catch(error => res.json({errors: error}))

  // Array -> String
  function getFullQuery(fs) {
    return R.compose(
      getQuery
    , getFilters
    , R.map(getGQLStr)
    )(fs)
  }
  // String -> Sting
  function getGQLStr(filter = '') {
    switch(filter) {
      case 'land_success':
        return `launch_success: true`
      case 'reused':
        return `
          reuse: {
          	OR:[{
                  core: true
                },{
                  side_core1: true
                },{
                  side_core2: true
                },{
                  fairings: true
                },{
                  capsule: true
                }
              ]
            }
        `
      case 'with_reddit':
        return `
          links: {
          	OR:[{
                  reddit_campaign_not: null
                },{
                  reddit_launch_not: null
                },{
                  reddit_recovery_not: null
                },{
                  reddit_media_not: null
                }
              ]}
        `
      default:
        return filter
    }
  }

  // Array -> String
  function getFilters(fs = []) {
    if (fs.length > 1) {
      return `
        (where: {
          AND: [{
            ${fs.join('},{')}
          }]
        })
      `
    }
    if (fs.length) {
      return `(where: {${fs.join(' ')}})`
    }
    return ''
  }
  // String -> String
  function getQuery(filtersStr = '') {
    return `
    {
      launches ${filtersStr}{
        id
        launch_success
        rocket_name
        rocket_type
        launch_date
        details
        flight_number
        article_link
        launch_success
        reuse {
        	core
          side_core1
          side_core2
          fairings
          capsule
  	    }
        links {
          reddit_campaign
          reddit_launch
          reddit_media
          reddit_recovery
        }
      }
    }
  `
  }
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

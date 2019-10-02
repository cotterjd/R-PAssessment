const log = console.log
, R = require('ramda')
, config = require('../config')
, gqlClient = require('graphql-client')({
    url: config.GQL_URL
  })
, fs = require('fs')
, json = fs.readFileSync('./seed-data.json', 'utf8')
, arr = JSON.parse(json)
, x = arr[1]
, launchObj = {
    rocket_name: x.rocket.rocket_name
  , rocket_type: x.rocket.rocket_type
  , launch_date: x.launch_date_utc
  , ...R.pick([
      'details'
    , 'flight_number'
    , 'launch_success'
    , 'reuse'
    , 'links'
    ], x)
  }
, query = `
    mutation CreateLaunch ($data: LaunchCreateInput!){
      createLaunch(data: $data) {
        id
      }
    }
  `
;

gqlClient.query(query, {data: launchObj})
.then(log)
.catch(log)

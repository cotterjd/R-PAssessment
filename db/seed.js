const log = console.log

, R = require('ramda')

, config = require('../config')
, gqlClient = require('graphql-client')({
    url: config.GQL_URL
  })

, fs = require('fs')
, json = fs.readFileSync('./seed-data.json', 'utf8')

, data = JSON.parse(json)

, createLaunchObj = x => ({
    rocket_name: x.rocket.rocket_name
  , rocket_type: x.rocket.rocket_type
  , launch_date: x.launch_date_local
  , reuse: R.pick(['core', 'side_core1', 'side_core2', 'fairings', 'capsule'], x.reuse)
  , links: R.pick(['reddit_campaign', 'reddit_launch', 'reddit_recovery', 'reddit_media', 'article_link'], x.links)
  , ...R.pick([
      'details'
    , 'flight_number'
    , 'launch_success'
    , 'mission_patch_small'
    ], x)
  })
, launchData = data.map(createLaunchObj)

, getStrProp = (obj, propName) => !obj[propName] ? null : JSON.stringify(obj[propName])
, gqlProp = (name, parent, notStr) => notStr
    ? `${name}: ${parent[name]}` : `${name}: ${getStrProp(parent, name)}`
, launchQuery = (x, i) => `
    m${i}: createLaunch(
      data: {
        ${gqlProp('rocket_name', x)}
        ${gqlProp('rocket_type', x)}
        ${gqlProp('launch_date', x)}
        ${gqlProp('details', x)}
        ${gqlProp('mission_patch_small', x)}
        ${gqlProp('flight_number', x, true)}
        ${gqlProp('launch_success', x, true)}
        ${gqlProp('article_link', x.links)}
        reuse: {
          create: {
            ${gqlProp('core', x.reuse, true)}
            ${gqlProp('side_core1', x.reuse, true)}
            ${gqlProp('side_core2', x.reuse, true)}
            ${gqlProp('fairings', x.reuse, true)}
            ${gqlProp('capsule', x.reuse, true)}
          }
        }
        links: {
          create: {
            ${gqlProp('reddit_campaign', x.links)}
            ${gqlProp('reddit_launch', x.links)}
            ${gqlProp('reddit_recovery', x.links)}
            ${gqlProp('reddit_media', x.links)}
          }
        }
      }
    ) {
      id
    }
  `
, masterQuery = xs => `
    mutation {
      ${xs.map((x, i) => launchQuery(x, i)).join(' ')}
    }
  `
;

gqlClient.query(`{ launches {id}}`)
  .then(r => {
    if (!r.errors) {
      if (!r.data.launches.length) {
        gqlClient.query(masterQuery(launchData))
          .then(r => {
            if(!r.errors) log('data successfully seeded')
            else log(r.errors)
          }).catch(log)
      } else log('data already exists')
    } else {
      log(r.errors)
    }
  }).catch(log)

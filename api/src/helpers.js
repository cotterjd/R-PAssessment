const R = require('ramda')

module.exports = {
  getFullQuery,
}
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
      mission_patch_small
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

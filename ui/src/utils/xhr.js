const log = console.log

export function getData(filters = []) {
  const query = `
    {
      launches ${getFilters(filters)}{
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
  return fetch('http://localhost:8080/gql', {
    method: 'POST'
  , body: JSON.stringify({ query })
  , headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(r => r.json())
  .then(r => {
    const result = JSON.parse(r)
    if (!result.data) {
      handleError(r.errors)
      return mockData()
    } else return result.data.launches || []
  })
  .catch(e => {
    handleError(e)
    return mockData()
  })
}

function handleError(e) {
	log(e)
	alert('An error occured. Please try again or contact support at 405-738-5435')
}

function getFilters(filters = []) {
  const fs = filters.map(getGQLStr)
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

function mockData() {
  const dummyData = Array(60).fill(
    {badge: '../assets/images/placeholder.png', rocket_name: 'Name', rocket_type: 'Type', launch_date: '01/01/1971', details: 'Lorem ipsum dolor sit amet consectetur...', id: 'X', article: 'www.consortiumnews.com'}
  )
  return [
    {badge: '../assets/images/placeholder.png', rocket_name: 'Falcon 1', rocket_type: 'Merlin A', launch_date: '03/25/2005', details: 'Engine failure at 33 seconds and loss of vehicle', id: 1, article: 'www.lewrockwell.com'}
  ].concat(dummyData)
}

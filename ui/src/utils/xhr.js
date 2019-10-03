const log = console.log

export function getData(filters = []) {
  return fetch('http://localhost:8080/launches', {
    method: 'POST'
  , body: JSON.stringify({ filters })
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

function mockData() {
  const dummyData = Array(60).fill(
    {badge: '../assets/images/placeholder.png', rocket_name: 'Name', rocket_type: 'Type', launch_date: '01/01/1971', details: 'Lorem ipsum dolor sit amet consectetur...', id: 'X', article: 'www.consortiumnews.com'}
  )
  return [
    {badge: '../assets/images/placeholder.png', rocket_name: 'Falcon 1', rocket_type: 'Merlin A', launch_date: '03/25/2005', details: 'Engine failure at 33 seconds and loss of vehicle', id: 1, article: 'www.lewrockwell.com'}
  ].concat(dummyData)
}

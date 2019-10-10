const fetch = require('node-fetch')
const {getFullQuery} = require('./helpers')
const {GQL_DOMAIN} = require('../config')

module.exports = async function launchService(filters = []) {
  if (!(filters instanceof Array)) throw new Error("filters must be an array")
  if (filters.some(x => typeof x !== "string")) throw new Error("filters must be an array of strings")
  filters.forEach((filter) => {
    if (!['with_reddit', 'reused', 'land_success'].includes(filter)) {
      return new Error(`${filter} is not a valid filter`)
    }
  })

  try {
    const response = await fetch(`http://${GQL_DOMAIN || 'localhost'}:4468`, {
      method: 'POST'
    , body: JSON.stringify({
        query: getFullQuery(filters)
      })
    , headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.json()
  } catch(e) {
    return new Error(e)
  }
}

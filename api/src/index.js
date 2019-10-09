const express = require("express");
const app = express();
const port = process.env.PORT || '8080'
const bodyParser = require('body-parser')
const rp = require('request-promise')
const {GQL_DOMAIN} = require('../config')

app.use(bodyParser.json())
app.use((req, res, next) => {
  const origin = req.headers.origin || "*"
  const allowedOrigins = [
    "http://space-x.cotterslist.com",
    "https://space-x.cotterslist.com",
    "http://cotterjd.github.io/rp_ui",
    "https://cotterjd.github.io/rp_ui",
    "http://localhost:3000"
  ]
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Headers', ['Content-Type'])
  if (res.method === 'OPTIONS') res.end("")

  next()
})

app.post("/launches", (req, res) => {
  const {filters = []} = req.body
  if (!(filters instanceof Array)) return res.json({errors: "filters must be an array"})
  if (filters.some(x => typeof x !== "string")) return res.json({errors: "filters must be an array of strings"})
  const query = require('./helpers').getFullQuery(filters)
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
});

module.exports = {
  test: () => 'foo'
}

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

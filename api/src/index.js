const express = require("express");
const fetch = require('node-fetch')
const app = express();
const port = process.env.PORT || '8080'
const bodyParser = require('body-parser')
const launchService = require('./launchService')
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

app.get('/', (req, res) => {
  res.send("Hi! I'm reponsible for sending Space X data to space-x.cotterslist.com. Try adding /test to the url to see me in action.")
})

app.get('/test', (req, res) => {
  const query = require('./helpers').getFullQuery([])
  return fetch({
    uri: `http://${GQL_DOMAIN}:4468`
  , method: 'POST'
  , body: JSON.stringify({query})
  , headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(r => res.json(r))
  .catch(error => res.json({errors: error}))
})

app.post("/launches", async (req, res) => {
  try {
    const r = await launchService(req.body.filters || [])
    res.json(r)
  } catch(e) {
    return res.status(500).json(e)
  }
});

app.post("/query", async (req, res) => {
  const {query} = req.body
  if (query.includes('mutation')) {
    return res.status(401)
  }
  return fetch({
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

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

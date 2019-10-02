const express = require("express");
const app = express();
const port = process.env.PORT || '8080'
const bodyParser = require('body-parser')
const rp = require('request-promise')

app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Headers', ['Content-Type'])
  if (res.method === 'OPTIONS') res.end("")

  next()
})

app.get("/", (req, res) => {
  return rp({
    uri: 'http://localhost:4468'
  , method: 'POST'
  , body: JSON.stringify({query: `{
        launches {id}
    }`})
  , headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(r => {
    return res.status(200).json(r)
  })
  .catch(error => {
    return res.status(500).json({error})
  })
});

app.post("/gql", (req, res) => {
  const {query} = req.body
  if (!query) return res.json(500).json({error: 'no query'})
  return rp({
    uri: 'http://localhost:4468'
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

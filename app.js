const express = require('express')
const bodyParser = require('body-parser')

const api = require('./api')
const { Response } = require('./api/helpers')

const app = express()

const port = 8080

app.use(bodyParser.json())
app.use('/api', api)
app.use((req, res, next) => {
    const response = new Response(200, res.locals.data)
    res.status(200).json(response.toJson(req.url))
})
app.use((error, req, res, next) => {
    console.log(error)
    res.status(error.status).json(error.toJson(req.url))
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))


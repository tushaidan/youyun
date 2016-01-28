const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

let app = express()
app.use(cors())
app.set('port', (process.env.PORT || 3300))
app.use('/', express.static(path.join(__dirname, '/')))
app.use(bodyParser.json()) // contentType: "application/json; charset=UTF-8"
app.use(bodyParser.urlencoded({extended: true}))
app.use((req, res, next)=> { // http://stackoverflow.com/a/17479034
    res.setHeader('Cache-Control', 'no-cache')
    next()
})

let PANDECT = path.join(__dirname, 'pandect.json')
app.get('/pandect', function(req, res) {
    fs.readFile(PANDECT, function(err, data) {
        res.json(JSON.parse(data))
    })
})

let files = require('./fine_uploader')
app.use('/files', files)

let userone = require('./userone')
app.use('/userone', userone)

let apps = require('./apps')
app.use('/applications', apps)

let codes = require('./codes')
app.use('/codes', codes)

let services = require('./services')
app.use('/services', services)

let monitors = require('./monitors')
app.use('/monitors', monitors)

let syslogs = require('./syslogs')
app.use('/syslogs', syslogs)

let clouds = require('./clouds')
app.use('/clouds', clouds)

let triggerevents = require('./triggerevents')
app.use('/triggerevents', triggerevents)

app.listen(app.get('port'), ()=> {
    console.log('Server started: http://localhost:' + app.get('port') + '/')
})

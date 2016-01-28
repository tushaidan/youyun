const fs = require('fs')
const path = require('path')
const express = require('express')
const _ = require('lodash')
const router = express.Router()

const APPS = path.join(__dirname, 'syslogs/apps.json')

router.get('/app/:id', function(req, res) {
    fs.readFile(APPS, function(err, data) {
        res.json(JSON.parse(data))
    })
})

router.get('/service/:id', function(req, res) {
    fs.readFile(APPS, function(err, data) {
        res.json(JSON.parse(data))
    })
})

module.exports = router

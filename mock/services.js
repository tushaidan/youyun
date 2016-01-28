const fs = require('fs')
const path = require('path')
const express = require('express')
const _ = require('lodash')
const router = express.Router()

const FILE = path.join(__dirname, 'services/services.json')
const FILE_CREATE = path.join(__dirname, 'services/services_create.json')

router.get('/', function(req, res) {
    fs.readFile(FILE, function(err, data) {
        res.json(JSON.parse(data))
    })
})

router.get('/:id', function(req, res) {
    fs.readFile(FILE, function(err, data) {
        let result = _.findWhere(JSON.parse(data), {"serviceId": req.params.id})
        res.json(result)
    })
})

router.delete('/:id', function(req, res) {
    fs.readFile(FILE, function(err, data) {
        let apps = JSON.parse(data);
        let newApps = apps.filter(function(item) {
            return item.appId != req.params.id
        })
        fs.writeFile(FILE, JSON.stringify(newApps, null, 4), function(err) {
            res.json(newApps)
        })
    })
})

router.post('/create', function(req, res) {
    fs.readFile(FILE_CREATE, function(err, data) {
        data = JSON.parse(data)
        Object.assign(data, req.body)
        fs.writeFile(FILE_CREATE, JSON.stringify(data, null, 4), function(err) {
            res.json(data)
        })
    })
})

module.exports = router

const fs = require('fs')
const path = require('path')
const express = require('express')
const _ = require('lodash')
const router = express.Router()

const EVENTS = path.join(__dirname, 'triggerevents/events.json')
const EVENT = path.join(__dirname, 'triggerevents/event.json')

router.get('/', function(req, res) {
    fs.readFile(EVENTS, function(err, data) {
        res.json(JSON.parse(data.triggerEvents))
    })
})

router.get('/:id', function(req, res) {
    fs.readFile(EVENT, function(err, data) {
        let result = _.findWhere(JSON.parse(data.triggerEvents), {"id": req.params.id})
        res.json(result)
    })
})

router.post('/', function(req, res) {
    fs.readFile(EVENT, function(err, data) {
        data = JSON.parse(data)
        Object.assign(data, req.body)
        fs.writeFile(EVENT, JSON.stringify(data), function(err) {
            res.json(data)
        })
    })
})

router.put('/modify', function(req, res) {
    fs.readFile(EVENT, function(err, data) {
        data = JSON.parse(data)
        Object.assign(data, req.body)
        fs.writeFile(EVENT, JSON.stringify(data), function(err) {
            res.json(data)
        })
    })
})

router.delete('/:id', function(req, res) {
    res.json({id: req.params.id})
})

module.exports = router

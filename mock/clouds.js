const fs = require('fs')
const path = require('path')
const express = require('express')
const _ = require('lodash')
const router = express.Router()

const ACCOUNTS = path.join(__dirname, 'clouds/accounts.json')
const ACCOUNTS_FORM = path.join(__dirname, 'clouds/accounts_form.json')

router.get('/networkconf', function(req, res) {
    fs.readFile(path.join(__dirname, 'clouds/networkconfs.json'), function(err, data) {
        res.json(JSON.parse(data))
    })
})

router.get('/instancetype/:id', function(req, res) {
    fs.readFile(path.join(__dirname, 'clouds/instancetypes.json'), function(err, data) {
        res.json(JSON.parse(data))
    })
})

router.get('/image/:id', function(req, res) {
    fs.readFile(path.join(__dirname, 'clouds/images.json'), function(err, data) {
        res.json(JSON.parse(data))
    })
})

router.get('/cloudaccount', function(req, res) {
    res.json(
        [{"cloudAccountId":2,"name":"cloudstack","provider":"cloudstack","status":0}]
    )
})

router.get('/node_status/:id', function(req, res) {
    res.json(
        {"runningNum":40,"stopNum":4,"suspendNum":0}
    )
})

router.get('/pub_ip/count/:id', function(req, res) {
    res.json(
        {elasticPubIpNum: 1, classicPubIpNum: 2, privateNetWorkNum: 3}
    )
})

router.get('/network/count/:id', function(req, res) {
    res.json(
        {"classicNetWorkNum":1,"privateNetWorkNum":0}
    )
})

router.get('/monitors/cpu/runtime', function(req, res) {
    res.json(
        {"maxValuePer":0,"maxValueSum":0,"nodeNum":2,"ratio":0,"useValueSum":0}
    )
})

router.get('/monitors/mem/runtime', function(req, res) {
    res.json(
        {"maxValuePer":0,"maxValueSum":0,"nodeNum":2,"ratio":0,"useValueSum":0}
    )
})

router.get('/monitors/disk/runtime', function(req, res) {
    res.json(
        {"maxValuePer":0,"maxValueSum":0,"nodeNum":2,"ratio":0,"useValueSum":0}
    )
})
// -----------------------------------------------------------

router.get('/cloudaccount/:id', function(req, res) {
    fs.readFile(ACCOUNTS, function(err, data) {
        let result = _.findWhere(JSON.parse(data), {"cloudAccountId": req.params.id})
        res.json(result)
    })
})

router.post('/cloudaccount', function(req, res) {
    fs.readFile(ACCOUNTS_FORM, function(err, data) {
        data = JSON.parse(data)
        Object.assign(data, req.body)
        fs.writeFile(ACCOUNTS_FORM, JSON.stringify(data), function(err) {
            res.json(data)
        })
    })
})

router.put('/cloudaccount', function(req, res) {
    fs.readFile(ACCOUNTS_FORM, function(err, data) {
        data = JSON.parse(data)
        Object.assign(data, req.body)
        fs.writeFile(ACCOUNTS_FORM, JSON.stringify(data), function(err) {
            res.json(data)
        })
    })
})

router.delete('/cloudaccount/:id', function(req, res) {
    res.json({id: req.params.id})
})

module.exports = router

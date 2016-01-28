const fs = require('fs')
const path = require('path')
const express = require('express')
const _ = require('lodash')
const router = express.Router()

const APPLICATIONS = path.join(__dirname, 'apps/applications.json')
const APPLICATIONS_CREATE = path.join(__dirname, 'apps/applications_create.json')

router.get('/', function(req, res) {
    fs.readFile(APPLICATIONS, function(err, data) {
        res.json(JSON.parse(data))
    })
})

router.get('/type', function(req, res) {
    res.json(
        [{"description":"","id":1,"logoUrl":"","name":"JAVA","sortId":1},{"description":"","id":2,"logoUrl":"","name":"TOMCAT","sortId":1}]
    )
})

router.get('/type_version', function(req, res) {
    res.json(
        [{"description":"","id":1,"version":"7.0"}]
    )
})

router.get('/type/param_conf/1/7.0', function(req, res) {
    res.json([
        {"description":"启动jvm参数","name":"启动jvm参数","type":"string","key":"start_jvm_param"},
        {"description":"启动参数","name":"启动参数","type":"string","key":"start_param"},
        {"description":"启动mian主函数","name":"启动mian主函数","type":"string","key":"start_main"},
        {"description":"启动jvm参数","name":"停止jvm参数","type":"string","key":"stop_jvm_param"},
        {"description":"启动参数","name":"停止参数","type":"string","key":"stop_param"},
        {"description":"启动mian主函数","name":"停止mian主函数","type":"string","key":"stop_main"}
    ])
})

// -----------------------------------------------------------

router.get('/:id', function(req, res) {
    fs.readFile(APPLICATIONS, function(err, data) {
        let result = _.findWhere(JSON.parse(data), {"applicationId": req.params.id})
        res.json(result)
    })
})

router.delete('/:id', function(req, res) {
    fs.readFile(APPLICATIONS, function(err, data) {
        let apps = JSON.parse(data);
        let newApps = apps.filter(function(item) {
            return item.appId != req.params.id
        })
        fs.writeFile(APPLICATIONS, JSON.stringify(newApps, null, 4), function(err) {
            res.json(newApps)
        })
    })
})

router.post('/', function(req, res) {
    fs.readFile(APPLICATIONS_CREATE, function(err, data) {
        data = JSON.parse(data)
        Object.assign(data, req.body)
        fs.writeFile(APPLICATIONS_CREATE, JSON.stringify(data, null, 4), function(err) {
            res.json(data)
        })
    })
})

module.exports = router

const fs = require('fs')
const path = require('path')
const express = require('express')
const router = express.Router()

const CPU_RUNTIME = path.join(__dirname, 'monitor/cpu_runtime.json')
const MEM_RUNTIME = path.join(__dirname, 'monitor/mem_runtime.json')
const DISK_RUNTIME = path.join(__dirname, 'monitor/disk_runtime.json')
const DISKIO_RUNTIME = path.join(__dirname, 'monitor/diskio_runtime.json')
const NETIO_RUNTIME = path.join(__dirname, 'monitor/netio_runtime.json')

const CPU_HISTORY = path.join(__dirname, 'monitor/cpu_history.json')
const MEM_HISTORY = path.join(__dirname, 'monitor/mem_history.json')
const DISK_HISTORY = path.join(__dirname, 'monitor/disk_history.json')
const DISKIO_HISTORY = path.join(__dirname, 'monitor/diskio_history.json')
const NETIO_HISTORY = path.join(__dirname, 'monitor/netio_history.json')

router.post('/cpu/runtime', function(req, res) {
    fs.readFile(CPU_RUNTIME, function(err, data) {
        res.json(JSON.parse(data))
    })
})

router.post('/mem/runtime', function(req, res) {
    fs.readFile(MEM_RUNTIME, function(err, data) {
        res.json(JSON.parse(data))
    })
})

router.post('/disk/runtime', function(req, res) {
    fs.readFile(DISK_RUNTIME, function(err, data) {
        res.json(JSON.parse(data))
    })
})

router.post('/diskio/runtime', function(req, res) {
    fs.readFile(DISKIO_RUNTIME, function(err, data) {
        res.json(JSON.parse(data))
    })
})

router.post('/netio/runtime', function(req, res) {
    fs.readFile(NETIO_RUNTIME, function(err, data) {
        res.json(JSON.parse(data))
    })
})

router.post('/cpu/history', function(req, res) {
    fs.readFile(CPU_HISTORY, function(err, data) {
        res.json(JSON.parse(data))
    })
})

router.post('/mem/history', function(req, res) {
    fs.readFile(MEM_HISTORY, function(err, data) {
        res.json(JSON.parse(data))
    })
})

router.post('/disk/history', function(req, res) {
    fs.readFile(DISK_HISTORY, function(err, data) {
        res.json(JSON.parse(data))
    })
})

router.post('/diskio/history', function(req, res) {
    fs.readFile(DISKIO_HISTORY, function(err, data) {
        res.json(JSON.parse(data))
    })
})

router.post('/netio/history', function(req, res) {
    fs.readFile(NETIO_HISTORY, function(err, data) {
        res.json(JSON.parse(data))
    })
})

module.exports = router

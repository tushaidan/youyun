const express = require('express')
const router = express.Router()

router.post('/users/register', function(req, res) {
    res.json(req.body)
})

router.post('/admins/login', function(req, res) {
    let data = req.body
    Object.assign(data, {msg: "zxcasfdasdwqdszfdsfsddqwe"})
    res.json(data)
})

module.exports = router

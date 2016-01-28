const express = require('express')
const router = express.Router()

router.post('/only_flag', function(req, res) {
    res.json({"id":"bfd271641beb48fbb834128793dbe85d"})
})

module.exports = router

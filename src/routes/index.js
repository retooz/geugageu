const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    let data = req.session
    res.render('index', {user : data.passport})
})

router.get('/join', (req, res) => {
    res.render('join')
})

router.get('/upload', (req,res) => {
    res.render('extract')
})


module.exports = router
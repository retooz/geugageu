const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    let data = req.session
    res.render('index', {user : data.passport})
})

router.get('/main', (req,res) => {
    let data = req.session
    res.render('main', {'user' : data.passport.user})
})

router.get('/login', (req,res) => {
    res.render('login')
})

module.exports = router
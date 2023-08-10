const express = require('express');
const homeService = require('../services/homeService');
const router = express.Router()
const passport = require('../passport/passport')

router.post('/join', async (req, res) => {
    const data = req.body;
    try {
        const joinResult = await homeService.join(data)

        if (joinResult.affectedRows > 0) {
            res.json({ message: 'success' })
        } else {
            res.status(500).json({ message: 'join failed' })
        }
    } catch (err) {
        res.status(500).json({ message: 'error occured' })
    }
})

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    }), (err, req, res, next) => {
        if(err) {
            console.log(err)
            next(err)
        }
        console.log('logged in')
    }
)

router.post('/check', async (req,res) => {
    const data = req.body;
    try {
        const checkResult = await homeService.idCheck(data)

        if (checkResult.length == 0) {
            res.json({ message : 'OK' })
        } else {
            res.status(500).json({ message : 'reject'})
        }
    } catch (err) {
        res.status(500).json({ message : 'error occurred'})
    }
})


module.exports = router
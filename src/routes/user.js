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
        failureRedirect: '/login',
        failureFlash: true
    })
)

module.exports = router
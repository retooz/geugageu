const express = require('express');
const homeService = require('../services/homeService');
const router = express.Router()
const passport = require('../passport/passport')
const fs = require('fs')
const path = require('path')
const multer = require('multer')

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './public/assets/uploaded')
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename("user_") + Date.now() + ext)
        }
    })
})

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
        if (err) {
            console.log(err)
            next(err)
        }
        console.log('logged in')
    }
)

router.post('/check', async (req, res) => {
    const data = req.body;
    try {
        const checkResult = await homeService.idCheck(data)

        if (checkResult.length == 0) {
            res.json({ message: 'OK' })
        } else {
            res.status(500).json({ message: 'reject' })
        }
    } catch (err) {
        res.status(500).json({ message: 'error occurred' })
    }
})

router.get('/mypage', (req, res) => {
    res.render('userpage')
})

router.get('/myGeuGaGeu', (req, res) => {
    res.render('mygeugageu')
})

router.get('/scrape', (req, res) => {
    res.render('scrape')
})

router.get('/like', (req, res) => {
    res.render('like')
})

router.post('/upload', upload.single('input-image'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    console.log(req.file.filename)
})
module.exports = router
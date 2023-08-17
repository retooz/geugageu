const express = require('express');
const homeService = require('../services/homeService');
const router = express.Router()
const passport = require('../passport/passport')
const multer = require('multer')
const path = require('path')
const upload = multer({
    storage: multer.diskStorage({

        destination: function (req, file, cb) {
            cb(null, './public/assets/uploaded/')
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname)
            cb(null, path.basename('user_') + Date.now() + ext)
        }
    })
})

router.post('/join', async (req, res) => {
    const data = req.body;
    let colors = ''
    let furniture = ''
    for (i = 0; i < req.body.colors.length; i++) {
        if (i != req.body.colors.length - 1) {
            colors = colors + req.body.colors[i] + ','
        } else {
            colors = colors + req.body.colors[i]
        }
    }
    for (i = 0; i < req.body.furniture.length; i++) {
        if (i != req.body.furniture.length - 1) {
            furniture = furniture + req.body.furniture[i] + ','
        } else {
            furniture = furniture + req.body.furniture[i]
        }
    }
    try {
        const joinResult = await homeService.join(data, colors, furniture)

        if (joinResult.affectedRows > 0) {
            res.redirect('/')
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

router.get('/mypage', async (req, res) => {
    const session = req.session.passport;
    if(session == undefined) {
        return res.redirect('/')
    }
    const user_id = req.session.passport.user
    try {
        const userData = await homeService.getUserData(user_id)
        const colors = userData.p_color.split(',')
        const u_url = userData.u_url
        const ex_color = userData.ex_color.split(',')
        const fav = userData.like_prd.split(',')
        const favList = await homeService.getUserFav(fav)
        res.render('userpage', { user: userData, colors: colors, u_url: u_url, ex_color: ex_color, favList: favList})
    } catch (err) {
        res.status(500).json({ message: "error" })
    }
})

router.get('/like', async (req, res) => {
    const session = req.session.passport;
    if(session == undefined) {
        return res.redirect('/')
    }
    const user_id = req.session.passport.user
    try {
        const userData = await homeService.getUserData(user_id)
        const fav = userData.like_prd.split(',')
        const favList = await homeService.getUserFav(fav)
        console.log(favList)
        res.render('like', {favList: favList})
    } catch (err) {
        res.status(500).json({ message: "error" })
    }
})

router.post('/upload', upload.single('input-image'), async (req, res) => {
    const u_url = req.file.path.slice(7);
    const ex_color = req.body.color_pallete.replace('[  "', '').replace('",  "', ',').replace('",  "', ',').replace('"]', '');
    console.log(ex_color)
    const user_id = req.session.passport.user;
    try {
        const result = await homeService.insertExtract(u_url, ex_color, user_id)
        console.log(result)
        if (result.affectedRows > 0) {
            res.redirect('/user/mypage')
        } else {
            res.status(500).json({ message: 'failed' })
        }
    } catch (err) {
        res.status(500).json({ message: 'error occured' })
    }
})

module.exports = router
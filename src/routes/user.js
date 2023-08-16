
// router.get('/mypage', async (req,res) => {
//     const user_id = req.session.passport.user;
//     // const user_id = req.body.user_id;
//     try {
//         const extractReusult = await homeService.selectUser(user_id);
//         if (extractReusult.affectedRows > 0) {
//             res.render('userpage',{ extractValue : extractReusult})
//         } else {
//             res.status(500).json({ message: 'failed' })
//         }
//     } catch (err){
//         res.status(500).json({ message: 'error' })
//     } 
// })

const express = require('express');
const homeService = require('../services/homeService');
const router = express.Router()
const passport = require('../passport/passport')
const multer = require('multer')
const path = require('path')
const upload = multer({
    storage: multer.diskStorage({

        destination: function(req,file, cb) {
            cb(null, './public/assets/uploaded/')
        },
        filename: function(req, file, cb) {
            const ext = path.extname(file.originalname)
            cb(null, path.basename('user_') + Date.now() + ext)
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

router.get('/mypage',  async (req,res) => {
    const user_id = req.session.passport.user
    try {
        const userData = await homeService.getUserData(user_id)
        res.render('userpage', {user : userData})
    } catch (err) {
        res.status(500).json({message : "error"})
    }
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

router.post('/upload', upload.single('input-image'), async (req,res) => {
    const u_url = req.file.path;
    const ex_color = req.body.color_pallete;
    const user_id = req.session.passport.user;
    try {
        console.log(req.body)
        console.log(req.file)
        console.log(req.file.path)
        console.log(req.file.filename)
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
const express = require('express')
const router = express.Router()
const homeService = require('../services/homeService');

router.get('/', async (req,res) => {
    const session = req.session.passport;
    if(session == undefined) {
        return res.redirect('/')
    }
    const user_id = session.user;
    const query = "%"+decodeURIComponent(req.query.query)+"%"
    try {
        const result = await homeService.searchByKeyword(query)
        const resultBS = await homeService.searchByKeywordBS(query)
        const fav = await homeService.getFav(user_id)
        let favList;
        if(fav[0].like_prd != null) {
            favList = fav[0].like_prd.split(',')
        }
        res.render('search', {list : result, bs: resultBS, favList: favList})
    } catch (err){
        res.status(500).json({message : "error"})
    }
})

router.get('/:query/:page', async (req,res) => {
    const user_id = req.session.passport.user;
    const query = "%"+decodeURIComponent(req.params.query)+"%"
    const page = parseInt(req.params.page);
    const itemsPerPage = 12;
    const fav = await homeService.getFav(user_id)
    try {
        const result = await homeService.searchByKeyword(query)
        res.json(result);
    } catch (err){
        res.status(500).json({message : "error"})
    }
})

module.exports = router
const express = require('express')
const router = express.Router()
const homeService = require('../services/homeService');

router.get('/:query', async (req,res) => {
    const query = "%"+decodeURIComponent(req.params.query)+"%"
    try {
        const result = await homeService.searchByKeyword(query)
        res.render('search', {list : result})
    } catch (err){
        res.status(500).json({message : "error"})
    }
})

router.get('/:query/:page', async (req,res) => {
    const query = "%"+decodeURIComponent(req.params.query)+"%"
    try {
        const result = await homeService.searchByKeyword(query)
        res.json(result);
    } catch (err){
        res.status(500).json({message : "error"})
    }
})

module.exports = router
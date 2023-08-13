const express = require('express')
const homeService = require('../services/homeService')
const router = express.Router()

router.get('/:category', async(req, res) => {
    const {category} = req.params
    let categoryKo = ''
    switch (category) {
        case 'bedroom' :
            categoryKo = '가구'
    }
    try {
        const result = await homeService.getProductList(categoryKo)
        res.render('shop', {category : category, list : result})
    } catch (err) {
        res.status(500).json({message : "error"})
    }
})

module.exports = router
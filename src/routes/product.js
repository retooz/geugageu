const express = require('express')
const router = express.Router()
const homeService = require('../services/homeService')

router.get('/:p_id', async (req,res) => {
    const {p_id}  = req.params
    try {
        const result = await homeService.productDetail(p_id)

        console.log(result)
        res.render('product-detail', {p_detail : result[0]})
    } catch (err) {
        res.status(500).json({ message : 'error occured'})
    }
    
})

module.exports = router
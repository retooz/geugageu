const express = require('express')
const router = express.Router()
const homeService = require('../services/homeService')

router.get('/:p_id', async (req,res) => {
    const {p_id}  = req.params
    try {
        const result = await homeService.productDetail(p_id)

        result.p_desc = result.p_desc.replace('[', '').replace(']', '')
        res.render('product-detail', {p_detail : result})
    } catch (err) {
        res.status(500).json({ message : 'error occured'})
    }
    
})

router.post('/update', async(req,res) => {
    console.log('as')
})
module.exports = router
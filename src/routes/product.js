const express = require('express')
const router = express.Router()
const homeService = require('../services/homeService')
const { productDetail } = require('../queries/userQueries')

router.get('/:p_id', async (req,res) => {
    const {p_id} = req.params
    try {
        const result = await homeService.productDetail(p_id)
        console.log(result)

        result.p_price = result.p_price.toLocaleString();
        result.p_desc = result.p_desc.replace('[', '').replace(']', '')
        result.p_detail = result.p_detail.replace('[', '').replace(']', '')
        result.p_material = result.p_material.replace('[', '').replace(']', '')
        result.p_measure_detail = result.p_measure_detail.replace('[', '').replace(']', '').replaceAll('?','').replaceAll(':', " : ")


        res.render('product-detail',{p_detail : result})
    } catch (err){
        res.status(500).json({ message: 'error' })
    }
})

router.post('/update', async (req,res)=>{
    const addedValue = parseInt(req.body.rating);
    const p_id = req.body.p_id;
    try{
        const result = await homeService.productDetail(p_id)

        const new_rat_value = ((result.rat_value * result.rat_count + addedValue) / (result.rat_count + 1)).toFixed(1)
        const new_rat_count = result.rat_count + 1
        const result2 = await homeService.ratingModify(new_rat_value, new_rat_count , result.p_id)

        res.status(200).json({message : "Success"})
    } catch (err){
        res.status(500).json({message : "Error"})
    } 
})



router.post('/update', async(req,res) => {
    console.log('as')
})
module.exports = router
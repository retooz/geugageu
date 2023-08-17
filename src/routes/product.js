const express = require('express')
const router = express.Router()
const homeService = require('../services/homeService')


router.get('/:p_id', async (req,res) => {
    const session = req.session.passport;
    if(session == undefined) {
        return res.redirect('/')
    }
    const {p_id} = req.params
    try {
        const result = await homeService.productDetail(p_id)
        console.log(result)
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

module.exports = router
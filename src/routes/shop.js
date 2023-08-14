const express = require('express')
const homeService = require('../services/homeService')
const router = express.Router()


router.get('/:category', async(req, res)=>{
    const {category} = req.params
    let categoryKo = ''
    switch (category) {
        case 'bedroom' :
            categoryKo = '침대/매트리스'
            break
        case 'bathroom' :
            categoryKo = '욕실'
            break
        case 'homeoffice' :
            categoryKo = '홈오피스'
            break
        case 'livingroom' :
            categoryKo = '가구'
            break
        case 'kids' :
            categoryKo ='어린이 IKEA'
            break
        case 'kitchen' :
            categoryKo = '주방가구'
    } try {
        const result = await homeService.getProductList(categoryKo)
        const result2 = await homeService.getProductBS(categoryKo) // 베스트셀러
        for(let i = 0; i <= 3; i++){
            result2[i].p_price = result2[i].p_price.toLocaleString();
        } 
        for(let i = 0; i < 12; i++){
            result[i].p_price = result[i].p_price.toLocaleString();
        }
        res.render('shop', {list : result, bs : result2, category : category})
    } catch (err){
        res.status(500).json({message : "error"})
    }
})

router.get('/:category/:page', async(req,res)=>{
    const category = req.params.category;
    let categoryKo = '';
    switch (category) {
        case 'bedroom' :
            categoryKo = '침대/매트리스'
            break
        case 'bathroom' :
            categoryKo = '욕실'
            break
        case 'homeoffice' :
            categoryKo = '홈오피스'
            break
        case 'livingroom' :
            categoryKo = '가구'
            break
        case 'kids' :
            categoryKo ='어린이 IKEA'
            break
        case 'kitchen' :
            categoryKo = '주방가구'
            break
    }
    const page = parseInt(req.params.page);
    const itemsPerPage = 12;
    
    try {
        const result = await homeService.getProductList(categoryKo, itemsPerPage, page);
        res.json(result);
    }catch(err){
        res.status(500).json({ message : "error"})
    }
})

module.exports = router;
const express = require('express')
const router = express.Router()

router.get('/:category', async(req, res) => {
    let {category} = req.params
    
    res.render('shop', {category : category})
})

module.exports = router
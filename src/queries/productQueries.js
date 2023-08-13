module.exports = {

    productDetail : `SELECT * FROM tb_product WHERE p_id = ? LIMIT 1`,

    rating : `UPDATE tb_product SET rat_value = ?, rat_count = ? WHERE p_id = ?  LIMIT 1`,

    getProductList : `SELECT * FROM tb_product where p_category1 = ?`
}
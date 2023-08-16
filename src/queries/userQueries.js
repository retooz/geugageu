module.exports = {

    userJoin : `INSERT INTO tb_user(user_id, user_pw, user_nick, p_color, p_furniture, user_family,user_joindate) VALUES (?, ?, ?, ?, ?, ?, NOW())`,

    selectUser : `SELECT * FROM tb_user WHERE user_id = ?`,

    idDoubleCheck : `SELECT * FROM tb_user WHERE user_id = ?`,

    productDetail : `SELECT * FROM tb_product WHERE p_id = ? LIMIT 1`,

    rating : `UPDATE tb_product SET rat_value = ?, rat_count = ? WHERE p_id = ?  LIMIT 1`,

    getExtract : `UPDATE tb_user SET u_url = ?, ex_color =? WHERE user_id = ?`
}
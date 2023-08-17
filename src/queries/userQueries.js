module.exports = {

    userJoin : `INSERT INTO tb_user(user_id, user_pw, user_nick, user_type, p_color, p_furniture, user_family, user_joindate) VALUES (?, ?, ?, "L", ?, ?, ?, NOW())`,

    getUserData : `SELECT * FROM tb_user WHERE user_id = ?`,

    idDoubleCheck : `SELECT * FROM tb_user WHERE user_id = ?`,

    insertExtract : `UPDATE tb_user SET u_url = ?, ex_color = ? WHERE user_id = ?`,

    selectUser : `SELECT * FROM tb_user WHERE user_id = ? and user_pw = ?`,

    getFav : `SELECT like_prd FROM tb_user WHERE user_id = ?`,

    modFav : `UPDATE tb_user SET like_prd = ? WHERE user_id = ?`,

    getFavList : `SELECT p_name, p_type, img_url FROM tb_product WHERE p_id in (?)`,
}
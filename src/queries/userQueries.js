module.exports = {

    userJoin : `INSERT INTO tb_user(user_id, user_pw, user_nick, p_color, p_furniture, user_family,user_joindate) VALUES (?, ?, ?, ?, ?, ?, NOW())`,

    getUserData : `SELECT * FROM tb_user WHERE user_id = ?`,

    idDoubleCheck : `SELECT * FROM tb_user WHERE user_id = ?`,

    insertExtract : `UPDATE tb_user SET u_url = ?, ex_color = ? WHERE user_id = ?`
}
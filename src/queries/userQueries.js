module.exports = {

    userJoin : `INSERT INTO tb_user(user_id, user_pw, user_nick, user_type, p_color, p_furniture, user_family, user_joindate) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,

    selectUser : `SELECT * FROM tb_user WHERE user_id = ? and user_pw = ?`,

    idDoubleCheck : `SELECT * FROM tb_user WHERE user_id = ?`,

}
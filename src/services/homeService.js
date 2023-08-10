const conn = require('../../config/database')
const queries = require('../queries/userQueries')

const homeService = {
    join : async (data) => {
        console.log(data);
        try {
            const [results] = await conn.query(queries.userJoin, [data.user_id, user_pw, user_nick, user_type, user_family, user_joindate])
            return results
        } catch (err) {
            console.log(err)
            throw err;
        }
    },

    idCheck : async (data) => {
        try {
            const [results] = await conn.query(queries.idDoubleCheck, [data.user_id])
            return results
        } catch (err) {
            console.log(err)
            throw err;
        }
    },

    productDetail : async(data) => {
        try {
            const [results] = await conn.query(queries.productDetail, [data])
            return results
        } catch (err) {
            console.log(err)
            throw err;
        }
    }
}

module.exports = homeService;
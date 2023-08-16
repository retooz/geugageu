const conn = require('../../config/database')
const userQueries = require('../queries/userQueries')
const productQueries = require('../queries/productQueries')
const { use } = require('passport')

const homeService = {
    join : async (user_id, user_pw, user_nick, p_color, p_furniture, user_family) => {
        try {
            const [results] = await conn.query(userQueries.userJoin, [user_id, user_pw, user_nick, p_color, p_furniture, user_family])
            return results
        } catch (err) {
            console.log(err)
            throw err;
        }

    },

    idCheck : async (data) => {
        try {
            const [results] = await conn.query(userQueries.idDoubleCheck, [data.user_id])
            return [results]
        } catch (err) {
            console.log(err)
            throw err;
        }
    },

    productDetail : async(data) => {
        try {
            const [results] = await conn.query(productQueries.productDetail, [data])
            return results[0]
        } catch (err) {
            console.log(err)
            throw err;
        }
    },

    ratingModify : async (new_rat_value,new_rat_count, p_id)=>{
        try {
            const[results] = await conn.query(productQueries.rating, [new_rat_value, new_rat_count, p_id])
            return results
        } catch (err){
            console.log(err)
            throw err;
        }
    },

    getProductList : async (category) => {
        try {
            const [results] = await conn.query(productQueries.getProductList, [category])
            return results
        } catch (err) { 
            console.log(err)
            throw err;
        }
    },

    getProductBS : async (category) => {
        try {
            const [results] = await conn.query(productQueries.getProductBS, [category])
            return results
        } catch (err) { 
            console.log(err)
            throw err;
        }
    },
    getExtract : async (u_url,ex_color,user_id) => {
        try {
            const [results] = await conn.query(userQueries.getExtract, [u_url,ex_color, user_id])
            return results
        } catch (err) { 
            console.log(err)
            throw err;
        }
    },
    selectUser : async (data) => {
        try {
            const [results] = await conn.query(userQueries.selectUser, [data])
            return results
        } catch (err) {
            console.log(err)
            throw err;
        }
    }
}

module.exports = homeService;
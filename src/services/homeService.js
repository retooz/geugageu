const conn = require('../../config/database')
const userQueries = require('../queries/userQueries')
const productQueries = require('../queries/productQueries')
const { use } = require('passport')

const homeService = {
    join : async (data, colors, furniture) => {
        try {
            const [results] = await conn.query(userQueries.userJoin, [data.id, data.pw, data.nick, colors, furniture, data.family])
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

    getUserData : async (user_id) => {
        try {
            const [results] = await conn.query(userQueries.getUserData, [user_id])
            return results[0]
        } catch (err) {
            console.log(err)
            throw err
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
    insertExtract : async (u_url,ex_color,user_id) => {
        try {
            const [results] = await conn.query(userQueries.insertExtract, [u_url,ex_color, user_id])
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
    },

    searchByKeyword : async (query) => {
        try {
            const [results] = await conn.query(productQueries.searchByKeyword, [query])
            return results
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    searchByKeywordBS : async(query) => {
        try {
            const [results] = await conn.query(productQueries.searchByKeywordBS, [query])
            return results
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    getFav : async (u_id) => {
        try {
            const[results] = await conn.query(userQueries.getFav, [u_id])
            return results
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    modFav : async (pid, u_id, mod) => {
        try {
            const [getList] = await conn.query(userQueries.getFav, [u_id])
            let favList = getList[0].like_prd
            console.log(mod)
            if(mod == 'add') {
                favList = favList + pid + ','
                console.log(favList)
                const [results] = await conn.query(userQueries.modFav, [favList, u_id])
                return results
            } else {
                favList = favList.replace(`${pid},`, '')
                console.log(favList)
                const [results] = await conn.query(userQueries.modFav, [favList, u_id])
                return results
            }
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    
    getUserFav : async(fav) => {
        try {
            const [results] = await conn.query(userQueries.getFavList, [fav])
            return results
        } catch (err) {
            console.log(err)
            throw err
        }
    },
}

module.exports = homeService;
const mysql = require('mysql2')

const pool = mysql.createPool({
    host : 'project-db-stu3.smhrd.com',
    user : 'Insa4_JSB_hacksim_1',
    password : 'aishcool1',
    port : 3308,
    database : 'Insa4_JSB_hacksim_1'
})

const conn = pool.promise();

module.exports = conn;
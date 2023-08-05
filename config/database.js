const mysql = require('mysql2')

let conn = mysql.createConnection({
    host : 'project-db-stu3.smhrd.com',
    user : 'Insa4_JSB_hacksim_1',
    password : 'aishcool1',
    port : 3308,
    database : 'Insa4_JSB_hacksim_1'
})

conn.connect()

module.exports = conn;
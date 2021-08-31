const mysql = require ('mysql2');
var db = mysql.createConnection({
  host: process.env.MY_SQL_HOST,
  user: process.env.MY_SQL_USER,
  database: process.env.MY_SQL_DATABASE,
  password: process.env.MY_SQL_ROOT_PASSWORD
})

module.exports = db;
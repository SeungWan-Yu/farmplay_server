const mysql2  = require('mysql2/promise');

const db = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password:process.env.DB_PSWORD ,       
  database:process.env.DB_DATABASE ,
  dateStrings: "date",
  multipleStatements: true
}



const pool  = mysql2.createPool(db);
const connection =  pool.getConnection(async conn=>conn);

module.exports = connection;
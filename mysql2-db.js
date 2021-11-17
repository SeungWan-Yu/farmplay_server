const mysql2  = require('mysql2/promise');
const db = {
    host: 'joy4.ddns.net',
    user: 'dshive',
    password: 'dshive!@#$',       
    database: 'farmplay',
    dateStrings: "date",
    multipleStatements: true
  }

console.log("안녕");
const pool  = mysql2.createPool(db);
const connection =  pool.getConnection(async conn=>conn);

module.exports = connection;
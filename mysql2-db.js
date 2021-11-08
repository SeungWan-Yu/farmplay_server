const mysql2  = require('mysql2/promise');
const db = {
  host: '14.63.223.217',
    user: 'dshive',
    password: 'dshive!@#$',       
    database: 'farmplay',
    dateStrings: "date",
    multipleStatements: true
  }


const pool  = mysql2.createPool(db);
const connection =  pool.getConnection(async conn=>conn);

module.exports = connection;
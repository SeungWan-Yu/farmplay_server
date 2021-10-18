var mysql = require('mysql');
var connection = mysql.createConnection({
    // host     : 'localhost',    // 호스트 주소
    // user     : 'root',           // mysql user
    // password : '1234',       // mysql password
    // database : 'farmplay', 
    // dateStrings: 'date',      // mysql 데이터베이스
    // multipleStatements: true
    
    host: '14.63.223.217',
    post: 3306,
    user: 'dshive',
    password: 'dshive!@#$',       
    database: 'farmplay',
    datastrings: "date",
    timezone: 'utc',
    multipleStatements: true
});

module.exports = connection;
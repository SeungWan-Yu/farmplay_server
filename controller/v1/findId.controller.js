var mysqlDB = require('../../mysql-db');

const request = require('request');

var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");
var Base64 = require("crypto-js/enc-base64");

module.exports.get = (req, res, next) => {
}

module.exports.post = (req, res, next) => {
  var results = {
    result:"",
    id : ""
}

  var user_phone = req.body.phone;
  var user_certifi_code = req.body.code;

  mysqlDB.query('select * from users where user_phone = "'+user_phone+'";', function (err, rows, fields) {
    if (!err) {
        var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
            'fields : ' + JSON.stringify(fields);
            if(JSON.stringify(rows)== "[]"){
                results.result = "empty"
                res.send(results);
            }else{
              results.result = "exist"
              results.id = rows[0].user_id
              res.send(results);
            }
            
    } else {
        console.log('query error : ' + err);
        res.send(err);
    }
});


}
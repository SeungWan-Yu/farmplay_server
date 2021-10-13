var mysqlDB = require('../../mysql-db');

const request = require('request');

var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");
var Base64 = require("crypto-js/enc-base64");

module.exports.get = (req, res, next) => {
}

module.exports.post = (req, res, next) => {

  var results = {
    result : ""
}

  var user_phone = req.body.phone;
  var user_certifi_code = req.body.code;

  mysqlDB.query('select * from certifi where phone = "'+user_phone+'";', function (err, rows, fields) {
    if (!err) {
        var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
            'fields : ' + JSON.stringify(fields);
            if(JSON.stringify(rows)== "[]"){
                results.result = "fail"
            }else{
                if(user_certifi_code == rows[0].code){
                    results.result = "success"
                }else{
                    results.result = "fail"
                }
            }
            // console.log(rows[0])
        console.log(results)
        res.send(results);
    } else {
        console.log('query error : ' + err);
        res.send(err);
    }
});
  
  console.log(user_certifi_code)

}
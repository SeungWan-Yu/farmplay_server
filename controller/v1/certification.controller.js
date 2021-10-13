var mysqlDB = require('../../mysql-db');

const request = require('request');

var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");
var Base64 = require("crypto-js/enc-base64");

module.exports.get = (req, res, next) => {
}

module.exports.post = (req, res, next) => {

  var results = {
    resultCode: ""
  }

  var randomNum = {};
  //0~9까지의 난수
  randomNum.random = function (n1, n2) {
    return parseInt(Math.random() * (n2 - n1 + 1)) + n1;
  };
  //인증번호를 뽑을 난수 입력 n 6이면 6자리
  randomNum.authNo = function (n) {
    var value = "";
    for (var i = 0; i < n; i++) {
      value += randomNum.random(0, 9);
    }
    return value;
  };
  var user_phone_number = req.body.phone;
  console.log(user_phone_number)
  var user_auth_number = randomNum.authNo(6);
  var resultCode = 200;
  const date = Date.now().toString();
  const uri = "ncp:sms:kr:264031561865:smarthive";
  const secretKey = "DRRXehpBeIgKRbuNrNI7ZpUIpV86GouK78m4eyHF";
  const accessKey = "kIszOkClGHtpPW2SGAQU";
  const method = "POST";
  const space = " ";
  const newLine = "\n";
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
  const url2 = `/sms/v2/services/${uri}/messages`;
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method); hmac.update(space);
  hmac.update(url2); hmac.update(newLine);
  hmac.update(date); hmac.update(newLine);
  hmac.update(accessKey);
  const hash = hmac.finalize();
  const signature = hash.toString(CryptoJS.enc.Base64);
  request(
    {
      method: method, json: true, uri: url, headers: {
        "Contenc-type": "application/json; charset=utf-8",
        "x-ncp-iam-access-key": accessKey,
        "x-ncp-apigw-timestamp": date,
        "x-ncp-apigw-signature-v2": signature,
      }, body: {
        type: "SMS",
        countryCode: "82",
        from: "07043544504",
        content: `[팜플] 인증번호 [${user_auth_number}]를 입력해주세요.`,
        messages: [{
          to: `${user_phone_number}`,
        },
        ],
      },
    }, function (err, res, html) {
      if (err) {
        resultCode = 404;
        console.log(err);
      }
      else {
        console.log(html);
      }
    }
  );

  mysqlDB.query('select * from certifi where phone = "' + user_phone_number + '";', function (err, rows, fields) {
    if (!err) {
      // console.log(JSON.stringify(rows));
      if (JSON.stringify(rows) == "[]") {
        mysqlDB.query('INSERT into certifi values ("' + user_phone_number + '","' + user_auth_number + '");', function (err, rows, fields) {
          if (!err) {
            console.log(JSON.stringify(rows));
          } else {
            console.log('query error : ' + err);
            res.send(err);
          }
        });
      } else {
        mysqlDB.query('update certifi set code = "' + user_auth_number + '" where phone = "' + user_phone_number + '";', function (err, rows, fields) {
          if (!err) {
            console.log(JSON.stringify(rows));
          } else {
            console.log('query error : ' + err);
            res.send(err);
          }
        });
      }
    } else {
      console.log('query error : ' + err);
        res.send(err);
    }

  });
  results.resultCode = resultCode
  res.send(results)
  console.log(resultCode)
  return resultCode;

}
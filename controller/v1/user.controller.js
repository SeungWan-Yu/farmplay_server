var mysqlDB = require('../../mysql-db');
const {userModel} = require("../../models/v1");
const { off } = require('../../mysql-db');


exports.getUserImgRating = async (req,res) => {
    console.log("여기옵니까");
    var body = req.body;
    var result;
    var farmstate = body.farmstate;
    try {
        if(farmstate=="1"){
            console.log("일반유저")
            result = await userModel.getUserImgRating(body);
        }else if(farmstate=="2"){
            console.log("농가유저")
            result = await userModel.getUserImgRatingFarm(body);
        }  
    } catch (error) {
        console.log(error);
        result = error;
    }
    console.log("결과")
    console.log(result)
    res.send(result);
};


exports.getLoginCheck = async (req,res) => {
    var body = req.body;
    //성공일 경우 리턴값이 없을경> "empty", 리턴값이 있을경우>"exist" 두가지 보내야함
    //empty는 서버통신할 필요없이 화면단에서 거르도록 바꿔야함
    var results = {
        result : "",
        farmcode : 0,
        farmstate : 0,
        username : "",
        password : ""
    };
    try {
        r1 = await userModel.getLoginCheck(body);
        if(r1!=undefined){
            results.farmcode = r1.farm_code;
            results.farmstate = r1.farm_state;
            results.username = r1.user_name;
            results.password = r1.user_pw;
            results.result = "exist";
        }else{
            results = {result :"empty"};
        }
    } catch (error) {
        console.log(error);
        results = error;
        results.result = "empty";
    }
    
    res.send(results);
};

exports.getIdCheck = async (req,res) => {
    var body = req.body;
    var results;
    try {
        results = await userModel.getIdCheck(body);
    } catch (error) {
        console.log(error);
        results = error;
    }

    res.send(results);
};


exports.addUser = async (req,res) => {
    var body = req.body;
    var results = {result :""};
    try {
        r1 = await userModel.addUser(body);
        results.result = "success";
    } catch (error) {
        console.log(error);
        results.result = "fail";
    }

    res.send(results);
};


exports.updateUser = async (req,res) => {
    var body = req.body;
    var results;
    try {
      results = await userModel.updateUser(body);
    } catch (error) {
        console.log(error);
        results = error;
    }
  
    res.send(results);
};
  
exports.updateUserPw = async (req,res) => {
    var body = req.body;
    var results = {result :""};
    try {
        r1 = await userModel.getIdCheck(body);
        if(r1.count==0){
            results.result ="empty";
        }else{
            r2 = await userModel.updateUserPw(body);
            results.result ="success";
        }
    } catch (error) {
        console.log(error);
        results.result ="fail";
    }

    res.send(results);
};
  
exports.getUserId = async (req,res) => {
    var body = req.body;
    var results = {result :""};
    try {
        r1 = await userModel.getUserId(body);
        if(r1!=undefined){
            results.result ="exist";
        }else{
            results.result ="empty";
        }
    } catch (error) {
        console.log(error);
        results.result ="fail";      //추후에러처리
    }
    res.send(results);
};
  
exports.getKaoUser = async (req,res) => {
    var body = req.body;
    var results;
    try {
        results = await userModel.getKaoUser(body);
    } catch (error) {
        console.log(error);
        results = error;
    }
    res.send(results);
};


exports.getCertificationCode = async (req,res) => {
    var body = req.body;
    var results = {result : ""};
    try {
        r1 = await userModel.getCertification(body);
        if(r1!=undefined){
            if(r1.code == body.code){
                results.result = "success"
            }else{
                results.result = "fail" 
            }
        }else{
            results.result = "fail"
        }
    } catch (error) {
        console.log(error);
        results = error;
    }
    res.send(results);
};

exports.getCertification = async (req,res) => {
    var body = req.body;
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
    var userPhone = body.phone;
    console.log(userPhone)
    var userAuthNum = randomNum.authNo(6);
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
          content: `[팜플] 인증번호 [${userAuthNum}]를 입력해주세요.`,
          messages: [{
            to: `${userPhone}`,
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
  
    var results = {
        resultCode: resultCode
    }
    var certifi = {phone:userPhone , code:userAuthNum};
    try {
        r1 = await userModel.getCertification(certifi);
        if(r1!=undefined){
            r2 = await userModel.updateCertification(certifi);
        }else{
            r3 = await userModel.addCertification(certifi);
        }
    } catch (error) {
        console.log(error);
        results.resultCode = 404;
    }
    res.send(results);

};





const {userModel} = require("../../models/v1");
var fileDel = require('../../custom_modules/fileDelete');
var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");
var Base64 = require("crypto-js/enc-base64");
var request  = require("request");
var axios  = require("axios");


exports.updateUserImg = async (req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    body.userId = body.userId.replace(/"/gi,"");
    body.userProfileImg = body.userProfileImg.replace(/"/gi,"");
    var userProfileImg = body.userProfileImg;
    console.log(body);
    body.userImg = req.file.filename;
    console.log(body.userId);
    console.log("바디체크합니다")
    try {
        results.data = await userModel.updateUserImg(body);
        results.data.userImg = req.file.filename;   //현재파일명 보내기
        if(results.data.changedRows==1){
            results.message="exist";
            if(userProfileImg!="empty"){
                fileDel("public/uploads/"+userProfileImg);    //성공하면 이전파일삭제
            }
        }else{
            fileDel(req.file.path);     //변경되지 않았다면 현재파일삭제
        }
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        fileDel(req.file.path);     //에러일경우 현재파일 삭제
        console.log(error);
    }
    console.log(results);
    res.send(results);
};


exports.getUserImgRating = async (req,res) => {
    console.log("여기옵니까");
    var body = req.body;
    var results = {result:"success" ,data:[] ,message:"empty"};
    var farmstate = body.farmstate;
    try {
        if(farmstate=="1" || farmstate=="3"){
            console.log("일반유저");
            results.data = await userModel.getUserImgRating(body);
        }else if(farmstate=="2" || farmstate=="4"){
            console.log("농가유저");
            results.data = await userModel.getUserImgRatingFarm(body);
        }
        if(results.data.length>0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }
    console.log("결과")
    console.log(results)
    res.send(results);
};

exports.getLoginCheck = async (req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    console.log("바디체크합니다")
    //성공일 경우 리턴값이 없을경> "empty", 리턴값이 있을경우>"exist" 두가지 보내야함
    //empty는 서버통신할 필요없이 화면단에서 거르도록 바꿔야함

    try {
        results.data = await userModel.getLoginCheck(body);
        if(results.data.length>0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }
    console.log("결과체크")
    console.log(results)
    res.send(results);
};


exports.getSingupInfo = async (req,res) => {
    var body = req.body;
    console.log("바디체크합니다")
    var results = {result:"success" ,data:[] ,message:"empty"};
    //성공일 경우 리턴값이 없을경> "empty", 리턴값이 있을경우>"exist" 두가지 보내야함
    //empty는 서버통신할 필요없이 화면단에서 거르도록 바꿔야함
    try {
        results.data = await userModel.getSingupInfo(body);
        if(results.data.length>0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }
    console.log("결과체크")
    console.log(results)
    res.send(results);
};



exports.getIdCheck = async (req,res) => {
    var body = req.body;
    var results = {result:"success" ,data:[] ,message:"empty"};
    try {
        results.data = await userModel.getIdCheck(body);
        if(results.data.length>0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }
    console.log(results);
    res.send(results);
};


exports.addUser = async (req,res) => {
    console.log("유저등록");
    var body = req.body;
    var results = {result:"success" ,data:[] ,message:"empty"};
    try {
        results.data = await userModel.addUser(body);
        if(results.data.affectedRows==1)results.message="exist";
    } catch (error) {
        console.log(error);
        results.result = "fail";
        results.message = error.message;
    }
    res.send(results);
};


exports.updateUser = async (req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    console.log(body.id.length);
    console.log("바디체크");
    console.log(body);
    try {
        results.data = await userModel.updateUser(body);
        if(results.data.changedRows==1)results.message="exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }
    console.log(results);
    res.send(results);
};
  
exports.updateUserPw = async (req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    var results = {result :""};
    try {
        r1 = await userModel.getIdCheck(body);
        if(r1[0].count>0){
            results.data = await userModel.updateUserPw(body);
            if(results.data.changedRows==1){
                results.message="exist";
            }else{
                results.message="notChage";
            }
        }
    } catch (error) {
        results.result ="fail";
        results.message = error.message;
        console.log(error);
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
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    console.log(body);  
    try {
        r1 = await userModel.getCertificationCode(body);
        //유저가 입력한 코드와 DB에 가져온 코드가 같을 경우 아이디를 리턴
        if(r1[0].code==body.code){
            console.log("같음");
            results.data = await userModel.getUserId(body);
            if(results.data.length>0){
                results.message = "exist"; 
            }else{
                console.log("여기엠티");
                results.message = "empty"; 
            }
        }else{  //그러지 않을 경우 different또는 empty 발송
            console.log("다름");
            results.message = "different";   
        }
    } catch (error) {
        console.log(error);
        results.result = "fail";
        results.message = error.message;     
    }

    console.log("최종데이터")
    console.log(results);
    res.send(results);
};

exports.getCertification = async (req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    var singupState  = body.singupState;
    console.log(singupState);

    try {
        r1 = await userModel.getPhoneCheck(body);
        console.log("연락처체크");
        console.log(r1[0].count);
        if(singupState=="singup"){
            console.log("여기");
            if(r1[0].count!=0){
                results.result = "fail";
                results.message = "연락처중복";
                res.send(results);
                return false;
            }
        }else{
            if(r1[0].count==0){
                results.result = "fail";
                results.message = "연락처없음";
                res.send(results);
                return false;
            }
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
        var data =  {
            type: "SMS",
            countryCode: "82",
            from: "07043544504",
            content: `[팜플] 인증번호 [${userAuthNum}]를 입력해주세요.`,
            messages: [{to: `${userPhone}`, },],
        };
        
        var response = await axios.post(url,data, {
            headers: {
                "Contenc-type": "application/json; charset=utf-8",
                "x-ncp-iam-access-key": accessKey,
                "x-ncp-apigw-timestamp": date,
                "x-ncp-apigw-signature-v2": signature,
            },
        });

        console.log("응답결과");
        console.log(response);
        // request(
        //   {
        //     method: method, json: true, uri: url, headers: {
        //       "Contenc-type": "application/json; charset=utf-8",
        //       "x-ncp-iam-access-key": accessKey,
        //       "x-ncp-apigw-timestamp": date,
        //       "x-ncp-apigw-signature-v2": signature,
        //     }, body: {
        //       type: "SMS",
        //       countryCode: "82",
        //       from: "07043544504",
        //       content: `[팜플] 인증번호 [${userAuthNum}]를 입력해주세요.`,
        //       messages: [{
        //         to: `${userPhone}`,
        //       },
        //       ],
        //     },
        //   }, function (err, res, html) {
        //     if (err) {
        //       results.result = "fail";
        //       results.message = err.message;     
        //       resultCode = 404;
        //       console.log(err);
        //     }
        //     else {
        //       console.log(html);
        //     }
        //   }
        // );
      
        var certifi = {phone:userPhone , code:userAuthNum};

        r1 = await userModel.getCertification(certifi);
        console.log(r1[0].count);
        if(r1[0].count>0){
            r2 = await userModel.updateCertification(certifi);
        }else{
            console.log("등록");
            r3 = await userModel.addCertification(certifi);
        }

    } catch (error) {
        console.log(error);
        resultCode = 400;
        results.result = "fail";
        results.message = error.message;     
        res.send(results);
    }

    results.data = [{"resultCode":resultCode}];
    console.log("최종체크");
    console.log(results);
    res.send(results);

};

exports.updateChkToken = async (req,res) => {
    var body = req.body;
    console.log("바디체크합니다")
    console.log(body);
    var results = {result:"success" ,data:[] ,message:"empty"};
    try {
        r1 = await userModel.getUserToken(body);
        var token = r1[0].userToken
        console.log(r1);
        console.log(r1[0].userToken);
        if(token != body.token){
            console.log("다름 업데이트시작")
            results.data = await userModel.updateUserToken(body);
            if(results.data.changedRows>0)results.message = "exist";
            console.log("체인지로우>>>"+results.data.changedRows);
        }else{
            results.message = "equals";
            console.log("같음 무시");
        }
        
        // if(results.data.length>0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }
    console.log("결과체크")
    console.log(results)
    res.send(results);
};




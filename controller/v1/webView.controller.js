
const {webViewModel} = require("../../models/v1");
var path = require('path');
var axios = require('axios');
var payModule = require("../../custom_modules/payModule");
const pool = require('../../configs/mysql2-db');


exports.getKakao = async (req,res) => {
    console.log("카카오");
    res.sendFile(path.join(__dirname+'/../../views/webView/kakao.html'));
};

exports.getImport = async (req,res) => {
    res.sendFile(path.join(__dirname+'/../../views/webView/import.html'));
};

exports.getToss = async (req,res) => {
    const connection = await pool.getConnection();
    console.log("겟토스시작");
    try {
        console.log(req.query);
        console.log(req.query.pay);
        console.log(req.query.price);
        console.log(req.query.oId);
        console.log(req.query.oName);
        console.log(req.query.uName);   
        console.log(req.query.uId);   
        var data;
        if(req.query.oId==undefined){
            res.redirect("/v1/webView/tossFail?result="+"null");
        }else{
            data = await webViewModel.addPayReq(req.query,connection);
            if(data.affectedRows!=1){
                res.redirect("/v1/webView/tossFail?result="+"try");
            }
            console.log(data);
        }
       
    } catch (error) {
        console.log(error);
    }finally{
        connection.release();
        res.sendFile(path.join(__dirname+'/../../views/webView/toss.html'));
    }
};



exports.getTossSuccess = async (req,res) => {
    const connection = await pool.getConnection();
    
    //인서트 영향 및 업데이트 변화 체크 함수 
    function returnAffect(data,type) {
        var result = true;
        var msg ="";
        if(type=="add"){
            if(data.affectedRows==0){
                msg = "notAffect";
                console.log("영향없음");
                console.log("/v1/webView/tossFail?result="+"dataBaseNot"+"&msg="+msg);
                res.redirect("/v1/webView/tossFail?result="+"dataBaseNot"+"&msg="+msg);  
                result =  false;   
            }
        }else if(type=="update"){
            if(data.affectedRows==0){
                msg = "notChange";
                console.log("변경없음");
                console.log("/v1/webView/tossFail?result="+"dataBaseNot"+"&msg="+msg);
                res.redirect("/v1/webView/tossFail?result="+"dataBaseNot"+"&msg="+msg); 
                result = false;     
            }
        }
        console.log("함수결과값");
        console.log(result);
        return result;
    }

    try {
        console.log("성공");
        var query = req.query;
        var orderId = query.orderId;
        var paymentKey = query.paymentKey;
        var amount = query.amount;
        query.state = "결제요청완료";
        var formData = {"orderId":orderId ,"amount":amount};
        var data1 = await webViewModel.getPayReq(query,connection); 
        var reqPirce = data1[0].payReqPrice;
        var uId = data1[0].payReqUid;
        query.uId = uId;
        var data2 = await webViewModel.updatePayReqAmount(query,connection); 
        if(!returnAffect(data2,"update"))return false;

        //금액 같을 경우
        if(amount==reqPirce){
            console.log("금액같을경우");
            
            //1. 결제승인 전에 참가인원 초과되었는지 한번더 체크하고 초과되지 않았다면 결재승인api 진행한다.
            

            //2. 결제승인 api호출
            query.state = "결제완료";
            var data3 = await webViewModel.updatePayReqState(query,connection); 
            if(!returnAffect(data3,"update"))return false;

            var data4 = await webViewModel.addPayApro(query,connection);
            if(!returnAffect(data4,"add")){
                return false;
            }else{
                var response = await payModule.payApprove(paymentKey,formData);
                if(response.result=="success"){
                    query.state = "결제완료";
                    console.log("체크하깅");
                    var data = await webViewModel.addPayApro(query,connection);
                    var data5 = await webViewModel.updatePayReqState(query,connection);
                    console.log("데이터4 결과값");
                    console.log(data4);
                    if(!returnAffect(data4,"add"))return false;
                    if(!returnAffect(data5,"update"))return false;
                    res.sendFile(path.join(__dirname+'/../../views/webView/tossSuccess.html'));
                }else{
                    console.log("에러");
                    var dataCode = response.data.response.data.code;
                    var dataMsg = response.data.response.data.message;
                    res.redirect("/v1/webView/tossFail?result="+"approvalApi"+"&msg="+dataMsg+"&code="+dataCode);
                }
            }
            

        
        // 금액다를경우 
        }else{
            console.log("금액다름 마감");
            query.state = "결제취소(금액다름)";
            var data6 = await webViewModel.updatePayReqState(query,connection);
            if(!returnAffect(data5,"update"))return false;
            res.redirect("/v1/webView/tossFail?result="+"differAmount");
        }
    } catch (error) {
        console.log("DB에러출력");
        var m1 = error.message;
        var m2 = m1.replace("#","");
        var m3 = m2.replace("{","");
        var msg = m3.replace("}","");
        query.errMsg = m1;
        console.log(msg);
        console.log(error);
        //결제완료 후 승인등록시 DB에러일 경우
        if(error.chk=="addPayApro"){
            console.log("결제완료 후 db입력실패");
            query.state = "DB에러(결재완료)";
            var data7 = await webViewModel.updatePayReqState(query,connection);
            //db 상태 변경 (payReqState)
            res.redirect("/v1/webView/tossFail?result="+"dataBaseApro"+"&msg="+msg);
        }else{
            console.log("일반 디비에러");
            //db 상태 변경 (payReqState) 에러메세지까지 저장할까??
            query.state = "DB에러(일반)";
            var data8 = await webViewModel.updatePayReqState(query,connection);
            res.redirect("/v1/webView/tossFail?result="+"dataBase"+"&msg="+msg);
        }     
    }finally{
        console.log("파이널리실행");
        connection.release();
    }
  
};



exports.getTossFail = async (req,res) => {
    console.log("실패");
    res.sendFile(path.join(__dirname+'/../../views/webView/tossFail.html'));
};






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


exports.getTossComplete = async (req,res) => {
    console.log("결제완료");
    console.log(req.query);
    res.sendFile(path.join(__dirname+'/../../views/webView/tossSuccess.html'));
};

exports.getToss = async (req,res) => {
    const connection = await pool.getConnection();
    console.log("겟토스시작");
    try {
        var query = req.query;
        if(query.oId==undefined){
            console.log("에러체크");
            res.redirect("/v1/webView/tossFail?result="+"null");
        }else{
            var data = await webViewModel.addPayReq(query,connection);
            if(data.affectedRows!=1){
                res.redirect("/v1/webView/tossFail?result="+"try");
            }else{
                res.sendFile(path.join(__dirname+'/../../views/webView/toss.html'));
            }
            console.log(data);
        }
    } catch (error) {
        console.log(error);
        var msg = error.message;
        res.redirect("/v1/webView/tossFail?result="+"dataBase"+"&msg="+msg);
    }finally{
        console.log("파이널리");
        connection.release(); 
    }
};


exports.getTossSuccess = async (req,res) => {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
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
        var data1 = await webViewModel.getPayReq(query,connection);     //요청정보 가져오기
        var reqPirce = data1[0].payReqPrice;
        var uId = data1[0].payReqUid;
        query.uId = uId;
        var data2 = await webViewModel.updatePayReqAmount(query,connection);    //승인가격 업데이트
        if(!returnAffect(data2,"update"))return false;

        //금액 같을 경우
        if(amount==reqPirce){
            console.log("금액같을경우");
            
            //1. 결제승인 전에 참가인원 초과되었는지 한번더 체크하고 초과되지 않았다면 결재승인api 진행한다.
            

            //2. 결제승인 api호출
            query.state = "결제완료";
            var data3 = await webViewModel.updatePayReqState(query,connection);     //결제상태 업데이트
            if(!returnAffect(data3,"update"))return false;

            var data4 = await webViewModel.addPayApro(query,connection);            //결제승인정보 등록
            console.log("입력체크");
            console.log(data4);
            if(!returnAffect(data4,"add")){
                return false;
            }else{
                var response = await payModule.payApprove(paymentKey,formData);
                if(response.result=="success"){
                    console.log("결재완료");
                    await connection.commit();
                    res.redirect("/v1/webView/tossComplete?orderId="+orderId+"&amount="+amount);
                    //res.sendFile(path.join(__dirname+'/../../views/webView/tossSuccess.html'));
                }else{
                    console.log("에러롤백");
                    var dataCode = response.data.response.data.code;
                    var dataMsg = response.data.response.data.message;
                    await connection.rollback();
                    res.redirect("/v1/webView/tossFail?result="+"approvalApi"+"&msg="+dataMsg+"&code="+dataCode);
                }
            }
 
        // 금액다를경우 
        }else{
            console.log("금액다름 마감");
            query.state = "결제취소(금액다름)";
            var data5 = await webViewModel.updatePayReqState(query,connection);
            if(!returnAffect(data5,"update"))return false;
            await connection.commit();
            res.redirect("/v1/webView/tossFail?result="+"differAmount");
        }
    } catch (error) {
        await connection.rollback();
        console.log("DB에러출력");
        var m1 = error.message;
        var m2 = m1.replace("#","");
        var m3 = m2.replace("{","");
        var msg = m3.replace("}","");
        query.errMsg = m1;
        query.state = "DB에러";
        console.log(msg);
        console.log(error);

        var data7 = await webViewModel.updatePayReqState(query,connection);
        await connection.commit();
        res.redirect("/v1/webView/tossFail?result="+"dataBase"+"&msg="+msg);

    }finally{
        console.log("파이널리실행");
        connection.release();
    }
  
};



exports.getTossFail = async (req,res) => {
    console.log("실패");
    res.sendFile(path.join(__dirname+'/../../views/webView/tossFail.html'));
};





const {farmplerModel} = require("../../models/v1");
const { RIPEMD160 } = require('crypto-js');
const pool = require('../../configs/mysql2-db');



exports.getEnterRecruitCodeUserId = async (req,res) => {
    const con = await pool.getConnection();
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    console.log("바디체크");
    console.log(body);
    try {
        results.data = await farmplerModel.getEnterRecruitCodeUserId(con,body);
        if(results.data.length>0){
            results.message="exist";
        }
      
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error)
    }finally{
        con.release();
        console.log("결과값");
        console.log(results);
        res.send(results); 
    }
};


exports.removeFarmpler = async (req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    try {
        results.data = await farmplerModel.removeFarmpler(body);
        results.message="exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error)
    }
    console.log("결과값");
    console.log(results);
    res.send(results); 
};

exports.getFarmplerList = async (req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    try {
        results.data = await farmplerModel.getFarmplerList(body);
        if(results.data.length>0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error)
    }
    console.log("결과값");
    console.log(results);
    res.send(results); 
};

exports.updateEnterState = async (req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    var enterState  = body.enterState
    try {
        if(enterState=="참가취소됨"){
            results.data = await farmplerModel.updateEnterCancel(body);
            if(results.data.changedRows==1)results.message="exist";
        }else if(enterState=="참가수정요청"){
            results.data = await farmplerModel.updateEnterEdit(body);
            if(results.data.changedRows==1)results.message="exist";
        }
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }
    console.log(results);
    res.send(results); 
};


exports.updateEnterConfirmCancel = async (req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    var enterState  = body.enterState;
    var confirmState  = body.confirmState;
    
    if(confirmState=="참가확정됨"){
        body.enterEditReson = "";
    }else if(confirmState=="참가취소됨"){
        body.enterEditReson = "농가취소";
    };

    if(enterState=="참가신청중"){
        body.enterStart  = "";
        body.enterEnd  = "";
    };

    console.log(body);
    try {
        if(enterState=="참가신청중" || enterState=="참가확정됨"){
            results.data = await farmplerModel.updateEnterConfirmCancelReq(body);
            if(results.data.changedRows==1)results.message="exist";
        }else if(enterState=="참가수정요청"){
            results.data = await farmplerModel.updateEnterConfirmCancelEdit(body);
            if(results.data.changedRows==1)results.message="exist";
        }   
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }
    console.log(results);
    res.send(results); 
};


exports.addFarmpler = async (req,res) => {
    var body = req.body;
    var results = {result:"success" ,data:[] ,message:"empty"};
    try {
        results.data = await farmplerModel.addFarmpler(body);
        if(results.data.affectedRows==1)results.message="exist";
    } catch (error) {
        console.log(error);
        results.result = "fail";
        results.message = error.message;
    }
    res.send(results); 
};


exports.getFarmplerId = async (req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    try {
        results.data = await farmplerModel.getFarmplerId(body);
    } catch (error) {
        console.log(error);
        results.result = "fail";
        results.message = error.message;
    }
    res.send(results); 
};


exports.getFarmpler = async (req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    try {
        results.data = await farmplerModel.getFarmpler(body);
        if(results.data.length>0)results.message = "exist";
    } catch (error) {
        console.log(error);
        results.result = "fail";
        results.message = error.message;
    }
    console.log(results);
    res.send(results);  
};
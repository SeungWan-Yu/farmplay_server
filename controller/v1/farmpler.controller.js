var mysqlDB = require('../../mysql-db');
const {farmplerModel} = require("../../models/v1");
const { RIPEMD160 } = require('crypto-js');


exports.getFarmplerList = async (req,res) => {
    var body = req.body;
    var result;
    try {
        result = await farmplerModel.getFarmplerList(body);
    } catch (error) {
        console.log(error);
        result = error;
    }
    console.log(result);
    res.send(result); 
};

exports.updateEnterState = async (req,res) => {
    var body = req.body;
    var result;
    var enterState  = body.enterState
    try {
        if(enterState=="참가취소됨"){
            result = await farmplerModel.updateEnterCancel(body);
        }else if(enterState=="참가수정요청"){
            result = await farmplerModel.updateEnterEdit(body);
        }
    } catch (error) {
        console.log(error);
        result = error;
    }
    res.send(result); 
};


exports.updateEnterConfirmCancel = async (req,res) => {
    var body = req.body;
    var result;
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
            result = await farmplerModel.updateEnterConfirmCancelReq(body);
        }else if(enterState=="참가수정요청"){
            result = await farmplerModel.updateEnterConfirmCancelEdit(body);
        }   
    } catch (error) {
        console.log(error);
        result = error;
    }
    res.send(result); 
};


exports.addFarmpler = async (req,res) => {
    var body = req.body;
    var results = {result : ""};
    try {
        var r1 = await farmplerModel.addFarmpler(body);
        results.result = "success";
    } catch (error) {
        console.log(error);
        results.result = "fail";
    }
    res.send(result); 
};


exports.getFarmplerId = async (req,res) => {
    var body = req.body;
    var result;
    try {
        result = await farmplerModel.getFarmplerId(body);
    } catch (error) {
        console.log(error);
        result = error;
    }
    res.send(result); 
};


exports.getFarmpler = async (req,res) => {
    var body = req.body;
    var result;
    try {
        result = await farmplerModel.getFarmpler(body);
    } catch (error) {
        console.log(error);
        result = error;
    }
    res.send(result);  
};
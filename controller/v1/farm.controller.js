var mysqlDB = require('../../mysql-db');
const {farmModel} = require("../../models/v1");
const ErrorJson = require("../../custom_modules/errorJson");
var errorJson = new ErrorJson();

exports.getRoomImgListFarmCode = async(req,res) => {
    var body = req.body;
    var farmRoomImg = errorJson.farmRoomImg();
    var result;
    try {
        result = await farmModel.getRoomImgListFarmCode(body);
    } catch (error) {
        console.log(error);
        var list = [];
        list.push(farmRoomImg);
        result = list;
    }
    console.log(result);
    res.send(result); 
};


exports.getFarmUser = async(req,res) => {
    var body = req.body;
    var result;
    try {
        result = await farmModel.getFarmUser(body);
    } catch (error) {
        console.log(error);
        result = error;
    }
    res.send(result); 
};

exports.getFarm = async(req,res) => {
    var body = req.body;
    var result;
    try {
        result = await farmModel.getFarm(body);
    } catch (error) {
        console.log(error);
        result = error;
    }
    res.send(result); 
};

exports.getFarmCheck = async(req,res) => {
    var body = req.body;
    var result;
    try {
        result = await farmModel.getFarmCheck(body);
    } catch (error) {
        console.log(error);
        result = error;
    }
    res.send(result); 
};

exports.getFarmList = async(req,res) => {
    var body = req.body;
    var result;
    try {
        result = await farmModel.getFarmList();
    } catch (error) {
        console.log(error);
        result = error;
    }
    res.send(result); 
};


exports.addFarm = async(req,res) => {
    var body = req.body;
    var results = {result : "", farmcode : 0};
    try {
        rows = await farmModel.addFarm(body);
        results.result = "success"
        results.farmcode = rows.insertId
    } catch (error) {
        console.log(error);
        results.result = error;
    }
    res.send(results); 
};


exports.updateFarm = async(req,res) => {
    var body = req.body;
    var results = {result : ""};
    try {
        r1 = await farmModel.updateFarm(body);
        results.result = "success";
    } catch (error) {
        console.log(error);
        results.result = "fail";
    }
    res.send(results); 
};

exports.getEnterList = async(req,res) => {
    var body = req.body;
    var result;
    console.log(body);
    try {
        result = await farmModel.getEnterList(body);
    } catch (error) {
        console.log(error);
        result = error;
    }
    res.send(result); 
};

exports.getRecruitList = async(req,res) => {
    var body = req.body;
    var result;
    try {
        result = await farmModel.getRecruitList(body);
    } catch (error) {
        console.log(error);
        result = error;
    }
    res.send(result); 
};


//테스트용도 지워도댐
exports.multiTest = async(req,res,next) => {
    console.log("--------------------데이터 체크");
    var params = req.params
    var body = req.body
    var query = req.query
    console.log(params)
    console.log(body)
    console.log(query)
    console.log("폼체크1");
    var multiparty = require('multiparty');
    console.log("폼체크2");
    var results = {
        result : ""
    }
    res.send(results);
   
};



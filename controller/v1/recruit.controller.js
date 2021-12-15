var mysqlDB = require('../../mysql-db');
const {recruitModel} = require("../../models/v1");
const {Recruit} = require("../../dto/v1");



exports.getRecruit = async (req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    try {
        results.data = await recruitModel.getRecruit(body);
        if(results.data.length>0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }
    res.send(results);  
};


exports.getRecruitListFarmcode = async (req,res) => {
    var body = req.body;
    var result;
    try {
        result = await recruitModel.getRecruitListFarmcode(body);
    } catch (error) {
        console.log(error);
        result = error;
    }
    res.send(result);  
};


exports.getRecuritListId = async (req,res) => {
    var body = req.body;
    var result;
    try {
        result = await recruitModel.getRecuritListId(body);
    } catch (error) {
        console.log(error);
        result = error;
    }
    res.send(result);  
};


exports.addRecruit = async(req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    try {
        results.data = await recruitModel.addRecruit(body);
        if(results.data.affectedRows!=0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }
    console.log(results);
    res.send(results); 
};

exports.updateReruit = async (req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    try {
        results.data = await recruitModel.updateReruit(body);
        if(results.data.changedRows!=0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);;
    }
    console.log(results);
    res.send(results);  
};


exports.updateReruitState = async (req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    console.log(body);
    try {
        results.data = await recruitModel.updateReruitState(body);
        if(results.data.changedRows!=0)results.message = "exist";

    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);;
    }
    console.log(results);
    res.send(results); 
};
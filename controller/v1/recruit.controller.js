var mysqlDB = require('../../mysql-db');
const {recruitModel} = require("../../models/v1");
const {Recruit} = require("../../dto/v1");



exports.getRecruit = async (req,res) => {
    var body = req.body;
    var result;
    try {
        result = await recruitModel.getRecruit(body);
    } catch (error) {
        console.log(error);
        result = error;
    }
    res.send(result);  
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
    var body = req.body;
    var results = {result : ""};
    try {
        r1 = await recruitModel.addRecruit(body);
        results.result = "success";
    } catch (error) {
        console.log(error);
        results.result = "fail";
    }
    console.log(results);
    res.send(results); 
};

exports.updateReruit = async (req,res) => {
    var body = req.body;
    var results = {result : ""};
    try {
        r1 = await recruitModel.updateReruit(body);
        results.result = "success";
    } catch (error) {
        console.log(error);
        results.result = "fail";
    }
    console.log(results);
    res.send(results);  
};


exports.updateReruitState = async (req,res) => {
    var body = req.body;
    var results = {result : ""};
    console.log(body);
    try {
        r1 = await recruitModel.updateReruitState(body);
        results.result = "success";
    } catch (error) {
        console.log(error);
        results.result = "fail";
    }
    console.log(results);
    res.send(results); 
};
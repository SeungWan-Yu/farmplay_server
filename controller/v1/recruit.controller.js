const {recruitModel} = require("../../models/v1");
const {reviewModel} = require("../../models/v1");
const {farmModel} = require("../../models/v1");

exports.getRecruitReviewRoomImg = async (req,res) => {
    var results = {result:"success" ,dataRecruit:[] ,dataReview:[] ,dataRoomImg:[]  ,message:"empty"};
    var body = req.body;
    try {
        var promiseList = [recruitModel.getRecruitListFarmcode(body),reviewModel.getFarmReviewList(body),farmModel.getRoomImgListFarmCode(body)];
        var promiseRes =await Promise.all(promiseList);
        results.message = "exist";
        console.log("결과값");
        results.dataRecruit = promiseRes[0];
        results.dataReview = promiseRes[1];
        results.dataRoomImg = promiseRes[2];

    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }
    console.log("마지막확인");
    console.log(results);
    res.send(results);  
};



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
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    try {
        results.data =  await recruitModel.getRecruitListFarmcode(body);
        if(results.data.length>0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }
    res.send(results);  
};


exports.getRecruitListId = async (req,res) => {
    var body = req.body;
    var result;
    try {
        result = await recruitModel.getRecruitListId(body);
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
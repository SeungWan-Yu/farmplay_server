
const {reviewModel} = require("../../models/v1");


exports.addReview = async (req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    var reviewStandard  = body.reviewStandard;
    try {
        if(reviewStandard=="농장"){
            results.data = await reviewModel.addReviewFarm(body);
            results.message = "exist";
        }else if(reviewStandard=="팜플러"){
            results.data = await reviewModel.addReviewFarmpler(body);
            results.message = "exist";
        }
    } catch (error) {
        if(error.message!="affectedRows"){
            results.result = "fail"
            results.message = error.message;
            console.log(error);
        }
    }
    res.send(results);  
};

exports.getReview = async (req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    try {
        results.data = await reviewModel.getReview(body);
        if(results.data.length>0)results.message = "exist";
    } catch (error) {
        results.result = "fail"
        results.message = error.message;
        console.log(error);
    }
    res.send(results);  
};





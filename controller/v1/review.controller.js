
const {reviewModel} = require("../../models/v1");


exports.addReview = async (req,res) => {
    var results = {result : ""};
    var body = req.body;
    var reviewStandard  = body.reviewStandard;
    try {
        if(reviewStandard=="농장"){
            var r1 = await reviewModel.addReviewFarm(body);
        }else if(reviewStandard=="팜플러"){
            var r2 = await reviewModel.addReviewFarmpler(body);
        }
        results.result = "success";
    } catch (error) {
        console.log(error);
        results.result = "fail";
    }
    res.send(results);  
};

exports.getReview = async (req,res) => {
    var result;
    var body = req.body;
    try {
        result = await reviewModel.getReview(body);
    } catch (error) {
        console.log(error);
        result = error;
    }
    res.send(result);  
};

exports.getReviewRating = async (req,res) => {
    var result;
    var params = req.query;
    try {
        result = await reviewModel.getReviewRating(params);
    } catch (error) {
        console.log(error);
        result = error;
    }
    res.send(result);  
};



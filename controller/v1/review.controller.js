
const reviewModel = require("../../models/v1/reviewModel");

exports.addReview = function (req, res) {
    console.log("에드리뷰컨트롤러");
    var review = req.body
    console.log("받아온 리퀘스트값>>>");

    console.log(review);
    var results = {
        result : ""
    }
    reviewModel.addReview(review).then(function(data){
        results.result = "success"
        res.send(results);
    }).catch(function(err){
        console.log("캐치에러");
        console.log(err);
        results.result = "fail"
        res.json(results);
    });

}


exports.getReview = function (req, res) {
    console.log("겟리뷰컨트롤러");
    var query = req.query
    console.log("받아온 리퀘스트값>>>");
   
    console.log(query.recuritCode,query.enterUserId,query.reviewStandard);

    reviewModel.getReview(query).then(function(data){
        console.log("성공");
        console.log(data);
        res.send(data);
    }).catch(function(err){
        console.log("캐치에러");
        console.log(err);
    });

}


exports.getReviewRating = function (req, res) {
    console.log("겟리뷰컨트롤러 확인");
    var query = req.query
    reviewModel.getReviewRating(query).then(function(data){
        console.log("성공여기여기");
        console.log(data);
        res.send(data);
    }).catch(function(err){
        console.log("캐치에러");
        console.log(err);
    });

}
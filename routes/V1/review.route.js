var express = require('express');
var router = express.Router();
const { reviewController } = require('../../controller/v1');


router.post('/addReview', reviewController.addReview);

router.post('/getReview', reviewController.getReview);

router.post('/getReviewRating', reviewController.getReviewRating);


module.exports = router;

var express = require('express');
var router = express.Router();

const controller = require('../../controller/v1/review.controller')

router.route('/addReview')
.post(controller.addReview)

router.route('/getReview')
.post(controller.getReview)

router.route('/getReviewRating')
.post(controller.getReviewRating)

module.exports = router;

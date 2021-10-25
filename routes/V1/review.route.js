var express = require('express');
var router = express.Router();

const controller = require('../../controller/v1/review.controller')

router.route('/userReview')
.post(controller.userReviewInsert)

module.exports = router;

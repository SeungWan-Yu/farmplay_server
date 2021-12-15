var express = require('express');
var router = express.Router();
const { reviewController } = require('../../controller/v1');


//#addReview
router.post('/addReview', reviewController.addReview);

//#getReview
router.post('/getReview', reviewController.getReview);


module.exports = router;

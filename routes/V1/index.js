var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  return res.json({Message: 'v1'});
});

router.use('/user', require('./user.route'));
router.use('/fcm', require('./fcm.route'));
// router.use('/fileupload', require('./fileupload.route'));
router.use('/tourinfo', require('./tour.route'));
router.use('/image', require('./image.route'));
router.use('/farm', require('./farm.route'));
router.use('/recruit', require('./recruit.route'));
router.use('/farmpler', require('./farmpler.route'));
router.use('/review', require('./review.route'));
router.use('/webView', require('./webView.route'));



module.exports = router;
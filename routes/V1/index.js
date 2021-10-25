var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  return res.json({Message: 'v1'})
});

router.use('/user', require('./user.route'))

router.use('/beebox', require('./beebox.route'))

router.use('/chart', require('./chart.route'))

router.use('/post', require('./post.route'))

router.use('/fcm', require('./fcm.route'))

router.use('/thdata', require('./thdata.route'))

router.use('/signup', require('./signup.route'))

router.use('/fileupload', require('./fileupload.route'))

router.use('/cummu', require('./cummu.route'))

router.use('/comment', require('./comment.route'))

router.use('/db', require('./db.route'))

router.use('/addview', require('./addview.route'))

router.use('/getcomment', require('./getcomment.route'))

router.use('/door', require('./door.route'))

router.use('/arduinogetdoor', require('./arduinogetdoor.route'))

router.use('/marker', require('./marker.route'))

router.use('/tourinfo', require('./tourinfo.route'))

router.use('/tem', require('./tem.route'))

router.use('/image', require('./image.route'))

router.use('/farm', require('./farm.route'))

router.use('/certification', require('./certification.route'))

router.use('/certificationcode', require('./certificationcode.route'))

router.use('/changepw', require('./changepw.route'))

router.use('/detailfarm', require('./detailfarm.route'))

router.use('/deletebeebox', require('./deletebeebox.route'))

router.use('/password', require('./password.route'))

router.use('/data', require('./data.route'))

router.use('/findId', require('./findId.route'))

router.use('/recruit', require('./recruit.route'))

router.use('/farmpler', require('./farmpler.route'))

router.use('/kakaouser', require('./kakaouser.route'))

router.use('/review', require('./review.route'))

module.exports = router;
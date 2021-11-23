var express = require('express');
var router = express.Router();
const { userController } = require('../../controller/v1');



//login과  /id/ifo와 같음 나중에 하나 삭제할것

//#Login
router.post('/login', userController.getLoginCheck);

//#postId
router.post('/id', userController.getIdCheck);

//#getUserInfo
router.post('/id/info', userController.getLoginCheck);

//#get_profile_img
router.post('/getUserImgRating', userController.getUserImgRating);

//#signup
router.post('/signup', userController.addUser);

//#userinfoupdate
router.post('/update', userController.updateUser);

//#changepw
router.post('/changePw', userController.updateUserPw);

//#findId
router.post('/findId', userController.getUserId);

//#getKakaoUserInfo
router.post('/kakaouser', userController.getKaoUser);

//#postcerti
router.post('/certification', userController.getCertification);

//#postcerticode
router.post('/certificationcode', userController.getCertificationCode);



module.exports = router;

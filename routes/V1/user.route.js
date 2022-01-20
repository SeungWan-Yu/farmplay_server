var express = require('express');
var router = express.Router();
var upload = require('../../custom_modules/fileUpload');
const { userController } = require('../../controller/v1');


//login과  /id/ifo와 같음 나중에 하나 삭제할것

//#img
router.post('/profile_img',upload.single('profileImgFile'), userController.updateUserImg);

//#getLoginCheck
router.post('/login', userController.getLoginCheck);

//#getIdCheck
router.post('/id', userController.getIdCheck);

//#getSingupInfo
router.post('/singupInfo', userController.getSingupInfo);

//#getUserInfo
router.post('/id/info', userController.getLoginCheck);

//#getUserImgRating
router.post('/getUserImgRating', userController.getUserImgRating);

//#signup
router.post('/signup', userController.addUser);

//#updateUser
router.post('/update', userController.updateUser);

//#changepw
router.post('/updateUserPw', userController.updateUserPw);

//#findId           <-- 사용안함
router.post('/findId', userController.getUserId);

//#getKakaoUserInfo
router.post('/kakaouser', userController.getKaoUser);

//#getCertification
router.post('/certification', userController.getCertification);

//#getCertificationCode
router.post('/certificationcode', userController.getCertificationCode);


//#updateChkToken
router.post('/updateChkToken', userController.updateChkToken);




module.exports = router;

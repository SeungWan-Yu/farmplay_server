const express = require('express');
const router = express.Router();
var upload = require('../../custom_modules/fileUpload');
const { appController } = require('../../controller/web') ;



router.get('/banner', appController.banner); 
router.post('/banner',upload("배너").array("bannerImgFile"),appController.bannerUpdate); 
router.post('/bannerImgOrganize', appController.bannerImgOrganize); 

module.exports = router; // 이렇게 내보내면 부모 router 에 자동으로 연결됩니다.
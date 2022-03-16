var express = require('express');
var router = express.Router();
var upload = require('../../custom_modules/fileUpload');
const { farmController } = require('../../controller/v1');


//배너리스트 가져오는 api
router.post('/banner', farmController.getBannerList);


//#getFarmList
router.post('/', farmController.getFarmList);

//#addFarm
router.post('/add',upload("업로드").fields([{name:'farmImgFile'},{name:'roomImgFile'}]),farmController.addFarm);

//#updateFarm
router.post('/update',upload("업로드").fields([{name:'farmImgFile'},{name:'roomImgFile'}]), farmController.updateFarm);

//#getFarmRecruitEnterList
router.post('/recruitFampler', farmController.getFarmRecruitEnterList);

//#getFarmRecruitList
router.post('/recruit', farmController.getFarmRecruitList);

//#getFarmRoom
router.post('/name', farmController.getFarmRoom);

//#getFarmCheck
router.post('/state', farmController.getFarmCheck);

//#postFarmuser
router.post('/user', farmController.getFarmUser);

//#farmroomImages
router.post('/roomImges', farmController.getRoomImgListFarmCode);


module.exports = router;

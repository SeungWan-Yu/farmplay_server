var express = require('express');
var router = express.Router();
const { farmController } = require('../../controller/v1');


//#getFarm
router.get('/', farmController.getFarmList);

//#postFarm
router.post('/', farmController.addFarm);

//#postUpdateFarm
router.post('/update', farmController.updateFarm);

//#getFarmRecruitFarmpler
router.post('/recruitFampler', farmController.getEnterList);

//#getFarmRecruit
router.post('/recruit', farmController.getRecruitList);

//#postFarmname
router.post('/name', farmController.getFarm);

//#getFarmstate
router.post('/state', farmController.getFarmCheck);

//#postFarmuser
router.post('/user', farmController.getFarmUser);

//#farmroomImages
router.post('/roomImges', farmController.getRoomImgListFarmCode);

router.post('/multiTest',farmController.multiTest);     //<<<<테스트용도

module.exports = router;

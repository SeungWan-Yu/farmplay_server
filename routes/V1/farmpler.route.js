var express = require('express');
var router = express.Router();
const { farmplerController } = require('../../controller/v1');


//#postFarmplerCode
router.post('/', farmplerController.getFarmplerList);

//#changeEnterState
router.post('/enterState', farmplerController.updateEnterState);

//#changeEditConfirm
router.post('/editConfirm', farmplerController.updateEnterConfirmCancel);

//#postRecruitFarmpler
router.post('/recruit', farmplerController.addFarmpler);

//#postFarmplername            <--이거 안쓰는거 같음
router.post('/id', farmplerController.getFarmplerId);

//#postEntercode         
router.post('/entercode', farmplerController.getFarmpler);       




module.exports = router;

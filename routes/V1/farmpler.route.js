var express = require('express');
var router = express.Router();
const { farmplerController } = require('../../controller/v1');


//#getFarmplerList
router.post('/', farmplerController.getFarmplerList);

//#updateEnterState
router.post('/enterState', farmplerController.updateEnterState);

//#updateEnterConfirmCancel
router.post('/editConfirm', farmplerController.updateEnterConfirmCancel);

//#addFarmpler
router.post('/recruit', farmplerController.addFarmpler);

//#postFarmplername            <--이거 안쓰는거 같음
router.post('/id', farmplerController.getFarmplerId);

//#getFarmpler         
router.post('/entercode', farmplerController.getFarmpler);       

//#getFarmpler         
router.post('/remove', farmplerController.removeFarmpler);       


//#getFarmpler         
router.post('/recruitCodeUserId', farmplerController.getEnterRecruitCodeUserId);       


module.exports = router;

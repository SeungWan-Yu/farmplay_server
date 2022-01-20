const express = require('express');
const router = express.Router();
var upload = require('../../custom_modules/fileUpload');
const { farmController } = require('../../controller/web');


/*************************** 이미지 업로드 끝************************/ 

router.get('/farmList', farmController.farmList);
router.post('/farmRoomImgList', farmController.farmRoomImgList);
router.post('/farmRoomImgDel', farmController.farmRoomImgDel);
router.post('/farmRoomImgInsert', upload.array('file'),farmController.farmRoomImgInsert);
router.get('/farmDel', farmController.farmDel); 
router.get('/farmEdit', farmController.farmEdit);
router.post('/editFarm',upload.fields([{name:'farmImgFile'},{name:'roomImgFile'}]),farmController.editFarm);
router.get('/farmAskList', farmController.farmAskList);
router.post('/farmConfirm', farmController.farmConfirm);

module.exports = router // 이렇게 내보내면 부모 router 에 자동으로 연결됩니다.
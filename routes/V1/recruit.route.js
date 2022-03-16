var express = require('express');
var router = express.Router();
const { recruitController } = require('../../controller/v1');


//#addRecruit
router.post('/', recruitController.addRecruit);

//#updateReruit
router.post('/edit', recruitController.updateReruit);

//#updateReruitState
router.post('/end', recruitController.updateReruitState);

//#getRecruit
router.post('/code', recruitController.getRecruit);

//#getRecruitReviewRoomImg
router.post('/reviewRoomImg', recruitController.getRecruitReviewRoomImg);



//#postRecruitname                 <-- 사용안하는거 같음
router.post('/name', recruitController.getRecruitListId);

//#postRecruitcodeall              
router.post('/code/all', recruitController.getRecruitListFarmcode);




module.exports = router;

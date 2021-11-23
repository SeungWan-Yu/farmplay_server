var express = require('express');
var router = express.Router();
const { recruitController } = require('../../controller/v1');


//#postRecruit
router.post('/', recruitController.addRecruit);

//#changeRecruit
router.post('/edit', recruitController.updateReruit);

//#endRecruit
router.post('/end', recruitController.updateReruitState);

//#postRecruitcode
router.post('/code', recruitController.getRecruit);

//#postRecruitname                 <-- 사용안하는거 같음
router.post('/name', recruitController.getRecuritListId);

//#postRecruitcodeall               <-- 사용안하는거 같음
router.post('/code/all', recruitController.getRecruitListFarmcode);




module.exports = router;

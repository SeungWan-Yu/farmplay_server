const express = require('express')
const router = express.Router()
const { tourController } = require('../../controller/web') 
// Route 는 오직 Controller 에만 의존 합니다.

router.get('/tourList', tourController.tourList);
router.post('/tourApiGet', tourController.tourApiGet);
router.post('/tourApiTest', tourController.tourApiTest);
router.post('/tourApiDetailGet', tourController.tourApiDetailGet);
router.post('/tourApiGetFood', tourController.tourApiGetFood);
router.post('/tourApiDelFood', tourController.tourApiDelFood);
router.post('/tourApiGetLodgment', tourController.tourApiGetLodgment);
router.get('/restaurant', tourController.getRestaurant);
router.post('/restaurantCrawl', tourController.getRestaurantCrawl);

module.exports = router // 이렇게 내보내면 부모 router 에 자동으로 연결됩니다.
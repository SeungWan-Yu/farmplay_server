var express = require('express');
var router = express.Router();
const { tourController } = require('../../controller/v1');

router.post('/food',tourController.getFoodList);
router.get('/lodgment',tourController.getLodgmentList);
router.get('/attractions',tourController.getAttractionsList);
router.get('/culture',tourController.getCultureList);
router.get('/shopping',tourController.getShoppingList);
router.post('/tour',tourController.getTour);
router.post('/tourDetail',tourController.getTourDetail);

module.exports = router;

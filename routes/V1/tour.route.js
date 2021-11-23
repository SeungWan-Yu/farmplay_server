var express = require('express');
var router = express.Router();
const { tourController } = require('../../controller/v1');

router.get('/food',tourController.getFoodList);
router.get('/lodgment',tourController.getLodgmentList);
router.get('/attractions',tourController.getAttractionsList);
router.get('/culture',tourController.getCultureList);
router.get('/shopping',tourController.getShoppingList);


module.exports = router;

var express = require('express');
var router = express.Router();
const { imageController } = require('../../controller/v1');

router.get('/',imageController.getImageList);

module.exports = router;

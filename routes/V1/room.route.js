var express = require('express');
var router = express.Router();

const controller = require('../../controller/v1/roomimages.controller')

router.route('/images')
.get(controller.get)

router.route('/images')
.post(controller.post)


module.exports = router;

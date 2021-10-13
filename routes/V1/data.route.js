var express = require('express');
var router = express.Router();

const controller = require('../../controller/v1/data.controller')

router.route('/name')
.get(controller.get)

router.route('/name')
.post(controller.post)

const controller2 = require('../../controller/v1/databtn.controller')

router.route('/btn')
.get(controller2.get)

router.route('/btn')
.post(controller2.post)

module.exports = router;

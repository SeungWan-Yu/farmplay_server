var express = require('express');
var router = express.Router();

const controller = require('../../controller/v1/recruit.controller')

router.route('/')
.get(controller.get)

router.route('/')
.post(controller.post)

const controller2 = require('../../controller/v1/recruitname.controller')

router.route('/name')
.get(controller2.get)

router.route('/name')
.post(controller2.post)

const controller3 = require('../../controller/v1/recruitcodeall.controller')

router.route('/code/all')
.get(controller3.get)

router.route('/code/all')
.post(controller3.post)

const controller4 = require('../../controller/v1/recruitcode.controller')

router.route('/code')
.get(controller4.get)

router.route('/code')
.post(controller4.post)

module.exports = router;

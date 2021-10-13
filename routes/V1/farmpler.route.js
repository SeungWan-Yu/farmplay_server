var express = require('express');
var router = express.Router();

const controller = require('../../controller/v1/farmpler.controller')

router.route('/')
.get(controller.get)

router.route('/')
.post(controller.post)

const controller2 = require('../../controller/v1/farmplerrecruit.controller')

router.route('/recruit')
.get(controller2.get)

router.route('/recruit')
.post(controller2.post)

const controller3 = require('../../controller/v1/farmplercode.controller')

router.route('/code')
.get(controller3.get)

router.route('/code')
.post(controller3.post)

const controller4 = require('../../controller/v1/farmplerid.controller')

router.route('/id')
.get(controller4.get)

router.route('/id')
.post(controller4.post)

const controller5 = require('../../controller/v1/farmplerentercode.controller')

router.route('/entercode')
.get(controller5.get)

router.route('/entercode')
.post(controller5.post)


module.exports = router;

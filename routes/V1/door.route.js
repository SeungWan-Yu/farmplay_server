var express = require('express');
var router = express.Router();

const controller = require('../../controller/v1/door.controller')

const controller2 = require('../../controller/v1/doors.controller')

const controller3 = require('../../controller/v1/doorname.controller')

router.route('/')
.get(controller.get)

router.route('/')
.post(controller.post)

router.route('/all')
.get(controller2.get)

router.route('/all')
.post(controller2.post)

router.route('/name')
.post(controller3.post)


module.exports = router;

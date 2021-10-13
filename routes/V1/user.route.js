var express = require('express');
var router = express.Router();

const controller = require('../../controller/v1/user.controller')

const controller2 = require('../../controller/v1/idcheck.controller')

const controller3 = require('../../controller/v1/buanchuser.controller')

router.route('/id')
.post(controller2.post)

router.route('/')
.get(controller.get)

router.route('/login')
.post(controller.post)

router.route('/buan')
.get(controller3.get)

const controller4 = require('../../controller/v1/userinfo.controller')

router.route('/id/recruit')
.post(controller4.post)

const controller5 = require('../../controller/v1/userinfo2.controller')

router.route('/id/info')
.post(controller5.post)

module.exports = router;

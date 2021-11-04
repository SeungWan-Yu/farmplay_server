var express = require('express');
var router = express.Router();

const controller = require('../../controller/v1/farm.controller')

router.route('/')
.get(controller.get)

router.route('/')
.post(controller.post)

router.route('/update')
.post(controller.farmUpdate)


router.route('/recruit')
.post(controller.getEnterList)

const controller2 = require('../../controller/v1/farmname.controller')

router.route('/name')
.get(controller2.get)

router.route('/name')
.post(controller2.post)

const controller3 = require('../../controller/v1/farmstate.controller')

router.route('/state')
.get(controller3.get)

router.route('/state')
.post(controller3.post)

const controller4 = require('../../controller/v1/farmuser.controller')

router.route('/user')
.get(controller4.get)

router.route('/user')
.post(controller4.post)


module.exports = router;

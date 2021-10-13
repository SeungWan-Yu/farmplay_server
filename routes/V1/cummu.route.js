var express = require('express');
var router = express.Router();

const controller = require('../../controller/v1/cummu.controller')
const controller2 = require('../../controller/v1/issuecummu.controller')

router.route('/')
.get(controller.get)

router.route('/issue')
.get(controller2.get)

router.route('/')
.post(controller.post)

module.exports = router;

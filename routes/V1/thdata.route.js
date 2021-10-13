var express = require('express');
var router = express.Router();

const controller = require('../../controller/v1/thdata.controller')

const controller2 = require('../../controller/v1/namethdata.controller')

router.route('/')
.post(controller.post)

router.route('/name')
.post(controller2.post)


module.exports = router;

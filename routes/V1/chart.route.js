var express = require('express');
var router = express.Router();

const controller = require('../../controller/v1/chart.controller')

router.route('/')
.get(controller.get)

router.route('/data')
.get(controller.get)


module.exports = router;

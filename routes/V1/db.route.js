var express = require('express');
var router = express.Router();

const controller = require('../../controller/v1/db.controller')

router.route('/')
.get(controller.get)

router.route('/')
.post(controller.post)

module.exports = router;

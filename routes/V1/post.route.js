var express = require('express');
var router = express.Router();

const controller = require('../../controller/v1/thdata.controller')


router.route('/')
.post(controller.post)


module.exports = router;

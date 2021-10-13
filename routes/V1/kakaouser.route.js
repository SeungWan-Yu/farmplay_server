var express = require('express');
var router = express.Router();

const controller = require('../../controller/v1/kakaouser.controller')

router.route('/')
.post(controller.post)

module.exports = router;

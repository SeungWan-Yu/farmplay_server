var express = require('express');
var router = express.Router();

const controller = require('../../controller/v1/comment.controller')
const controller2 = require('../../controller/v1/deletecomment.controller')

router.route('/')
.get(controller.get)

router.route('/')
.post(controller.post)

router.route('/delete')
.post(controller2.post)


module.exports = router;

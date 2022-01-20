var express = require('express');
var router = express.Router();

router.use('/', require('./mainRouter'))
router.use('/member', require('./memberRouter'));
router.use('/farm', require('./farmRouter'));
router.use('/recruit', require('./recruitRouter'));
router.use('/farmpler', require('./farmplerRouter'));
router.use('/farmpler', require('./farmplerRouter'));
router.use('/apiApp', require('./appApiRouter'));
router.use('/tour', require('./tourRouter'));


module.exports = router;
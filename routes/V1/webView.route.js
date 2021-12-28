var express = require('express');
var router = express.Router();
const { webViewController } = require('../../controller/v1');



router.get('/kakao',webViewController.getKakao);
router.get('/toss',webViewController.getToss);
router.get('/import',webViewController.getImport);
router.get('/tossSuccess',webViewController.getTossSuccess);
router.get('/tossFail',webViewController.getTossFail);


module.exports = router;

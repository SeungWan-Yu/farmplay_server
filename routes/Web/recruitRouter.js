const express = require('express');
const router = express.Router();
const { recruitController } = require('../../controller/web') ;


router.get('/recruitList', recruitController.getRecruitList) ;

module.exports = router 
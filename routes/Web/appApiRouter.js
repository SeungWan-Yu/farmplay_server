const express = require('express')
const router = express.Router()
const { appApiController } = require('../../controller/web') 
// Route 는 오직 Controller 에만 의존 합니다.

router.get('/appApiInsert', appApiController.appApiInsert) 
router.post('/addApi', appApiController.addApi) 
router.get('/apiInsert', appApiController.apiInsert) 
router.get('/apiInsertt', appApiController.apiInsertt) 
router.get('/appApiList', appApiController.appApiList) 
router.get('/appApiDel', appApiController.appApiDel) 




module.exports = router // 이렇게 내보내면 부모 router 에 자동으로 연결됩니다.
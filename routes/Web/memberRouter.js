const express = require('express');
const router = express.Router();
var upload = require('../../custom_modules/fileUpload');
const { memberController } = require('../../controller/web');
// Route 는 오직 Controller 에만 의존 합니다.




router.get('/memberList', memberController.memberList); 
router.post('/memberDel', memberController.memberDel);
router.get('/memberEdit', memberController.memberEdit); //수정페이지
router.post('/editMember', memberController.editMember); //수정에서 수정버튼 클릭할때 
router.get('/sendNotice', memberController.sendNotice);   //공지보내기
router.post('/noticeImg',upload("푸쉬").fields([{name:'pushFile'}]),memberController.noticeImg);   //공지보낼때 - 이미지업로드
router.post('/noticeSend',memberController.noticeSend);   //공지보낼때
router.post('/delPushImg', memberController.delPushImg); //수정에서 수정버튼 클릭할때 

module.exports = router; // 이렇게 내보내면 부모 router 에 자동으로 연결됩니다.
const express = require('express')
const router = express.Router()
const { memberController } = require('../../controller/web') 
// Route 는 오직 Controller 에만 의존 합니다.


// async function extendTimeout( req,res,next )  { 
//     console.log("타임아웃");
//     const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay))
//     await wait(5000);
//     console.log("셋타임아웃");
//     next();
// } 



//필터 
const fileFilter = (req, file, callback) =>{
    const typeArray = file.mimetype.split('/');
    const fileType = typeArray[1]; // 이미지 확장자 추출
    //이미지 확장자 구분 검사
    if(fileType == 'jpg' || fileType == 'jpeg' || fileType == 'png'){
        callback(null, true)
    }else {
        return callback({message: "*.jpg, *.jpeg, *.png 파일만 업로드가 가능합니다."}, false);
    }
}

//이미지 업로드
const multer  = require('multer');
var sftpStorage = require('multer-sftp')



// 파일 경로 및 이름 설정 옵션
const storage = sftpStorage({
    sftp: {
        host: 'joy4.ddns.net',
        port: 22,
        username: 'dshive',
        password: 'dshive!@#$'
      },
    destination: function (req, file, cb) {
        cb(null, __dirname+'/../../public/uploads_push') // 파일 업로드 경로
    },
    filename: function (req, file, cb) {
        const typeArray = file.mimetype.split('/');
        const fileType = typeArray[1]; // 이미지 확장자 추출
        cb(null, file.fieldname  +'_'+Date.now()+ '.' + fileType) //파일 이름 설정
        console.log("check1");
    }
  })

const upload = multer({ 
    storage : storage,
    limits: { fileSize: 10 *1024 * 1024 },
    dest: __dirname+'/../../public/uploads_push', // 이미지 업로드 경로
    fileFilter : fileFilter // 이미지 업로드 필터링 설정
}).fields([{name:'pushFile'}]);




router.get('/memberList',async (req,res) =>{
    var data =await memberController.memberList();
    res.render("../pages/member/memberList",{data:data.result,msg:data.msg});
}); 

//router.get('/memberList', memberController.memberList); 
router.get('/memberDel', memberController.memberDel);
router.get('/memberEdit', memberController.memberEdit); //수정페이지
router.post('/editMember', memberController.editMember); //수정에서 수정버튼 클릭할때 
router.get('/sendNotice', memberController.sendNotice);   //공지보내기
router.post('/noticeImg',upload,memberController.noticeImg);   //공지보낼때 - 이미지업로드
router.post('/noticeSend',memberController.noticeSend);   //공지보낼때
router.post('/delPushImg', memberController.delPushImg); //수정에서 수정버튼 클릭할때 

module.exports = router; // 이렇게 내보내면 부모 router 에 자동으로 연결됩니다.
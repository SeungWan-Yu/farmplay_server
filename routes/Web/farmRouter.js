const express = require('express')
const router = express.Router()
const { farmController } = require('../../controller/web') 
// Route 는 오직 Controller 에만 의존 합니다.


/*************************** 이미지 업로드 ************************/ 

//multer 미들웨어 파일 제한 값 (Doc 공격으로부터 서버를 보호하는데 도움이 된다.)
// const limits = {
//     fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
//     filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
//     fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
//     fileSize : 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
//     files : 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
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




// 파일 경로 및 이름 설정 옵션
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'/../../public/uploads') // 파일 업로드 경로
    },
    filename: function (req, file, cb) {
        const typeArray = file.mimetype.split('/');
        const fileType = typeArray[1]; // 이미지 확장자 추출
        cb(null, file.fieldname  +'_'+Date.now()+ '.' + fileType) //파일 이름 설정
    }
  })


const upload = multer({ 
    storage : storage,
    dest: __dirname+'/../../public/uploads', // 이미지 업로드 경로
    //limits: limits, // 이미지 업로드 제한 설정
    fileFilter : fileFilter // 이미지 업로드 필터링 설정
});

/*************************** 이미지 업로드 끝************************/ 

router.get('/farmList', farmController.farmList);
router.post('/farmRoomImgList', farmController.farmRoomImgList);
router.post('/farmRoomImgDel', farmController.farmRoomImgDel);
router.post('/farmRoomImgInsert', upload.array('file'),farmController.farmRoomImgInsert);
router.get('/farmDel', farmController.farmDel); 
router.get('/farmEdit', farmController.farmEdit);
router.post('/editFarm',upload.fields([{name:'farmImgFile'},{name:'roomImgFile'}]),farmController.editFarm);
router.get('/farmAskList', farmController.farmAskList);
router.post('/farmConfirm', farmController.farmConfirm);

module.exports = router // 이렇게 내보내면 부모 router 에 자동으로 연결됩니다.
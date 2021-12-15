const multer  = require('multer');


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

// 파일 경로 및 이름 설정 옵션
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
        const typeArray = file.mimetype.split('/');
        const fileType = typeArray[1]; // 이미지 확장자 추출
        cb(null, file.fieldname  +'_'+Date.now()+ '.' + fileType) //파일 이름 설정
    }
  })


const upload = multer({ 
    storage : storage,
    //limits: limits, // 이미지 업로드 제한 설정
    fileFilter : fileFilter // 이미지 업로드 필터링 설정
});


module.exports = upload;
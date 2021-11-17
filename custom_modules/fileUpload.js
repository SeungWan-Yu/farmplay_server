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


module.exports = upload;
var express = require('express');
var multer = require('multer'); // multer모듈 적용 (for 파일업로드)


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
})
var upload = multer({ storage: storage })
var router = express.Router();
const app = express();
app.locals.pretty = true

app.use(express.json())


require('dotenv').config()
router.get('/upload', function(req, res, next)  {
  res.render("upload")
  // res.send(process.env.DEV_DB_USER)
});



var now = new Date();
var date = now.toString()

// console.log(date.substring(16,18))
// setTimeout(() => {
//   console.log(date.substring(16,18))
// }, 60000);


router.use('/v1', require('./V1'));
router.use('/admin', require('./Web'));
router.get('/', (req, res, next) => {
  return res.redirect("/admin");
});

var results = {
    result : "성공"
  }




module.exports = router;
console.log("Server Start")
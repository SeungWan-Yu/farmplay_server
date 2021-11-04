var mysqlDB = require('../mysql-db');
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

router.get('/kakao', (req, res, next) => {
  return res.sendFile(__dirname+'/kakao.html')
});

router.get('/import', (req, res, next) => {
  return res.sendFile(__dirname+'/import.html')
});

router.post('/v2', function(req, res, next)  {
  // res.json({title:'test'});
  // res.send(process.env.DEV_DB_USER)
  res.send(req.body)
});

router.get('/', (req, res, next) => {
  return res.render("../pages/main");
});


var now = new Date();
var date = now.toString()

// console.log(date.substring(16,18))

// setTimeout(() => {
//   console.log(date.substring(16,18))
// }, 60000);


router.use('/v1', require('./V1'))
router.use('/admin', require('./Web'))


var results = {
    result : "성공"
  }


router.post('/imgupload',upload.fields([{name:'farmImgFile'},{name:'roomImgFile'}]),function(req,res){
  console.log("loglog/ farmcode = "+req.body.farmcode)
  var farmImg = req.files.farmImgFile
  var roomImg = req.files.roomImgFile
  console.log("숙소 이미지 길이 = "+roomImg.length+" / "+farmImg[0].filename)
  console.log("----------------------------")
  //farm update
  mysqlDB.query('update farm set farmImg = "'+farmImg[0].filename+'" where farmCode = '+req.body.farmcode+';' , function (err, rows, fields) {
    if (!err) {
      console.log("farm img update success----------------")
      console.log(rows)
      for(var i=0; i<roomImg.length; i++){
        mysqlDB.query('insert into farm_room_img (roomImgFarmCode, roomImgUrl) values ('
        +req.body.farmcode+',"'+roomImg[i].filename+'");', function (err, rows, fields) {
        if (!err) {
            console.log("room img insert success----------------")
            console.log(rows)
        }
        else{
            console.log("err"+err)
        }
    })
      }
    }else{
      console.log(err)
      res.send("err")
    }
  })
res.send(results)
// console.log(results)
})

module.exports = router;
console.log("Server Start")
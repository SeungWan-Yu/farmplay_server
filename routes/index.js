var mysqlDB = require('../mysql-db');
var express = require('express');
var multer = require('multer'); // multer모듈 적용 (for 파일업로드)
const { diskStorage } = require('multer');
var storage = diskStorage({
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

router.get('/v2', function(req, res, next)  {
  // res.json({title:'test'});
  // res.send(process.env.DEV_DB_USER)
  mysqlDB.query('select count(*) as count from farm_room_img;' , function (err, rows, fields) {
    if (!err) {
      console.log(rows[0].count)
    }else{

    }
  // res.send(req.body)
  })
})

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

  router.post('/profile_img',upload.single('profileImgFile'), function(req,res){
    mysqlDB.query('update users set user_profile_img = "'+req.file.filename+'" where farmCode = '+req.body.farmcode+';' , function (err, rows, fields) {
      if (!err) {
        console.log("프로필 이미지 이름 : "+req.file.filename)
        results.result = req.file.filename
        res.send(results)
      }else{
        results.result = req.file.filename
        res.send(results)
      }
  })
})

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
      //해당 농장 코드로 등록된 숙소사진이 있는지 DB 조회
        mysqlDB.query('select count(*) as count from farm_room_img where roomImgFarmCode = '+req.body.farmcode+';' , function (err, rows, fields) {
        if (!err) {
          //해당 농장 코드로 아직 등록된 숙소 사진이 없는경우 - 새로 삽입
          if(rows[0].count == 0){
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
            //해당 농장 코드로 등록된 숙소 사진이 이미 있는 경우 - 이미 등록된 숙소사진 모두 삭제?
            mysqlDB.query('delete from farm_room_img where roomImgFarmCode = '+req.body.farmcode+';' , function (err, rows, fields) {
              if (!err) {
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
                res.send(err)
              }
            })
          }
        }
        else{
          res.send(err)
        }
      })

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
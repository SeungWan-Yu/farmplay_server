var express = require('express');
var multer = require('multer')
var upload = multer({dest:'images/'})
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


var now = new Date();
var date = now.toString()

// console.log(date.substring(16,18))

// setTimeout(() => {
//   console.log(date.substring(16,18))
// }, 60000);


router.use('/v1', require('./V1'))
router.use('/admin', require('./Web'))

const result = 
        {
            result : "성공"
        }

router.post('/upload',upload.single('uploaded_file'),function(req,res){
res.send(result)
})


module.exports = router;
console.log("Server Start")
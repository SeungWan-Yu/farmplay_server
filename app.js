var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var cors = require("cors");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/V1/user.route');
var dotenv = require("dotenv");
var scheduler = require('./custom_modules/scheduler');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const connection = require('./configs/mysql2-db');

dotenv.config();
var app = express();
// view engine setup

app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');
app.set('view engine', 'ejs') // express 의 view 엔진을 ejs 로 세팅 
app.set('views', __dirname + '/views/ejs') // 디폴트 view 경로세팅   
app.set('layout', 'layout');
app.set("layout extractScripts", true); //script태그 매핑 (레이아웃 위치로 매핑된다.)
app.set("layout extractStyles", true); //style태그 매핑 (레이아웃 위치로 매핑된다.)


app.use('/public',express.static(__dirname +'/public')); //정적 폴더 세팅
app.use(expressLayouts); // express-ejs-layouts 사용하기 설정
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false })); 


var sessionStore = new MySQLStore({},connection);


app.use(session({
  secret: "session_cookie_secret",
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));


//ejs에서 항상 꺼내쓸수있도록
app.use(function(req, res, next) {
  res.locals.uid = req.session.uid;
  next();
});

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// var mysqlDB = require('./mysql-db');
// mysqlDB.connect();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//스케쥴러 실행 (모집마감)
scheduler.schedulerRecruitEnd();



module.exports = app;

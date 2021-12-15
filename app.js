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

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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



module.exports = app;

const firebase = require('firebase');
module.exports.get = ( req,res,next) => {
// 파이어베이스 config 정보 
var firebaseConfig = {
  apiKey: "your api key",
  authDomain: "your auth domain",
  databaseURL: "your database url",
  projectId: "smarthive-611cd",
  storageBucket: "your storage bucket",
  messagingSenderId: "your messaging sender id",
  appId: "your app id",
  measurementId: "your measurement id"
};
// 파이어베이스 정보 등록
const request = require('request');

// 무슨 데이터를 줄지 토큰은 무엇인지
const options = {
    uri:'https://fcm.googleapis.com/fcm/send', 
    method: 'POST',
    headers: {
        "content-type": "application/json",
        "Authorization": "key = AAAAI0HiQWY:APA91bFk0oRYh_edmHuMXQBRjBkMpvoAkTcVnvH7LT_dQe_MQRyuOTjfOKz4Qh4TMYkKR_ba-Ni0PuHPeBwX1G15_rRpmAz_LjyXFVMTI4lgGPOrwcjoyB9OaKR8OPY-PMokCPB70oMM"
    },
    json: {
        "priority": "high",
        'to': "fzANjM7GTG-7wf7lm2gpnW:APA91bHjfCwMcOBvWZWycpQd4Ywdfmwn6rIiGNrSo4hT8o-Yhmxk7BEmiwRbR5kSVaxoVokhnLabzDoNZocQt4e1OMVxAgiT5OIknM5nXNGQrX3Cs9627beH1FwsLv7BKVdd1Y9x0qKY",
        'notification': {
            'body': '벌통의 온습도에 문제가 생겼습니다.',
            'title': '벌통 상태 경고',
        }
    }
  }
  request.post(options, function(err,httpResponse,body){ /* ... */ });
  res.send('성공')
}
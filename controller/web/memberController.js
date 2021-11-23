const memberModel = require("../../models/web/memberModel");



//파일 삭제함수
function dFile(path){
    const fs = require('fs');
    const directory = fs.existsSync(path)//디렉토리 경로 입력
    if(directory){
        try {
            fs.unlinkSync(path)
            console.log("파일삭제성공");
            return "s";
        } catch(err) {
            console.error(err)
            return "f";
        }
    }else{
        console.log("파일이 없다");
        return false;
    }
}


exports.memberList = async function(){
    var results = {result:"", msg:"성공"};
    try {
        results.result = await memberModel.getUserList();
    } catch (error) {
        results.result = "실패";
        results.msg = error;
    }
    console.log("리턴값체크");
    console.log(results);
    return results;
}

// exports.memberList = function (req, res) {
//     memberModel.getUserList().then(function(data){
//         console.log("하이");
//         console.log(data)
//         res.render("../pages/member/memberList",{data:data});
//     })
   
// }

exports.memberDel = function (req, res) {
    
    var uId = req.param("id");
    console.log("아아디>>>"+uId);

    memberModel.delUser(uId).then(function(data){
        console.log(data);
    })

    res.redirect("/admin/member/memberList");
}

exports.memberEdit = async function (req, res) {
    
    var uId = req.param("id");
    console.log("아아디>>>"+uId);

    var data = await memberModel.getOneUser(uId);
    console.log("여깅>>>>"+data);
    console.log(data);
    res.render("../pages/member/memberEdit",{data:data});
    
    //async를 사용하면 콜백지옥에서 벗어날 수 있어 data를 전역변수로 쓸수 있다 await 기다렸다가 아래 코드가 실행된다
    //조건처리해서 모델을 두번 이상 호출할때는 호출코드에 await를 또 붙여서 사용하면 된다.

    
}


exports.editMember = async function (req, res) {
    console.log("수정페이지")
    var user = req.body;
    console.log(user.uId);


    var data = await memberModel.updateUser(user);
    console.log("업데이트 완료>>>>"+data);
    console.log(data);
    res.redirect("/admin/member/memberList");
    
}

exports.sendNotice = function (req, res) {
    console.log("공지보내기11");

   
    const fs = require( "fs" );
    const file = fs.readdirSync("public/uploads_push","utf8")
    console.log("파일길이>>"+file.length);
    res.render("../pages/member/sendNotice",{fileLen:file.length});
}


exports.noticeImg = function (req, res) {
    var pushFile = req.files.pushFile; 
    console.log(pushFile);
    console.log("공지보내기시작");
    var body = req.body;
    console.log(body);
    var title  = body.title;
    var content  =  body.content
    var imgurl = "";
    if(pushFile != null){
        //imgurl = "http://192.168.1.24:3000/public/uploads_push/"+req.file.filename; 
        //imgurl = "http://14.63.223.217/public/uploads_push/"+req.file.filename; 
        imgurl = "http://joy4.ddns.net:3000/public/uploads_push/"+pushFile[0].filename; 
    }
    console.log("이미지유알엘>>>"+imgurl);
        
    res.json({imgurl,title,content});

}

exports.noticeSend = function (req, res) {
    
    console.log("공지보내기시작");
    var body = req.body;
    var title  = body.title;
    var content  =  body.content
    var imgurl = body.imgurl;
    console.log(body);

    var admin = require('../../configs/firebase');
   
    const options = {
        priority: "high",     //메시지 중요도 설정 
        timeToLive: 60 * 60 * 2 ////메시지 Live Time 설정
    }; 

    var message = {
            data: {  
                message : JSON.stringify({
                    type:'notice',
                    channel: '10',
                    title: title,
                    content: content,
                    imgUrl : imgurl,
                })
            }
    };
    console.log("메세지체크");
    console.log(message);
    
    admin.messaging().sendToTopic('note1', message, options).then(() => {
        res.json({"s":"성공"});
    }).catch((err) => {
        res.json({err});
    });

}



exports.delPushImg = function (req, res) {
    console.log("이미지삭제");
    const fs = require( "fs" );
    const files = fs.readdirSync("public/uploads_push","utf8");
    var filesLen = files.length;
    var cnt = 0;
    var resulte = "f";
    
    if(filesLen>0){
        var path = "public/uploads_push/"
        for(var i=0;i<files.length;i++){
            var a = dFile(path+files[i]);
            console.log("체크>>>"+a);
            if(a=="s"){
                cnt++;
            }
        }
    }
    
    if(cnt==filesLen){
        resulte = "s";
    }

    const files2 = fs.readdirSync("public/uploads_push","utf8");
    
    var data = {"result":resulte,"filesLen":files2.length}

    res.json(data)
}
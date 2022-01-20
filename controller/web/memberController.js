const memberModel = require("../../models/web/memberModel");
const pool = require('../../configs/mysql2-db');
const fs = require( "fs" );

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


exports.memberList = async (req,res) => {
    console.log("멤버리스트");
    const con = await pool.getConnection();
    var results = {result:"success" ,data:[] ,message:"empty"};
    try {
        results.data = await memberModel.getUserList(con);
        if(results.data.length>0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }finally{
        con.release();
        res.render("../pages/member/memberList",results);
    }

}

exports.memberDel = async (req,res) => {
    const con = await pool.getConnection();
    var results = {result:"success" ,data:[] ,message:"empty"};
    try {
        var body = req.body;
        console.log(body);
        results.data = await memberModel.removeUser(con,body);
        if(results.data.affectedRows!=0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }finally{
        con.release();
        res.send(results);
    }
}

exports.memberEdit = async (req,res) => {
    const con = await pool.getConnection();
    var results = {result:"success" ,data:[] ,message:"empty"};
    try {
        var id = {"id" : req.param("id")};
        console.log(id);
        results.data = await memberModel.getOneUser(con,id);
        if(results.data.length>0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }finally{
        con.release();
        res.render("../pages/member/memberEdit",results);
    }
}


exports.editMember = async function (req, res) {
    console.log("수정페이지")
    const con = await pool.getConnection();
    var results = {result:"success" ,data:[] ,message:"empty"};
    try {
        var body = req.body;
        console.log(body);
        results.data = await memberModel.updateUser(con,body);
        if(results.data.changedRows!=0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }finally{
        console.log(results);
        con.release();
        res.redirect("/admin/member/memberList");
    }
}

exports.sendNotice = function (req, res) {
    console.log("공지보내기");
    const file = fs.readdirSync("public/uploads_push","utf8");
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
        //imgurl = "http://192.168.1.24:3000/public/uploads_push/"+pushFile[0].filename; 
      
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
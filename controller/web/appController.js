const {appModel} = require("../../models/web");
const pool = require('../../configs/mysql2-db');
var fileDel = require('../../custom_modules/fileDelete');
const fs = require( "fs" );

exports.banner = async(req,res) => {
    const con = await pool.getConnection();
    var results = {result:"success" ,data:[] ,message:"empty",dataLen:""};
    try {
        results.data = await appModel.getBannerList(con);
        if(results.data.length>0)results.message = "exist";
        const file = fs.readdirSync("public/uploads_banner","utf8");
        console.log("파일길이>>"+file.length);
        results.dataLen = +file.length;
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }finally{
        con.release();
        console.log(results);
        res.render("../pages/appPage/banner",results);
    }
}



exports.bannerUpdate = async(req,res) => {
    console.log("여기오나요");
    var results = {"result":"결과"};
    var body = req.body;
    var del = JSON.parse(body.delete);
    var add = JSON.parse(body.add);
    var edit = JSON.parse(body.edit);
    var img = JSON.parse(body.img);
    var delImg  = JSON.parse(body.delImg);
    var files = req.files;

    //업로드된 파일명 세팅
    for(var i in img){
        if(img[i].bannerOriUrl==files[i].originalname){
            if(img[i].bannerCode=="신규"){
                for(var j in add){
                    if(add[j].bannerNumber==img[i].bannerNumber){
                        add[j].bannerUrl = files[i].filename;
                    }
                }
            }else{
                for(var k in edit){
                    if(edit[k].bannerNumber==img[i].bannerNumber){
                        edit[k].bannerUrl = files[i].filename;
                    }
                }
            }
        }
    }

    const con = await pool.getConnection();
    var results = {result:"success" ,data:[] ,message:"empty"};
    try {
        await con.beginTransaction();
        if(del.length>0){
            var r1 = await appModel.deleteBannerList(con,{"del":del});
        }
        if(add.length>0){
            var r3 = await appModel.insertBannerList(con,{"add":add});
        }
        if(edit.length>0){
            var r2 = await appModel.updateBannerList(con,{"edit":edit});
        }

        await con.commit();
        
        //파일삭제
        for(var i in delImg){
            fileDel("public/uploads_banner/"+delImg[i].bannerUrl);
        }
    
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        await con.rollback();
        console.log(error);
    }finally{
        con.release();
        console.log(results);
        res.send(results); 
    }
    
}


exports.bannerImgOrganize = async(req,res) => {
    console.log("파일정리")
    const con = await pool.getConnection();
    var results = {result:"success" ,data:[] ,message:"empty",dataLen:""};
    try {
        r1 = await appModel.getBannerList(con);
        if(results.data.length>0)results.message = "exist";

        var delImg = [];
        var bannerUrlList = [];
        for(var i in r1){
            var bannerUrl = r1[i].bannerUrl
            bannerUrlList.push(bannerUrl);
        }        
        var file = fs.readdirSync("public/uploads_banner","utf8");
        for(var j in file){
           var chk =  bannerUrlList.includes(file[j]);
           if(!chk){
               console.log("삭제할파일");
               console.log(file[j]);
               fileDel("public/uploads_banner/"+file[j]);
           }
        }
        var file2 = fs.readdirSync("public/uploads_banner","utf8");
        results.dataLen = +file2.length;
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }finally{
        con.release();
        console.log(results);
        res.send(results); 
    }
}
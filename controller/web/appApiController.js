const appApiModel = require("../../models/web/appApiModel");
const pool = require('../../configs/mysql2-db');


// 앱api등록 화면 컨트롤러
exports.appApiAdd = function (req, res) {
    console.log("컨트롤러")
    res.render("../pages/appApi/appApiAdd");
}


// 앱api 삭제 컨트롤러
exports.addApiDel = async (req,res) => {
    console.log("api등록");
    const con = await pool.getConnection();
    var results = {result:"success" ,data:[] ,message:"empty"};
    try {
        var query = req.query;
        console.log("쿼리체크");
        console.log(query);
        results.data = await appApiModel.addApiDel(con,query);
        if(results.data.affectedRows!=0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }finally{
        con.release();
        res.redirect("/admin/apiApp/appApiList");
    }
}

// 앱api 등록 버튼 클릭시 등록되는 컨트롤러
exports.addApi = async (req,res) => {
    console.log("api등록");
    const con = await pool.getConnection();
    var results = {result:"success" ,data:[] ,message:"empty"};
    try {
        var body = req.body;
        results.data = await appApiModel.addApi(con,body);
        if(results.data.affectedRows!=0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }finally{
        con.release();
        res.redirect("/admin/apiApp/appApiList");
    }
}


// 앱api 등록 버튼 클릭시 등록되는 컨트롤러
exports.appApiList = async (req,res) => {
    console.log("api리스트");
    const con = await pool.getConnection();
    var results = {result:"success" ,data:[] ,message:"empty"};
    try {
        results.data = await appApiModel.apiAllList(con);
        if(results.data.length>0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }finally{
        con.release();
        res.render("../pages/appApi/appApiList",results);
    }
}

// 앱api crud페이지 컨트롤러
exports.apiCrud = async (req,res) => {
    console.log("api리스트");
    const con = await pool.getConnection();
    var results = {result:"success" ,data:[] ,message:"empty"};
    try {
        var url = req.url+"";
        var crudMap = {"crud":""};
        if(url.includes("Insert")){
            crudMap.crud = "Insert";
        }else if(url.includes("Update")){
            crudMap.crud = "Update";
        }else if(url.includes("Delete")){
            crudMap.crud = "Delete";
        }else if(url.includes("Select")){
            crudMap.crud = "Select";
        }      
        console.log("맵확인>?>"+crudMap);
        results.data = await appApiModel.apiListCrud(con,crudMap);
        if(results.data.length>0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }finally{
        con.release();
        res.render("../pages/appApi/apiCrud",results);
    }
}



// exports.apiCrud = function (req, res) {
//     var url = req.url+"";
//     var crud = "";
//     crud.includes
//     if(url.includes("Insert")){
//         crud = "Insert";
//     }else if(url.includes("Update")){
//         crud = "Update";
//     }else if(url.includes("Delete")){
//         crud = "Delete";
//     }else if(url.includes("Select")){
//         crud = "Select";
//     }      

   
//     appApiModel.apiList(crud).then(function(data){
//         console.log(data)
//         res.render("../pages/appApi/apiCrud",{data:data});
//     });

// };


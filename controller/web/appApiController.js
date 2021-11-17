const appApiModel = require("../../models/web/appApiModel");


// 앱api등록 화면 컨트롤러
exports.appApiInsert = function (req, res) {
    console.log("컨트롤러")
    res.render("../pages/appApi/appApiInsert");
}

// 앱 api insert 화면 컨트롤러
exports.apiInsert = function (req, res) {

    res.render("../pages/appApi/apiInsert");
}

// 앱api 등록 버튼 클릭시 등록되는 컨트롤러
exports.addApi = function (req, res) {
    console.log("에드에이피아이 컨트롤러");
    var body = req.body;
    console.log("바디체크");
    console.log(body);
    appApiModel.addApi(body).then(function(data){
        console.log(data)
        res.redirect("/admin/apiApp/appApiList");
    });

}

// 앱api insert페이지 컨트롤러
exports.apiInsertt = function (req, res) {
    var apiCrud = "Insert";
    appApiModel.apiList(apiCrud).then(function(data){
        console.log(data)
        res.render("../pages/appApi/apiInsertt",{data:data});
    });

}

// 앱api 리스트페이지 컨트롤러
exports.appApiList = function (req, res) {
    appApiModel.apiAllList().then(function(data){
        console.log("리스트 출력")
        console.log(data)
        res.render("../pages/appApi/appApiList",{data:data});
    });
}



// 앱api 삭제 컨트롤러
exports.appApiDel = function (req, res) {
    console.log("에이피아이 삭제 컨트롤러");
    var apiCode = req.query.apiCode
    console.log(apiCode);
    appApiModel.appApiDel(apiCode).then(function(data){
        console.log("리스트로 다시 출발")
        res.redirect("/admin/apiApp/appApiList");
    });
}


// 앱api 인서트 화면
exports.apiSelect = function (req, res) {
    var apiCrud = "Select";
    appApiModel.apiList(apiCrud).then(function(data){
        console.log("데이터체크")
        console.log(data);
        res.render("../pages/appApi/apiSelect",{data:data});
    });
}
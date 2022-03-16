const mainModel = require("../../models/web/mainModel");
const bcrypt = require('bcrypt');


exports.mainView = function (req, res) {
    res.render("../pages/main");
}


exports.getLoginPage = async(req,res) => {
    res.render("../pages/login/login");
}

exports.getLogin = async(req,res) => {
    var body = req.body;  
    if(req.body.id!="admin"){
        console.log("아이디다름");
        res.redirect("/admin");
    }else{
        var id = body.id;
        var pw = body.pw;
        var result = await mainModel.getLogin(body.id);

        var encryptedPW = result[0].userPw; 
  
        
        bcrypt.compare(pw , encryptedPW, (err, same) => {
            if(same){
                req.session.uid = id;
                req.session.upw = pw; 
                req.session.save(function(){  
                    res.redirect("/admin");
                });
            }else{
                res.redirect("/admin");
            }
        });
    }
}

exports.getLogout = async(req,res) => {
    console.log("세션파괴");
    req.session.destroy();
    res.redirect("/admin/loginPage");
   
}

exports.destoryView =async function (req, res) {
    
    try {
        var result = await mainModel.getDestory();
        console.log("성공");
        console.log(result);
    } catch (error) {
        console.log(error);
    }
    

    res.render("../pages/main");
    
}
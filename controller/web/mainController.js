const mainModel = require("../../models/web/mainModel");

exports.mainView = function (req, res) {
    
    res.render("../pages/main");
    
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
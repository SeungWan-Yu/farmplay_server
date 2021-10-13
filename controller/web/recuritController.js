const recuritModel = require("../../models/web/recuritModel");


exports.recuritList = function (req, res) {
    recuritModel.getRecruitList().then(function(data){
        console.log("하이");
        console.log(data)
        res.render("../pages/recurit/recuritList",{data:data});
    })
   
}


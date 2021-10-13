const farmplerModel = require("../../models/web/farmplerModel");


exports.farmplerRlist = function (req, res) {
    var recuritCode = req.body.recuritCode;
    farmplerModel.getFarmplerRlist(recuritCode).then(function(data){
        res.json(data);
    })
   
}


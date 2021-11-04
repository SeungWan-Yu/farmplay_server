var mysqlDB = require('../../mysql-db');
const farmplerModel = require("../../models/v1/farmplerModel");

module.exports.get = ( req,res,next) => {
    mysqlDB.query('select * from farm where farmstate = 1', function (err, rows, fields) {
        if (!err) {
            console.log(rows);
            console.log(fields);
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
            res.send(JSON.stringify(rows));
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
}

module.exports.post = ( req,res,next) => {
    var results = {
        result : ""
    }
    mysqlDB.query('select * from farmpler where enterRecuritCode = "'+req.body.recruitcode+'" ', function (err, rows, fields) {
        if (!err) {
            console.log(rows);
            console.log(fields);
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
                results.result = "success"
            res.send(rows);
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
  
}

exports.updateEnterState = function (req, res) {
    console.log("팜플러컨트롤러");
    var body = req.body
    console.log("받아온 리퀘스트값>>>");
    console.log(body.userId);
  
    farmplerModel.updateEnterState(body).then(function(data){
        console.log("성공");
        console.log(data);
        res.send(data);
    }).catch(function(err){
        console.log("캐치에러");``
        console.log(err);
        console.log("에러메세지끝");
    });

}


var mysqlDB = require('../../mysql-db');
const reruitModel = require("../../models/v1/reruitModel");

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
        result  : "",
        message : ""
    }
    mysqlDB.query('insert into recruit (recuritFarmCode,recuritState,recuritUserId,recuritStart,recuritEnd,recuritJobStart,recuritJobEnd,recuritJobKind,recuritMealProvide,recuritMealVeget,recuritMealMemo,recuritChkFampler,recuritChkPeriod,recuritChkMinor,recuritChkMinorMemo,recuritChkMax,recuritChkSummary) values ("'
    +req.body.recuritFarmCode+'","'+req.body.recuritState+'","'+req.body.recuritUserId+
    '","'+req.body.recuritStart+'","'+req.body.recuritEnd+'","'+req.body.recuritJobStart+'","'+req.body.recuritJobEnd+
    '","'+req.body.recuritJobKind+'","'+req.body.recuritMealProvide+'","'+req.body.recuritMealVeget+'","'+req.body.recuritMealMemo+
    '","'+req.body.recuritChkFampler+'","'+req.body.recuritChkPeriod+'","'+req.body.recuritChkMinor+
    '","'+req.body.recuritChkMinorMemo+'","'+req.body.recuritChkMax+'","'+req.body.recuritChkSummary+'");', function (err, rows, fields) {
        if (!err) {
            console.log(rows);
            console.log(fields);
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
                results.result = "success"
            res.send(results);
        } else {
            console.log('query error : ' + err);
            results.result = "fail";
            results.message = err;
            res.send(results);
        }
    });
  
}

exports.updateReruit = function (req, res) {
    console.log("팜컨트롤러 전근영");
    var body = req.body
    console.log("받아온 리퀘스트값>>>");
    console.log(body);
    var results = {
        result  : "",
    }
    reruitModel.updateReruit(body).then(function(data){
        console.log("성공");
        results.result = "success"
        console.log(data);
        res.send(results);
    }).catch(function(err){
        console.log("캐치에러");
        console.log(err);
    });

}


exports.endReruit = function (req, res) {
    console.log("팜마감하기컨트롤러 전근영");
    var query = req.query
    console.log("받아온 리퀘스트값>>>");
    console.log(query);
    var results = {
        result  : "",
    }
    reruitModel.endReruit(query).then(function(data){
        console.log("성공");
        results.result = "success"
        console.log(data);
        res.send(results);
    }).catch(function(err){
        console.log("캐치에러");
        console.log(err);
    });

}
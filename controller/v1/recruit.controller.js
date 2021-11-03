var mysqlDB = require('../../mysql-db');

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
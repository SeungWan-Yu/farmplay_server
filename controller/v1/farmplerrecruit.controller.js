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
        result : "zz"
    }
    mysqlDB.query('insert into farmpler (enterfarmCode,enterRecuritCode,enterUserId,enterUserName,enterStart,enterEnd,enterEditStart,enterEditEnd,enterFarmplerIntro,enterCancelReson,enterEditReson,enterState,enterReview) values("'
    +req.body.enterFarmCode+'","'+req.body.enterRecuritCode+'","'+req.body.enterUserId+'","'+req.body.enterUserName+'","'
    +req.body.enterStart+'","'+req.body.enterEnd+'","'+req.body.enterEditStart+'","'
    +req.body.enterEditEnd+'","'+req.body.enterFarmplerIntro+'","'+req.body.enterCancelReson+'","'
    +req.body.enterEditReson+'","'+req.body.enterState+'","'+req.body.enterReview+'")', function (err, rows, fields) {
        if (!err) {
            console.log(rows);
            console.log(fields);
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
                results.result = "success"
            res.send(results);
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
  
}
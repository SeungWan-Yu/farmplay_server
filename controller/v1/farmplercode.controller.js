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
    var state = ""

    if(req.body.state == 1){
        state = "참가확정됨"
    }else if(req.body.state == 2){
        state = "참가취소됨"
    }else if(req.body.state == 3){
        state = "참가확정됨"
    }else{

    }
    mysqlDB.query('update farmpler set enterState = "'+state+'" where enterCode = '+req.body.enterCode+'', function (err, rows, fields) {
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
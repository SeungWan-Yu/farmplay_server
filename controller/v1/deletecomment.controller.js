var mysqlDB = require('../../mysql-db');

module.exports.get = ( req,res,next) => {
    mysqlDB.query('select * from comments', function (err, rows, fields) {
        if (!err) {
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
    const reqcummu = {
        commentsid : req.body.commentsid,
        phone : req.body.phone
    }
    console.log(reqcummu)
    const results = {
        result : ""
    }
    mysqlDB.query('delete from comments where comments_id ='+reqcummu.commentsid+' and user_phone = '+reqcummu.phone+';', function (err, rows, fields) {
        if (!err) {
            results.result = "success"
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
            res.send(results);
        } else {
            results.result = "failed"
            console.log('query error : ' + err);
            res.send(results);
        }
    });
}
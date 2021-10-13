var mysqlDB = require('../../mysql-db');
module.exports.get = ( req,res,next) => {
    mysqlDB.query('select * from users', function (err, rows, fields) {
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
    var userphone = req.body.id
    var userpw = req.body.pw
    var results = {
        state : "",
        result : "",
        farmerstate : 0
    }

    mysqlDB.query('select count(*) from users where user_phone = "'+userphone+'";', function (err, rows, fields) {
        if (!err) {
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
                console.log(JSON.stringify(rows[0]))
            res.send(JSON.stringify(rows[0]));
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
}
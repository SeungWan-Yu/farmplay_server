var mysqlDB = require('../../mysql-db');

module.exports.get = (req, res, next) => {
    res.send(marker)
}

module.exports.post = (req, res, next) => {
    var name = req.body.name;
    var id = req.body.id;
    var pass = req.body.pass;
    var phone = req.body.phone;

    console.log(name,id,pass,phone)

    var results = {
        result: ""
    }
    mysqlDB.query('select * from users where user_phone = "' + phone + '";', function (err, rows, fields) {
        if (!err) {
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
                console.log(rows)
            if (JSON.stringify(rows) == "[]") {
                console.log(results)
                results.result = "empty"
                res.send(results);
            } else {
                if (name == rows[0].user_name && id == rows[0].user_id) {
                        mysqlDB.query('update users set user_pw ="' + pass + '" where user_id = "' + id + '";', function (err, rows, fields) {
                            if (!err) {
                                results.result = "success"
                                res.send(results);
                            } else {
                                results.result = "err"
                                console.log('query error : ' + err);
                                // res.send(err);
                                res.send(results);
                            }
                        })
                } else {
                    results.result = "fail"
                    res.send(results);
                }
            }
        } else {
            results.result = "err"
            console.log('query error : ' + err);
            // res.send(err);
            res.send(results);
        }
    });

}
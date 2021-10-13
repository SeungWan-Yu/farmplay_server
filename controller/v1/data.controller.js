var mysqlDB = require('../../mysql-db');
module.exports.get = ( req,res,next) => {
    mysqlDB.query('select * from user', function (err, rows, fields) {
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
        farmerstate : 0,
        username : ""
    }
    var logincheck = [{
        state : "",
        result : ""
    }]

    // mysqlDB.query('select * from users where user_phone = "'+userphone+'";', function (err, rows, fields) {
    //     if (!err) {
    //         var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
    //             'fields : ' + JSON.stringify(fields);
    //             if(JSON.stringify(rows)== "[]"){
    //                 logincheck[0].state = "empty",
    //                 logincheck[0].result = "fail"
    //             }else{
    //                 if(userpw == rows[0].password){
    //                     logincheck[0].state = "exist",
    //                     logincheck[0].result = "success"
    //                     results.farmerstate = rows[0].farmerstate
    //                 }else{
    //                     logincheck[0].state = "wrong",
    //                     logincheck[0].result = "pass"
    //                 }
    //             }
    //         res.send(logincheck);
    //         console.log(logincheck);
    //     } else {
    //         console.log('query error : ' + err);
    //         res.send(err);
    //     }
    // });

    mysqlDB.query('select * from dalant where name = "'+req.body.name+'";', function (err, rows, fields) {
        if (!err) {
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
                if(JSON.stringify(rows)== "[]"){
                    results.state = "empty",
                    results.result = "fail"
                }else{
                    if(userpw == rows[0].user_pw){
                        results.state = "exist",
                        results.result = "seccess"
                        results.farmerstate = rows[0].farmerstate
                        results.username = rows[0].user_name
                    }else{
                        results.state = "wrong",
                        results.result = "fail"
                    }
                }
                // console.log(rows[0])
            res.send(rows[0]);
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
}
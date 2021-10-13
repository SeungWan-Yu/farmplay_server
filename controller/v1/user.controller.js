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
        farmname : "",
        farmcode : 0,
        password : "",
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

    mysqlDB.query('select * from users where user_id = "'+userphone+'";', function (err, rows, fields) {
        if (!err) {
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
                if(JSON.stringify(rows)== "[]"){
                    results.result = "empty"
                }else{
                        results.result = "exist"
                        results.password = rows[0].user_pw
                        results.farmcode = rows[0].farm_code
                        results.farmstate = rows[0].farm_state
                        results.username = rows[0].user_name
                }
                // console.log(rows[0])
            res.send(results);
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
}
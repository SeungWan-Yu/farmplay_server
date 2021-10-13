var mysqlDB = require('../../mysql-db');

// module.exports.get = ( req,res,next) => {
//     mysqlDB.query('select * from beehive', function (err, rows, fields) {
//         if (!err) {
//             var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
//                 'fields : ' + JSON.stringify(fields);
//             res.send(JSON.stringify(rows));
//         } else {
//             console.log('query error : ' + err);
//             res.send(err);
//         }
//     });
// }

module.exports.get = ( req,res,next) => {
    mysqlDB.query('select * from beebox', function (err, rows, fields) {
        if (!err) {
            // console.log(rows);
            // console.log(fields);
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
            res.send(rows);
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });


        const result = {
            result : "success"
        }

        // return res.send(beebox)
}

module.exports.post = ( req,res,next) => {

    const results = {
        result : ""
    }

    mysqlDB.query('delete from beebox where name = "'+req.body.name+'";', function (err, rows, fields) {
        if (!err) {
            mysqlDB.query('delete from thdata where name = "'+req.body.name+'";', function (err, rows, fields) {
                if (!err) {
                    mysqlDB.query('delete from door where name = "'+req.body.name+'";', function (err, rows, fields) {
                        if (!err) {
                            // console.log(rows);
                            // console.log(fields);
                            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                                'fields : ' + JSON.stringify(fields);
                                results.result = "success"
                            res.send(results);
                        } else {
                            console.log('query error : ' + err);
                            res.send(err);
                        }
                    });
                } else {
                    console.log('query error : ' + err);
                    res.send(err);
                }
            });
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
}


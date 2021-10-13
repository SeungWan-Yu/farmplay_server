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

    mysqlDB.query('insert into beebox (name,token,temp,humi,batt,net) values ("'+req.body.name+'","'+req.body.token+'",0,0,0,0);', function (err, rows, fields) {
        if (!err) {
            mysqlDB.query('insert into thdata values ("'+req.body.name+'",30,0,70,30);', function (err, rows, fields) {
                if (!err) {
                    mysqlDB.query('insert into door values ("open","open","open","open","'+req.body.name+'");', function (err, rows, fields) {
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


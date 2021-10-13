var mysqlDB = require('../../mysql-db');

module.exports.get = ( req,res,next) => {
    mysqlDB.query('select * from door', function (err, rows, fields) {
        if (!err) {
            // console.log(rows);
            // console.log(fields);
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
            res.send(rows[0]);
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
}

module.exports.post = ( req,res,next) => {

    console.log(req.body);

    const door = {
        door:"",
        value:""
    }

    mysqlDB.query('update door set door1 = "'+req.body.door1+'", door2 = "'+req.body.door2+'",door3 = "'+req.body.door3+'",door4 = "'+req.body.door4+'" where name = "'+req.body.name+'";' , function (err, rows, fields) {
        if (!err) {
            console.log(rows);
            mysqlDB.query('select * from door where name ='+req.body.name+';' , function (err, rows, fields) {
                if (!err) {
                    console.log(rows);
                    // console.log(fields);
                    var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                        'fields : ' + JSON.stringify(fields);
                    res.send(rows[0]);
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
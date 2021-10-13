var mysqlDB = require('../../mysql-db');

module.exports.get = ( req,res,next) => {
    mysqlDB.query('select if(door1,"true","false") as door1,if(door2,"true","false") as door2,if(door3,"true","false") as door3,if(door4,"true","false") as door4 from door', function (err, rows, fields) {
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
    console.log(req.body)
    mysqlDB.query('update door set door1 = '+req.body.door1+';' , function (err, rows, fields) {
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
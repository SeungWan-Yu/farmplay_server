var mysqlDB = require('../../mysql-db');

module.exports.get = ( req,res,next) => {
    mysqlDB.query('select * from farm_room_img', function (err, rows, fields) {
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
    
    const results = {
        result : ""
    }
    mysqlDB.query('select * from farm_room_img where roomImgFarmCode = '+req.body.farmcode+';', function (err, rows, fields) {
        if (!err) {
            results.result = "seuccess"
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
            res.send(JSON.stringify(rows));
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
}
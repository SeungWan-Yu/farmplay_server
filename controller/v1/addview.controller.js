var mysqlDB = require('../../mysql-db');

module.exports.get = ( req,res,next) => {
    mysqlDB.query('select * from board', function (err, rows, fields) {
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
        board_id : req.body.boardid
    }
    const results = {
        result : ""
    }
    mysqlDB.query('UPDATE board SET post_view = post_view+1 WHERE board_id = '+reqcummu.board_id+';', function (err, rows, fields) {
        if (!err) {
            results.result = "seuccess"
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
                console.log(results)
            res.send(results);
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
}
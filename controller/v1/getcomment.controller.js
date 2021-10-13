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
    mysqlDB.query('select comments_id, comm_contents, comm_date, board_id,user_phone from comments where board_id = (select board_id from board where board_id ='+reqcummu.board_id+');', function (err, rows, fields) {
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
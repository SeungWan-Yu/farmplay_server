var mysqlDB = require('../../mysql-db');

module.exports.get = ( req,res,next) => {
    mysqlDB.query('select * from comments', function (err, rows, fields) {
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
        comm_date : req.body.comm_date,
        comm_contents : req.body.comm_contents,
        board_id : req.body.board_id,
        user_phone : req.body.user_phone
    }
    const results = {
        result : ""
    }
    mysqlDB.query('insert into comments (comm_date,comm_contents,board_id,user_phone) values ("'+reqcummu.comm_date+'","'+reqcummu.comm_contents+'","'+reqcummu.board_id+'","'+reqcummu.user_phone+'");', function (err, rows, fields) {
        if (!err) {
            results.result = "seuccess"
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
                console.log(reqcummu)
            res.send(reqcummu);
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
    console.log(reqcummu)
}
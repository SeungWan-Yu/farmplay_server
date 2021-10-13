var mysqlDB = require('../../mysql-db');
module.exports.post = ( req,res,next) => {
    const result = 
        {
            result : "성공",
            htem : req.body.htem
        }

        mysqlDB.query('select * from thdata where name = "'+req.body.name+'";', function (err, rows, fields) {
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
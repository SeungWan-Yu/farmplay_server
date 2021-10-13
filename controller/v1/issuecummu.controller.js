var mysqlDB = require('../../mysql-db');

module.exports.get = ( req,res,next) => {
    mysqlDB.query('select*from board order by post_view desc;', function (err, rows, fields) {
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
        title : req.body.title,
        main : req.body.main,
        date : req.body.date,
        phone : req.body.phone
    }
    const results = {
        result : ""
    }
    mysqlDB.query('insert into board (post_date,post_title,post_contents,user_phone,post_view,post_like) values ("'+reqcummu.date+'","'+reqcummu.title+'","'+reqcummu.main+'","'+reqcummu.phone+'",0,0);', function (err, rows, fields) {
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
}
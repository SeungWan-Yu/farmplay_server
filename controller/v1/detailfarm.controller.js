var mysqlDB = require('../../mysql-db');

module.exports.get = ( req,res,next) => {
    mysqlDB.query('select * from farm where farmRecruitState = 0', function (err, rows, fields) {
        if (!err) {
            console.log(rows);
            console.log(fields);
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
            res.send(JSON.stringify(rows));
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });

    // const marker = [
    //     {
    //         name : "전주시청",
    //         contents:"전라북도 전주시 완산구 서노송동 노송광장로 10",
    //         latitude : 35.82430626863803,
    //         longitude : 127.14801122677846
    //     },
    //     {
    //         name : "호남제일문",
    //         contents:"전라북도 전주시 덕진구 여의동",
    //         latitude : 35.86960842055048,
    //         longitude : 127.07083583144886
    //     },
    //     {
    //         name : "전주 월드컵 경기장",
    //         contents:"전라북도 전주시 덕진구 조촌동 기린대로 1055",
    //         latitude : 35.86827358315628,
    //         longitude : 127.06444778409082
    //     },
    //     {
    //         name : "전북 테크노파크",
    //         contents:"전라북도 전주시 덕진구 팔복동2가 반룡로 110-5",
    //         latitude : 35.859705494380165,
    //         longitude : 127.08290981292653
    //     },
    // ]
//     console.log(marker)
//     res.send(marker)
}

module.exports.post = ( req,res,next) => {
    var results = {
        result : ""
    }
    mysqlDB.query('select * from farm where farmName = "'+req.body.farmname+'";', function (err, rows, fields) {
        if (!err) {
            console.log(rows);
            console.log(fields);
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
                results.result = "success"
            res.send(rows[0]);
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
  
}
var mysqlDB = require('../../mysql-db');

module.exports.get = ( req,res,next) => {
    // mysqlDB.query('select * from tourinfo', function (err, rows, fields) {
    //     if (!err) {
    //         console.log(rows);
    //         console.log(fields);
    //         var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
    //             'fields : ' + JSON.stringify(fields);
    //         res.send(JSON.stringify(rows));
    //     } else {
    //         console.log('query error : ' + err);
    //         res.send(err);
    //     }
    // });

    const marker = [
        {
            name : "대성 폭포",
            contents:"전라북도 전주시 덕진구 반룡로 109 A동",
            latitude : 35.82430626863803,
            longitude : 127.14801122677846,
            like : 10
        },
        {
            name : "대성사",
            contents:"전라북도 전주시 덕진구 반룡로 109 B동",
            latitude : 35.82430626863803,
            longitude : 127.14801122677846,
            like : 12
        }
    ]
    console.log(marker)
    res.send(marker)
}

module.exports.post = ( req,res,next) => {
    const signupuser = {
        phone : req.body.phone,
        password : req.body.password,
        token : req.body.token
    }
    // mysqlDB.query('insert into user values ("'+signupuser.phone+'","'+signupuser.password+'","'+signupuser.token+'");', function (err, rows, fields) {
    //     if (!err) {
    //         console.log(rows);
    //         console.log(fields);
    //         var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
    //             'fields : ' + JSON.stringify(fields);
    //         res.send(JSON.stringify(rows));
    //     } else {
    //         console.log('query error : ' + err);
    //         res.send(err);
    //     }
    // });
    const farm = [
        {
            date : "2021-05-27 11:30:00",
            title : "농약 살포",
            content : "농약 뿌릴 예정이요"
        },{
            date : "2021-05-27 11:30:00",
            title : "농약 살포",
            content : "농약 뿌릴 예정이요"
        },{
            date : "2021-05-27 11:30:00",
            title : "농약 살포",
            content : "농약 뿌릴 예정이요"
        }
    ]

    if(req.body.itemname == "전주시청"){
        res.send(farm)
    }else{

    }
}
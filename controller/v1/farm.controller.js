var mysqlDB = require('../../mysql-db');

module.exports.get = ( req,res,next) => {
    mysqlDB.query('select * from farm where farmstate = "등록완료"', function (err, rows, fields) {
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

    console.log(req)
    
    var results = {
        result : ""
    }
    mysqlDB.query('insert into farm (farmName,farmStartOpen,farmProduce,farmType,farmerIntro,farmAddr,farmAddrDetail,farmRoomInternet,farmRoomSite,farmRoomInfo,farmRoom,farmRoomUnisex,farmRoomEtc,username) values ("'
    +req.body.farmname+'","'+req.body.farmbegin+'","'+req.body.farmcrop+'","'+req.body.farmform+
    '","'+req.body.farmerinfo+'","'+req.body.farmadress+'","'+req.body.adressdetail+'","'+req.body.internet+'","'+req.body.roomadress+'","'+req.body.roominfo+'","'+req.body.room+'","'+req.body.roompublic+
    '","'+req.body.roometc+'","'+req.body.username+'");', function (err, rows, fields) {
        if (!err) {
            console.log(rows);
            console.log(fields);
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
                results.result = "success"
            res.send(results);
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
  
}
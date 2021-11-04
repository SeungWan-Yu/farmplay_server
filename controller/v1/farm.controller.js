var mysqlDB = require('../../mysql-db');
const farmModel = require("../../models/v1/farmModel");


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
        result : "",
        farmcode : 0
    }
    mysqlDB.query('insert into farm (farmName,farmStartOpen,farmProduce,farmType,farmerIntro,farmAddr,farmAddrDetail,farmRoomInternet,farmRoomSite,farmRoomInfo,farmRoom,farmRoomUnisex,farmRoomEtc,username) values ("'
    +req.body.farmname+'","'+req.body.farmbegin+'","'+req.body.farmcrop+'","'+req.body.farmform+
    '","'+req.body.farmerinfo+'","'+req.body.farmadress+'","'+req.body.adressdetail+'","'+req.body.internet+'","'+req.body.roomadress+'","'+req.body.roominfo+'","'+req.body.room+'","'+req.body.roompublic+
    '","'+req.body.roometc+'","'+req.body.username+'");', function (err, rows, fields) {
        if (!err) {
            // console.log(rows);
            // console.log(fields);
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
                results.result = "success"
                results.farmcode = rows.insertId
            console.log(results)
            res.send(results);
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
  
}


module.exports.farmUpdate = ( req,res,next) => {
    console.log("업데이트화면")
    var farm = req.body
    console.log(req)
    
    var results = {
        result : ""
    }
    var sql = "UPDATE farm SET farmState='신청중', farmAskDate=NOW(), farmRegDate='', farmImg='', farmName=?, farmStartOpen=?, farmProduce=?, farmType=?, farmerIntro=?, farmAddr=?, farmAddrDetail=?, farmRoomInternet=?, farmRoomSite=?, farmRoomInfo=?,farmRoom=?,farmRoomUnisex=?,farmRoomEtc=?,userName=? WHERE farmCode=?"

    var params1 = [farm.farmname,farm.farmbegin,farm.farmcrop,farm.farmform,farm.farmerinfo,farm.farmadress,farm.adressdetail,
    farm.internet,farm.roomadress,farm.roominfo,farm.room,farm.roompublic,farm.roometc,farm.username,farm.farmCode  
    ]

    mysqlDB.query(sql,params1, function (err, rows, fields) {
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



exports.getEnterList = function (req, res) {
    console.log("팜컨트롤러 전근영");
    var query = req.query
    console.log("받아온 리퀘스트값>>>");
    console.log(query);
    farmModel.getEnterList(query).then(function(data){
        console.log("성공");
        console.log(data);
        res.send(data);
    }).catch(function(err){
        console.log("캐치에러");``
        console.log(err);
    });

}

exports.getRecruitList = function (req, res) {
    console.log("팜컨트롤러 전근영");
    var query = req.query
    console.log("받아온 리퀘스트값>>>");
    console.log(query);
    farmModel.getEnterList(query).then(function(data){
        console.log("성공");
        console.log(data);
        res.send(data);
    }).catch(function(err){
        console.log("캐치에러");``
        console.log(err);
    });

}
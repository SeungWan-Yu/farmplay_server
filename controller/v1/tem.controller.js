var mysqlDB = require('../../mysql-db');

module.exports.get = (req, res, next) => {
    mysqlDB.query('select * from tem order by time desc', function (err, rows, fields) {
        if (!err) {
            // console.log(rows);
            // console.log(fields);
            var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                'fields : ' + JSON.stringify(fields);
            res.send(rows);
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });
}

module.exports.post = (req, res, next) => {

    // console.log(req.body);

    const tem = {
        tem: parseFloat(req.body.temp),
        humi: parseFloat(req.body.humi),
        batt: parseFloat(req.body.batt),
        name: req.body.name
    }

    const thdata = {
        htemp: 0,
        ltemp: 0,
        hhumi: 0,
        lhumi: 0
    }

    const beebox = {

    }

    var now = new Date();
    var date = now.toString()

    console.log(tem);

    //select count(*) as count from beebox where name
    mysqlDB.query('select * from thdata where name = "'+req.body.name+'"', function (err, rows, fields) {
        if (!err) {
            
            if(rows[0] == null){
                res.send("등록되지 않은 기기 입니다.")
            }else if(rows[0].state == 0){
                //업데이트 beebox데이터
                mysqlDB.query('update beebox set temp = ' + tem.tem + ', humi = ' + tem.humi + ', batt = ' + tem.batt + ', net = 1, datetest = "'+now+'" where name = "' + tem.name + '";', function (err, rows, fields) {
                    if (!err) {
                        // console.log(rows);
                        // console.log(fields);
                        var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                            'fields : ' + JSON.stringify(fields);
                        res.send(rows);
                    } else {
                        console.log('query error : ' + err);
                        res.send(err);
                    }
                });
            
                //온습도 데이터 삽입
                mysqlDB.query('insert into tem (tem,humi,name,batt) values(' + tem.tem + ',' + tem.humi + ',' + tem.name + ',' + tem.batt + ');', function (err, rows, fields) {
                    if (!err) {
                        console.log(rows);
                        // console.log(fields);
                        var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                            'fields : ' + JSON.stringify(fields);
                        // res.send(rows);
                    } else {
                        console.log('query error : ' + err);
                        res.send(err);
                    }
                });

                //요약 온습도 데이터 삽입
                // if(date.substring(19,25) == "00:00"){
                //     mysqlDB.query('insert into summarytem (tem,hum,time,name) values(' + tem.tem + ',' + tem.humi + ',' + date.substring(19,25) + ',' + tem.name +');', function (err, rows, fields) {
                //         if (!err) {
                //             console.log(rows);
                //             // console.log(fields);
                //             var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                //                 'fields : ' + JSON.stringify(fields);
                //             // res.send(rows);
                //         } else {
                //             console.log('query error : ' + err);
                //             res.send(err);
                //         }
                //     });
                // }
            }else{
                mysqlDB.query('select * from thdata where name = "' + req.body.name + '";', function (err, rows, fields) {
                    if (!err) {
                        // console.log(rows);
                        // console.log(fields);
                        var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                            'fields : ' + JSON.stringify(fields);
                        thdata.htemp = rows[0].htemp
                        thdata.ltemp = rows[0].ltemp
                        thdata.hhumi = rows[0].hhumi
                        thdata.lhumi = rows[0].lhumi
                        console.log(thdata)
                        //온습도 연동 처리 코드
                        if (tem.tem >= thdata.htemp) {
                            console.log(tem.tem + ">=" + thdata.htemp)
                            //설정 최대 온도보다 현재 온도가 더 높은 경우 -- 개방
                            mysqlDB.query('update door set door1 = "open", door2 = "open",door3 = "open",door4 = "open" where name = "' + req.body.name + '";', function (err, rows, fields) {
                                if (!err) {
                                    // console.log(rows);
                                } else {
                                    console.log('query error : ' + err);
                                    res.send(err);
                                }
                            });
                        } else if (tem.tem <= thdata.ltemp) {
                            console.log("2")
                            //설정 최저 온도보다 현재 온도가 더 낮은 경우 -- 닫기
                            mysqlDB.query('update door set door1 = "close", door2 = "close",door3 = "close",door4 = "close" where name = "' + req.body.name + '";', function (err, rows, fields) {
                                if (!err) {
                                    // console.log(rows);
                                } else {
                                    console.log('query error : ' + err);
                                    res.send(err);
                                }
                            });
                        } else if (tem.humi >= thdata.hhumi) {
                            console.log("3")
                            //설정 최대 습도보다 현재 습도가 더 높은 경우 -- 개방
                            mysqlDB.query('update door set door1 = "open", door2 = "open",door3 = "open",door4 = "open" where name = "' + req.body.name + '";', function (err, rows, fields) {
                                if (!err) {
                                    // console.log(rows);
                                } else {
                                    console.log('query error : ' + err);
                                    res.send(err);
                                }
                            });
                        } else if (tem.humi <= thdata.lhumi) {
                            console.log("4")
                            //설정 최저 습도보다 현재 습도가 더 낮은 경우 -- 닫기
            
                            mysqlDB.query('update door set door1 = "close", door2 = "close",door3 = "close",door4 = "close" where name = "' + req.body.name + '";', function (err, rows, fields) {
                                if (!err) {
                                    // console.log(rows);
                                } else {
                                    console.log('query error : ' + err);
                                    res.send(err);
                                }
                            });
                        }
                        // res.send(rows[0]);
                    } else {
                        console.log('query error : ' + err);
                        res.send(err);
                    }
                });
            
                //업데이트 beebox데이터
                mysqlDB.query('update beebox set temp = ' + tem.tem + ', humi = ' + tem.humi + ', batt = ' + tem.batt + ', net = 1, datetest = "'+now+'" where name = "' + tem.name + '";', function (err, rows, fields) {
                    if (!err) {
                        // console.log(rows);
                        // console.log(fields);
                        var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                            'fields : ' + JSON.stringify(fields);
                        // res.send(rows);
                    } else {
                        console.log('query error : ' + err);
                        res.send(err);
                    }
                });
            
                //온습도 데이터 삽입
                mysqlDB.query('insert into tem (tem,humi,name,batt) values(' + tem.tem + ',' + tem.humi + ',' + tem.name + ',' + tem.batt + ');', function (err, rows, fields) {
                    if (!err) {
                        console.log(rows);
                        // console.log(fields);
                        var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                            'fields : ' + JSON.stringify(fields);
                        res.send(rows);
                    } else {
                        console.log('query error : ' + err);
                        res.send(err);
                    }
                });

                //요약 온습도 데이터 삽입
                // if(date.substring(19,25) == "00:00"){
                //     mysqlDB.query('insert into summarytem (tem,hum,time,name) values(' + tem.tem + ',' + tem.humi + ',' + date.substring(19,25) + ',' + tem.name +');', function (err, rows, fields) {
                //         if (!err) {
                //             console.log(rows);
                //             // console.log(fields);
                //             var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
                //                 'fields : ' + JSON.stringify(fields);
                //             // res.send(rows);
                //         } else {
                //             console.log('query error : ' + err);
                //             res.send(err);
                //         }
                //     });
                // }
            }
        } else {
            console.log('query error : ' + err);
            res.send(err);
        }
    });

    // setTimeout(() => {
    //     mysqlDB.query('select datetest from beebox where name = '+req.body.name+';', function (err, rows, fields) {
    //         if (!err) {
    //             var result = 'rows : ' + JSON.stringify(rows) + '<br><br>' +
    //                 'fields : ' + JSON.stringify(fields);
    //                 if(rows[0].datetest == now){
    //                     mysqlDB.query('update beebox set net=0 where name = '+req.body.name+'')
    //                 }
    //         } else {
    //             console.log('query error : ' + err);
    //             res.send(err);
    //         }
    //     });
    // }, 5000);
}
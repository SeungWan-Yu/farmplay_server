var con = require('../../mysql-db');
const mysql2  = require('mysql2/promise');
const db = {
    host     : 'localhost',    // 호스트 주소
    post: 3306,
    user     : 'dshive',           // mysql user
    password : 'dshive!@#$',       // mysql password
    database : 'farmplay', 
    dateStrings: 'date',      // mysql 데이터베이스
    multipleStatements: true  ,
  }

module.exports = {
    
    getFarmList : function(){
        return new Promise((resolve,reject) =>{
            console.log("결과1>>"+con)
            con.query("SELECT farmCode, farmState, farmAskDate, farmRegDate, farmImg, farmName, farmStartOpen, farmProduce, farmType, farmerIntro, farmAddr, farmAddrDetail, farmRoomInternet, farmRoomSite, farmRoomInfo, farmRoom, farmRoomUnisex, farmRoomEtc, userName FROM farm WHERE farmState ='등록완료'" , 
            function (err, result, fields) {
                if(err){
                    reject(err)
                }else{
                    console.log("결과>>"+result)
                    resolve(result)
                }
            });
        });
    },

    getFarmRoomImgList : function(farmCode){
        return new Promise((resolve,reject) =>{                
            con.query("SELECT roomImgCode, roomImgFarmCode, roomImgUrl FROM farm_room_img WHERE roomImgFarmCode = "+farmCode+"", 
            function (err, result, fields) {
                if(err){
                    reject(err)
                }else{
                    console.log("결과>>"+result)
                    resolve(result)
                }
            });
        });
    },

    delFarmRoomImgList : function(roomImgCode){
        return new Promise((resolve,reject) =>{
            console.log("결과1>>"+roomImgCode)     
            console.log("결과1>>"+con)
            con.query("DELETE FROM farm_room_img WHERE roomImgCode = "+roomImgCode+"", 
            function (err, result, fields) {
                if(err){
                    reject(err)
                }else{
                    console.log("결과>>"+result)
                    resolve(result)
                }
            });
        });
    },

   
      
            
            
    //********** mysql 일 경우 transaction *************/
    // delFarm : function(farmCode){
    //     return new Promise((resolve,reject) =>{
    //         const con = mysql.createConnection(db);
    //         var cnt = 0;        //에러발생 체크
    //         con.connect();
    //         console.log("콘시작")
    //         con.beginTransaction(function(err){
    //             if (err) { throw err; }
    //             con.query("DELETE FROM farm_room_img WHERE roomImgFarmCode = ?",farmCode,function(err,result){
    //                 if(err){
    //                     reject(err);
    //                     cnt++;
    //                     con.rollback();
    //                 }
    //                 console.log("결과1>>"+result);
                    
    //                 con.query("DELETE FROM tb_farm WHERE farmName= "+farmCode+"",function(err,result){
    //                     if(err){
    //                         reject(err);
    //                         cnt++;
    //                         con.rollback();
    //                     }
    //                     con.commit(function(err,result1){
    //                         if(err){
    //                             cnt++;
    //                             reject(err);
    //                             con.rollback();
    //                         }
    //                         if(cnt==0){
    //                             resolve(result1);
    //                         }
    //                         console.log("완료");
    //                         con.end();
    //                     });
    //                 });
    //             });
    //         });
    //     });
 
    // },


    //************mysql2 일 경우 transaction ***********/
    delFarm :async function(farmCode){
        const pool = mysql2.createPool(db);
        const connection = await pool.getConnection(async conn=>conn);
        
        try{
            await connection.beginTransaction();
            var r1 = await connection.query("DELETE FROM farm_room_img WHERE roomImgFarmCode = ?",farmCode);
            console.log("r1>>"+r1);
            var r2 = await connection.query("DELETE FROM farm WHERE farmCode= ? ",farmCode);
            console.log("r2>>"+r2);
            await connection.commit();
            console.log("트랜잭션성공");
        }catch(err){
            console.log("에러발생");
            await connection.rollback(); 
            throw err;
        }finally{
            connection.release();
        }

    },

    getOneFarm : function(farmCode){
        return new Promise((resolve,reject) =>{
            con.query("SELECT farmCode, farmState, farmAskDate, farmRegDate, farmImg, farmName, farmStartOpen, farmProduce, farmType, farmerIntro, farmAddr, farmAddrDetail, farmRoomInternet, farmRoomSite, farmRoomInfo, farmRoom, farmRoomUnisex, farmRoomEtc, userName FROM farm WHERE farmCode =?", farmCode,
            function (err, result, fields) {
                if(err){
                    reject(err)
                }else{
                    console.log("결과>>"+result)
                    resolve(result)
                }
            });
        });
    },


    updateFarm :async function(farm,roomImg,dRoomImgList){
        console.log("모델삭제리스트");
        console.log(dRoomImgList);
        const pool = mysql2.createPool(db);
        const connection = await pool.getConnection(async conn=>conn);
        
        try{
            await connection.beginTransaction();
            var sql1 = "UPDATE farm SET  farmName=?, farmStartOpen=?, farmProduce=?, farmType=?, farmerIntro=?, farmAddr=?, farmAddrDetail=?,farmRoomInternet=?,farmRoomSite=?,farmRoomInfo=?,farmRoom=?,farmRoomUnisex=?,farmRoomEtc=?,userName=?,farmState=?,farmImg=? WHERE farmCode= ?";

            //1.수정내용 없데이트
            var params1 = [farm.farmName,farm.farmStartOpen,farm.farmProduce,farm.farmType,farm.farmerIntro,farm.farmAddr,farm.farmAddrDetail,farm.farmRoomInternet,farm.farmRoomSite,farm.farmRoomInfo,farm.farmRoom,farm.farmRoomUnisex,farm.farmRoomEtc,farm.userName,farm.farmState,farm.farmImg,farm.farmCode];
            var r1 = await connection.query(sql1,params1);
            
            //2. 숙소이미지 추가될경우 추가 인서트
            var staticUrl  ="/public/uploads/";
            if(roomImg!=null){
                for(var i=0; i<roomImg.length;i++){
                    var sql2 = "INSERT INTO farm_room_img (roomImgFarmCode, roomImgUrl) VALUES ( ?, ?)";
                    var params2 = [farm.farmCode,staticUrl+roomImg[i].filename];
                    var r2 = await connection.query(sql2,params2);
                }
            }

            //3. 숙소이미지 삭제될 경우 삭제 
            if(dRoomImgList.length>0){
                var sql3 = "DELETE FROM farm_room_img WHERE roomImgCode IN ("+dRoomImgList+")";
                var r3 = await connection.query(sql3);    
            }
            
            await connection.commit();
            console.log("트랜잭션 성공");
           
        }catch(err){
            console.log("모델에러발생");
            await connection.rollback();
            throw err;
        }finally{
            connection.release();
        }
       
    
    },


    getFarmAskList : function(){
        return new Promise((resolve,reject) =>{     
            console.log("결과1>>"+con)
            con.query("SELECT farmCode, farmState, farmAskDate, farmRegDate, farmImg, farmName, farmStartOpen, farmProduce, farmType, farmerIntro, farmAddr, farmAddrDetail, farmRoomInternet, farmRoomSite, farmRoomInfo, farmRoom, farmRoomUnisex, farmRoomEtc, userName FROM farm WHERE farmState ='신청중'" , 
            function (err, result, fields) {
                if(err){
                    reject(err)
                }else{
                    console.log("결과>>"+result)
                    resolve(result)
                }
            });
        });
    },

    UpdateFarmConfirm : function(farmCodeList){
        return new Promise((resolve,reject) =>{          
            console.log("결과1>>"+con)
            con.query("UPDATE farm SET farmState='등록완료' WHERE farmCode IN("+farmCodeList+")", 
            function (err, result, fields) {
                if(err){
                    reject(err)
                }else{
                    console.log("결과>>"+result)
                    resolve(result)
                }
            }); 
        });
    },


    getFarmRoomImgCnt : function(farmCode){
        return new Promise((resolve,reject) =>{        
            console.log("결과1>>"+con)
            con.query("SELECT COUNT(roomImgCode)  AS cnt FROM farm_room_img WHERE roomImgFarmCode = ?",farmCode, 
            function (err, result, fields) {
                if(err){
                    reject(err)
                }else{
                    console.log("결과>>"+result)
                    resolve(result)
                }
            });
        });
    },

    getRoomImgUrl : function(dRoomImgList){
        console.log("모델이미지리스트>>"+dRoomImgList);
        return new Promise((resolve,reject) =>{
            con.query("SELECT roomImgUrl FROM farm_room_img WHERE roomImgCode IN ("+dRoomImgList+")", 
            function (err, result, fields) {
                if(err){
                    reject(err)
                }else{
                    console.log(result);
                    console.log("결과>>"+result);
                    resolve(result)
                }
            });
        });
    },



}

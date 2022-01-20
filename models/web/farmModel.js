const pool = require('../../configs/mysql2-db');


module.exports = {
    getFarmList :async function(){
        
        const connection = await pool.getConnection();
        try{
            var sql1 = "SELECT farmCode, farmState, farmAskDate, farmRegDate, farmImg, farmName, farmStartOpen, farmProduce, farmType, farmerIntro, farmAddr, farmAddrDetail, farmRoomInternet, farmRoomSite, farmRoomInfo, farmRoom, farmRoomUnisex, farmRoomEtc, userName FROM farm WHERE farmState ='등록완료'";
            var [rows] = await connection.query(sql1);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getFarmRoomImgList :async function(farmCode){
        const connection = await pool.getConnection();
        try{
            var sql1 = "SELECT roomImgCode, roomImgFarmCode, roomImgUrl FROM farm_room_img WHERE roomImgFarmCode = ?";
            var param1 = [farmCode];
            var [rows] = await connection.query(sql1,param1);
            console.log("결과값");
            return rows;
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
    },

    delFarmRoomImgList :async function(roomImgCode){
        const connection = await pool.getConnection();
        try{
            var sql1 = "DELETE FROM farm_room_img WHERE roomImgCode = ?";
            var param1 = [roomImgCode];
            var [rows] = await connection.query(sql1,param1);
            console.log("결과값");
            return rows;
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
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
        const connection = await pool.getConnection();
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

    getOneFarm :async function(farmCode){
        const connection = await pool.getConnection();
        try{
            var sql1 = "SELECT farmCode, farmState, farmAskDate, farmRegDate, farmImg, farmName, farmStartOpen, farmProduce, farmType, farmerIntro, farmAddr, farmAddrDetail, farmRoomInternet, farmRoomSite, farmRoomInfo, farmRoom, farmRoomUnisex, farmRoomEtc, userName FROM farm WHERE farmCode =?";
            var param1 = [farmCode];
            var [rows] = await connection.query(sql1,param1);
            console.log("결과값");
            return rows;
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
    },


    updateFarm :async function(farm,roomImg,dRoomImgList){
        console.log("모델삭제리스트");
        console.log(dRoomImgList);
        const connection = await pool.getConnection();
        try{
            await connection.beginTransaction();
            var sql1 = "UPDATE farm SET  farmName=?, farmStartOpen=?, farmProduce=?, farmType=?, farmerIntro=?, farmAddr=?, farmAddrDetail=?,farmRoomInternet=?,farmRoomSite=?,farmRoomInfo=?,farmRoom=?,farmRoomUnisex=?,farmRoomEtc=?,userName=?,farmState=?,farmImg=? WHERE farmCode= ?";

            //1.수정내용 없데이트
            var params1 = [farm.farmName,farm.farmStartOpen,farm.farmProduce,farm.farmType,farm.farmerIntro,farm.farmAddr,farm.farmAddrDetail,farm.farmRoomInternet,farm.farmRoomSite,farm.farmRoomInfo,farm.farmRoom,farm.farmRoomUnisex,farm.farmRoomEtc,farm.userName,farm.farmState,farm.farmImg,farm.farmCode];
            var r1 = await connection.query(sql1,params1);
            
            //2. 숙소이미지 추가될경우 추가 인서트
           
            if(roomImg!=null){
                for(var i=0; i<roomImg.length;i++){
                    var sql2 = "INSERT INTO farm_room_img (roomImgFarmCode, roomImgUrl) VALUES ( ?, ?)";
                    var params2 = [farm.farmCode,roomImg[i].filename];
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

    getFarmAskList :async function(){
        const connection = await pool.getConnection();
        try{
            var sql1 = "SELECT farmCode, farmState, farmAskDate, farmRegDate, farmImg, farmName, farmStartOpen, farmProduce, farmType, farmerIntro, farmAddr, farmAddrDetail, farmRoomInternet, farmRoomSite, farmRoomInfo, farmRoom, farmRoomUnisex, farmRoomEtc, userName FROM farm WHERE farmState ='신청중'";
            var [rows] = await connection.query(sql1);
            console.log("결과값");
            return rows;
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
    },

    UpdateFarmConfirm :async function(farmCodeList,userId){
        const connection = await pool.getConnection();
        await connection.beginTransaction();
        try{
           
            var params = [userId];
            var [r] = await connection.query("SELECT userToken FROM users WHERE userId =?",params);   

            var r1 = await connection.query("SELECT IFNULL(userFarmCode,0) AS userFarmCode FROM users WHERE userId =?",userId);
            var result1  = r1[0][0].userFarmCode;
            console.log(result1);
            console.log("r1>>"+r1);
   
            var params2 = [farmCodeList,userId];
            var r2 = await connection.query("UPDATE users SET userFarmCode=? ,userFarmState=2 WHERE userId=?",params2);
            console.log("r2>>"+r2);
            
            var r3 = await connection.query("UPDATE farm SET farmState='등록완료',farmRegDate=NOW() WHERE farmCode IN("+farmCodeList+")");
            console.log("r3>>"+r3);
            await connection.commit();
            console.log("트랜잭션성공");
            return r;
        }catch(err){
            console.log("에러발생 롤백");
            console.log(err);
            await connection.rollback();
            throw err;
        }finally{
            connection.release();
        }

        // return new Promise((resolve,reject) =>{          
        //     console.log("결과1>>"+con)
        //     con.query("UPDATE farm SET farmState='등록완료' WHERE farmCode IN("+farmCodeList+")", 
        //     function (err, result, fields) {
        //         if(err){
        //             reject(err)
        //         }else{
        //             console.log("결과>>"+result)
        //             resolve(result)
        //         }
        //     }); 
        // });
    },


    getFarmRoomImgCnt :async function(farmCode){
        const connection = await pool.getConnection();
        try{
            var sql1 = "SELECT COUNT(roomImgCode)  AS cnt FROM farm_room_img WHERE roomImgFarmCode = ?";
            var param1 = [farmCode];
            var [rows] = await connection.query(sql1,param1);
            console.log("결과값");
            return rows;
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
    },

    getRoomImgUrl :async function(dRoomImgList){
        const connection = await pool.getConnection();
        try{
            var sql1 = "SELECT roomImgUrl FROM farm_room_img WHERE roomImgCode IN (?)";
            var param1 = [dRoomImgList];
            var [rows] = await connection.query(sql1,param1);
            console.log("결과값");
            return rows;
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
    },



}

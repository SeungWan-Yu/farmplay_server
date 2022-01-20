const pool = require('../../configs/mysql2-db');
const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/v1/farm.xml']);


//List는 rows , List아닐 경우 rows[0]

module.exports = {

    getFarmRecruitEnterList :async function(enterUserId){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('farmMapper','getFarmRecruitEnterList',enterUserId,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getFarmRecruitList :async function(farmCode){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('farmMapper','getFarmRecruitList',farmCode,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getRoomImgListFarmCode :async function(farmCode){
        console.log("팜코드체크")
        console.log(farmCode);
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('farmMapper','getRoomImgListFarmCode',farmCode,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },
    

    getFarmUser : async function(userId){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('farmMapper','getFarmUser',userId,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows[0];
    },

    getFarm : async function(farmcode){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('farmMapper','getFarm',farmcode,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },
    
    getFarmImg : async function(farmCode){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('farmMapper','getFarmImg',farmCode,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },
    
    getFarmRoomImg : async function(farmcode){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('farmMapper','getFarmRoomImg',farmcode,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getFarmCheck : async function(userId){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('farmMapper','getFarmCheck',userId,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getFarmList : async function(body){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('farmMapper','getFarmList',body);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    addFarm : async function(farm,roomImg){
        console.log("팜체크");
        console.log
        const connection = await pool.getConnection();
        var rows = [];
        try{
            await connection.beginTransaction();
            var q1 = mybatisMapper.getStatement('farmMapper','addFarm',farm,format);    //농가등록
            var [r1] = await connection.query(q1);
            console.log("팜코드확인");
            //roomImgMap.farmCode = r1.insertId;

            /*** 농가이미지 리스트맵 만들기  ***/
            var roomImgMap = {};                    
            var roomImgList = [];
            for(var i in roomImg){
                var roomImgListMap = {};
                roomImgListMap.farmCode = r1.insertId;
                roomImgListMap.roomImgUrl = roomImg[i].filename;
                roomImgList.push(roomImgListMap);
            }    
            roomImgMap.roomImgList = roomImgList;
            console.log(roomImgMap);
            if(r1.affectedRows!=1){
                await connection.rollback();
                throw Error("affectedRows");
            }else{
                console.log("리스트 확인");
                var q2 = mybatisMapper.getStatement('farmMapper','addFarmRoomImg',roomImgMap,format);    //숙소이미지등록
                var [r2] = await connection.query(q2);
                console.log("r2찍어보깅");
                if(r2.affectedRows!=roomImgList.length){
                    await connection.rollback();
                    throw Error("affectedRows");
                }else{
                    rows.push(r1);
                    rows.push(r2); 
                }
            };
            await connection.commit();
        }catch(err){
            await connection.rollback();
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    updateFarm : async function(farm,roomImgMap,roomImgDelMap){
        var rowCheck = false;
        var rows = [];
        console.log("모델체크")
        console.log(farm)
        const connection = await pool.getConnection();
       
        try{
            await connection.beginTransaction();
            //농장정보 업데이트
            var q1 = mybatisMapper.getStatement('farmMapper','updateFarm',farm,format);
            console.log("쿼리체크");
            console.log(q1)
            var [r1] = await connection.query(q1);
            console.log("r1체크");
            console.log(r1);
            if(r1.changedRows!=1){
                rowCheck = true;
            }else{
                rows.push(r1);
            }
            //농장 추가된 사진이 있다면 등록
            if(roomImgMap.roomImgList!=undefined){
                var q2 = mybatisMapper.getStatement('farmMapper','addFarmRoomImg',roomImgMap,format);    //숙소이미지등록
                console.log("쿼리체크2")
                console.log(q2)
                var [r2] = await connection.query(q2);
                if(r2.affectedRows!=roomImgMap.roomImgList.length){
                    rowCheck = true;
                }else{
                    rows.push(r2);
                }
            }
            //농장 삭제된 사진이 있다면 삭제
            if(roomImgDelMap.roomImgList!=undefined){
                var q3 = mybatisMapper.getStatement('farmMapper','removeFarmRoomImg',roomImgDelMap,format);    //숙소이미지삭제
                var [r3] = await connection.query(q3);
                if(r3.affectedRows!=roomImgDelMap.roomImgList.length){
                    rowCheck = true;
                }else{
                    rows.push(r3);
                }
            }
            //유저 farmState 4으로 변경 (4은 재신청할경우)
            if(farm.farmState!="4"){
                var id = {"id":farm.userName};
                var q4 = mybatisMapper.getStatement('farmMapper','updateUserFarmState',id,format);   
                var [r4] = await connection.query(q4);
                if(r4.changedRows!=1){
                    rowCheck = true;
                }else{
                    rows.push(r4);
                }
            }
          
            if(rowCheck){
                await connection.rollback();
                throw Error("affectedRows");
            }else{
                await connection.commit();
            }
        }catch(err){
            await connection.rollback();
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

}


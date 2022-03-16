const pool = require('../../configs/mysql2-db');
const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/v1/recruit.xml']);


module.exports = {

    updateRecruitList :async function(con,map){
        try{
            var query = mybatisMapper.getStatement('recruitMapper','updateRecruitList',map);
            var [rows] = await con.query(query);
        }catch(err){
            console.log(err);
            throw err;
        }finally{
            con.release();
        }
        return rows;
    },


    getRecruitEndList :async function(con){
        try{
            var query = mybatisMapper.getStatement('recruitMapper','getRecruitEndList');
            var [rows] = await con.query(query);
        }catch(err){
            console.log(err);
            throw err;
        }finally{
            con.release();
        }
        return rows;
    },

    
    addRecruit :async function(recruit){
        const connection = await pool.getConnection();
        console.log("확인해용")
        console.log(recruit)
        try{
            var query = mybatisMapper.getStatement('recruitMapper','addRecruit',recruit,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getRecruitListId :async function(userId){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('recruitMapper','getRecruitListId',userId,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getRecruitListFarmcode :async function(farmcode){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('recruitMapper','getRecruitListFarmcode',farmcode,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getRecruit :async function(recruitcode){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('recruitMapper','getRecruit',recruitcode,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },


    updateReruit :async function(recruit){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('recruitMapper','updateReruit',recruit,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    

    updateReruitState :async function(body){
        const connection = await pool.getConnection();
        var rows = [];
        console.log("바디체크함");
        console.log(body);
        //이후 프로세스 참가수정중,참가신청중 모두 참가취소로 변경되어야 함
        try{
            await connection.beginTransaction();
            var q1 = mybatisMapper.getStatement('recruitMapper','updateReruitState',body,format);
            var [r1] = await connection.query(q1);

            var q2 = mybatisMapper.getStatement('recruitMapper','getEnterEndFarmplerList',body,format);    //참가신청중,참가수정요청 회원 찾기
            console.log("쿼리문출력");
            console.log(body);
            console.log(q2);
            var [r2] = await connection.query(q2);
            console.log("수정리스트 출력");
            console.log(r2);
            var enterMap = {};
            enterMap.enterList = r2;
            console.log(enterMap);
            rows.push(r1);
            rows.push(r2);
            if(r2.length>0){
                var q3 = mybatisMapper.getStatement('recruitMapper','updateEnterEdit',enterMap,format); 
                var [r3] = await connection.query(q3);
                rows.push(r3);
            }else{
                if(body.recruitState=="모집삭제농장"){
                    var q4 = mybatisMapper.getStatement('recruitMapper','removeRecruit',body,format); 
                    var [r4] = await connection.query(q4);
                    rows.push(r4);
                }
            }
            await connection.commit();
        }catch(err){
            await connection.rollback();
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

}

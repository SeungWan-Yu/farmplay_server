const pool = require('../../configs/mysql2-db');
const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/v1/farmpler.xml']);

module.exports = {
    

    getEnterRecruitCodeUserId : async function(con,body){
        var query = mybatisMapper.getStatement('farmplerMapper','getEnterRecruitCodeUserId',body,format);
        var [rows] = await con.query(query);
        return rows;
    },


    updateEnterListEdit : async function(con,map){
        var query = mybatisMapper.getStatement('farmplerMapper','updateEnterListEdit',map);
        var [rows] = await con.query(query);
        return rows;
    },

    getRecruitEndEnterList : async function(con,map){
        var query = mybatisMapper.getStatement('farmplerMapper','getRecruitEndEnterList',map);
        var [rows] = await con.query(query);
        return rows;
    },


    getRecruitEndEnterList : async function(con,map){
        var query = mybatisMapper.getStatement('farmplerMapper','getRecruitEndEnterList',map);
        var [rows] = await con.query(query);
        return rows;
    },

    removeFarmpler : async function(body){
        console.log("리무브 모델실행");
        var rows = [];
        const connection = await pool.getConnection();
        try{
            await connection.beginTransaction();
            var q1 = mybatisMapper.getStatement('farmplerMapper','removeFarmpler',body,format);
            var [r1] = await connection.query(q1);
            rows.push(r1);
            if(body.recruitState=="모집삭제농장"){
                console.log("모집삭제농장 삭제시작");
                console.log(body);
                var q2 = mybatisMapper.getStatement('farmplerMapper','getFarmplerListRecruit',body,format);
                var [r2] = await connection.query(q2);
                rows.push(r2);
                if(r2.length==0){
                    var q3 = mybatisMapper.getStatement('farmplerMapper','removeRecruit',body,format);
                    var [r3] = await connection.query(q3);
                    rows.push(r3);
                }

            }
            await connection.commit();
            //참가리스트 조회해서 없으면 모집삭제 해야함
        }catch(err){
            await connection.rollback();
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },


    getFarmpler : async function(enterCode){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('farmplerMapper','getFarmpler',enterCode,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getFarmplerId : async function(userId){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('farmplerMapper','getFarmplerId',userId,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    addFarmpler : async function(farmpler){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('farmplerMapper','addFarmpler',farmpler,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getFarmplerList : async function(recruitcode){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('farmplerMapper','getFarmplerList',recruitcode,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },


    updateEnterCancel :async function(body){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('farmplerMapper','updateEnterCancel',body,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows
    },

    updateEnterEdit :async function(body){
        const connection = await pool.getConnection();  
        try{
            var query = mybatisMapper.getStatement('farmplerMapper','updateEnterEdit',body,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows   
    },

    updateEnterConfirmCancelReq :async function(body){
        const connection = await pool.getConnection();  
        try{
            var query = mybatisMapper.getStatement('farmplerMapper','updateEnterConfirmCancelReq',body,format);
            console.log(query);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows   
    },

    updateEnterConfirmCancelEdit :async function(body){
        const connection = await pool.getConnection();  
        var query = mybatisMapper.getStatement('farmplerMapper','updateEnterConfirmCancelEdit',body,format);
        try{
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows   
    },

}

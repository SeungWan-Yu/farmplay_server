const con = require('../../configs/mysql2-db');
const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/v1/recruit.xml']);


module.exports = {
    
    addRecruit :async function(recruit){
        const connection = await con;
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

    getRecuritListId :async function(userId){
        const connection = await con;
        try{
            var query = mybatisMapper.getStatement('recruitMapper','getRecuritListId',userId,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getRecruitListFarmcode :async function(farmcode){
        const connection = await con;
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
        const connection = await con;
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
        const connection = await con;
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

    updateReruitState :async function(recruitcode){
        const connection = await con;
        //이후 프로세스 참가수정중,참가신청중 모두 참가취소로 변경되어야 함
        try{
            var query = mybatisMapper.getStatement('recruitMapper','updateReruitState',recruitcode,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

}

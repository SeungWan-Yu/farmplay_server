const con = require('../../configs/mysql2-db');
const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/v1/farm.xml']);


//List는 rows , List아닐 경우 rows[0]

module.exports = {

    getEnterList :async function(enterUserId){
        const connection = await con;
        try{
            var query = mybatisMapper.getStatement('farmMapper','getEnterList',enterUserId,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getRecruitList :async function(farmCode){
        const connection = await con;
        try{
            var query = mybatisMapper.getStatement('farmMapper','getRecruitList',farmCode,format);
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
        const connection = await con;
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
        const connection = await con;
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
        const connection = await con;
        try{
            var query = mybatisMapper.getStatement('farmMapper','getFarm',farmcode,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows[0];
    },

    getFarmCheck : async function(userId){
        const connection = await con;
        try{
            var query = mybatisMapper.getStatement('farmMapper','getFarmCheck',userId,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows[0];
    },

    getFarmList : async function(){
        const connection = await con;
        try{
            var query = mybatisMapper.getStatement('farmMapper','getFarmList',format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    addFarm : async function(farm){
        const connection = await con;
        try{
            var query = mybatisMapper.getStatement('farmMapper','addFarm',farm,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    updateFarm : async function(farm){
        const connection = await con;
        try{
            var query = mybatisMapper.getStatement('farmMapper','updateFarm',farm,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

}


const pool = require('../../configs/mysql2-db');
const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/v1/farmpler.xml']);

module.exports = {

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

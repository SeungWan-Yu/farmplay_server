const pool = require('../../configs/mysql2-db');
const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/v1/user.xml']);

module.exports = {

    updateUserToken :async function(body){
        const connection = await pool.getConnection();
        try{ 
            var query = mybatisMapper.getStatement('userMapper','updateUserToken',body, format);
            console.log(query);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },


    getUserToken :async function(body){
        const connection = await pool.getConnection();
        try{ 
            var query = mybatisMapper.getStatement('userMapper','getUserToken',body, format);
            console.log(query);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },


    updateUserImg :async function(body){
        const connection = await pool.getConnection();
        try{ 
            var query = mybatisMapper.getStatement('userMapper','updateUserImg',body, format);
            console.log(query);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    addCertification :async function(body){
        const connection = await pool.getConnection();
        try{ 
            var query = mybatisMapper.getStatement('userMapper','addCertification',body, format);
            console.log(query);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows[0];
    },

    updateCertification :async function(body){
        const connection = await pool.getConnection();
        try{ 
            var query = mybatisMapper.getStatement('userMapper', 'updateCertification',body, format);
            console.log(query);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows[0];
    },

    getCertificationCode :async function(userPhone){
        const connection = await pool.getConnection();
        try{ 
            var query = mybatisMapper.getStatement('userMapper', 'getCertificationCode', userPhone, format);
            console.log(query);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getCertification :async function(userPhone){
        const connection = await pool.getConnection();
        try{ 
            var query = mybatisMapper.getStatement('userMapper', 'getCertification', userPhone, format);
            console.log(query);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getKaoUser :async function(kakaocode){
        const connection = await pool.getConnection();
        try{ 
            var query = mybatisMapper.getStatement('userMapper', 'getKaoUser', kakaocode, format);
            console.log(query);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows[0];
    },

    getUserId :async function(userPhone){
        const connection = await pool.getConnection();
        try{ 
            var query = mybatisMapper.getStatement('userMapper', 'getUserId', userPhone, format);
            console.log(query);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    updateUserPw :async function(userPw){
        const connection = await pool.getConnection();
        try{ 
            var query = mybatisMapper.getStatement('userMapper', 'updateUserPw', userPw, format);
            console.log(query);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getIdCheck :async function(userId){
        const connection = await pool.getConnection();
        try{ 
            var query = mybatisMapper.getStatement('userMapper', 'getIdCheck', userId, format);
            console.log(query);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },
    
    getPhoneCheck :async function(phone){
        const connection = await pool.getConnection();
        try{ 
            var query = mybatisMapper.getStatement('userMapper', 'getPhoneCheck', phone, format);
            console.log(query);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getLoginCheck :async function(userId){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('userMapper', 'getLoginCheck', userId, format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },
    
    getSingupInfo :async function(userId){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('userMapper', 'getSingupInfo', userId, format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getUserImgRating :async function(userId){
        const connection = await pool.getConnection();
        try{   
            var query = mybatisMapper.getStatement('userMapper', 'getUserImgRating', userId, format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getUserImgRatingFarm :async function(userId){
        const connection = await pool.getConnection();
        try{   
            var query = mybatisMapper.getStatement('userMapper', 'getUserImgRatingFarm', userId, format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    addUser :async function(user){   
        const connection = await pool.getConnection();
        try{   
            var query = mybatisMapper.getStatement('userMapper', 'addUser', user, format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    updateUser :async function(user){   
        const connection = await pool.getConnection();
        try{  
            var query = mybatisMapper.getStatement('userMapper', 'updateUser', user, format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

}

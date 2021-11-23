const connection = require('../../configs/mysql2-db');
const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/v1/user.xml']);

module.exports = {

    addCertification :async function(body){
        const con = await connection;
        try{ 
            var query = mybatisMapper.getStatement('userMapper','addCertification',body, format);
            console.log(query);
            var [rows] = await con.query(query);
        }catch(err){
            throw err;
        }finally{
            con.release();
        }
        return rows[0];
    },

    updateCertification :async function(body){
        const con = await connection;
        try{ 
            var query = mybatisMapper.getStatement('userMapper', 'updateCertification',body, format);
            console.log(query);
            var [rows] = await con.query(query);
        }catch(err){
            throw err;
        }finally{
            con.release();
        }
        return rows[0];
    },

    getCertification :async function(userPhone){
        const con = await connection;
        try{ 
            var query = mybatisMapper.getStatement('userMapper', 'getCertification', userPhone, format);
            console.log(query);
            var [rows] = await con.query(query);
        }catch(err){
            throw err;
        }finally{
            con.release();
        }
        return rows[0];
    },

    getKaoUser :async function(kakaocode){
        const con = await connection;
        try{ 
            var query = mybatisMapper.getStatement('userMapper', 'getKaoUser', kakaocode, format);
            console.log(query);
            var [rows] = await con.query(query);
        }catch(err){
            throw err;
        }finally{
            con.release();
        }
        return rows[0];
    },

    getUserId :async function(userPhone){
        const con = await connection;
        try{ 
            var query = mybatisMapper.getStatement('userMapper', 'getUserId', userPhone, format);
            console.log(query);
            var [rows] = await con.query(query);
        }catch(err){
            throw err;
        }finally{
            con.release();
        }
        return rows[0];
    },

    updateUserPw :async function(userPw){
        const con = await connection;
        try{ 
            var query = mybatisMapper.getStatement('userMapper', 'updateUserPw', userPw, format);
            console.log(query);
            var [rows] = await con.query(query);
        }catch(err){
            throw err;
        }finally{
            con.release();
        }
        return rows;
    },

    getIdCheck :async function(userId){
        const con = await connection;
        try{ 
            var query = mybatisMapper.getStatement('userMapper', 'getIdCheck', userId, format);
            console.log(query);
            var [rows] = await con.query(query);
        }catch(err){
            throw err;
        }finally{
            con.release();
        }
        return rows[0];
    },
    
    getLoginCheck :async function(userId){
        console.log("로그인체크")
        const con = await connection;
        try{
            var query = mybatisMapper.getStatement('userMapper', 'getLoginCheck', userId, format);
            var [rows] = await con.query(query);
        }catch(err){
            throw err;
        }finally{
            con.release();
        }
        return rows[0];
    },

    getUserImgRating :async function(userId){
        const con = await connection;
        try{   
            var query = mybatisMapper.getStatement('userMapper', 'getUserImgRating', userId, format);
            var [rows] = await con.query(query);
        }catch(err){
            throw err;
        }finally{
            con.release();
        }
        return rows[0];
    },

    getUserImgRatingFarm :async function(userId){
        const con = await connection;
        try{   
            var query = mybatisMapper.getStatement('userMapper', 'getUserImgRatingFarm', userId, format);
            var [rows] = await con.query(query);
        }catch(err){
            throw err;
        }finally{
            con.release();
        }
        return rows[0];
    },

    addUser :async function(user){   
        const con = await connection;
        try{   
            var query = mybatisMapper.getStatement('userMapper', 'addUser', user, format);
            var [rows] = await con.query(query);
        }catch(err){
            throw err;
        }finally{
            con.release();
        }
        return rows;
    },

    updateUser :async function(user){   
        const con = await connection;
        try{  
            var query = mybatisMapper.getStatement('userMapper', 'updateUser', user, format);
            var [rows] = await con.query(query);
        }catch(err){
            throw err;
        }finally{
            con.release();
        }
        return rows;
    },

}

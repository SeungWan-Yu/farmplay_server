const pool = require('../../configs/mysql2-db');
const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/v1/webView.xml']);

module.exports = {

    addPayReq : async function(body,connection){
        try{
            var query = mybatisMapper.getStatement('webViewMapper','addPayReq',body,format);
            var [rows] = await connection.query(query);
        }catch(err){
            err.chk = "addPayReq";
            throw err;
        }
        return rows;
    },

    getPayReq : async function(body,connection){
        try{
            var query = mybatisMapper.getStatement('webViewMapper','getPayReq',body,format);
            var [rows] = await connection.query(query);
        }catch(err){
            err.chk = "getPayReq";
            throw err;
        }
        return rows;
    },

    updatePayReqState : async function(body,connection){
        try{
            var query = mybatisMapper.getStatement('webViewMapper','updatePayReqState',body,format);
            var [rows] = await connection.query(query);
        }catch(err){
            err.chk = "updatePayReqState";
            throw err;
        }
        return rows;
    },

    updatePayReqAmount : async function(body,connection){
        try{
            var query = mybatisMapper.getStatement('webViewMapper','updatePayReqAmount',body,format);
            var [rows] = await connection.query(query);
        }catch(err){
            err.chk = "updatePayReqAmount";
            throw err;
        }
        return rows;
    },



    addPayApro : async function(body,connection){
        try{
            var query = mybatisMapper.getStatement('webViewMapper','addPayApro',body,format);
            var [rows] = await connection.query(query);
        }catch(err){
            err.chk = "addPayApro";
            throw err;
        }
        return rows;
    },

   

}

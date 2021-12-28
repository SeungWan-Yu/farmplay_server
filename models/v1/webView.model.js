const pool = require('../../configs/mysql2-db');
const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/v1/webView.xml']);

module.exports = {

    addPayReq : async function(query){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('webViewMapper','addPayReq',query,format);
            var [rows] = await connection.query(query);
        }catch(err){
            err.chk = "addPayReq";
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getPayReq : async function(query){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('webViewMapper','getPayReq',query,format);
            var [rows] = await connection.query(query);
        }catch(err){
            err.chk = "getPayReq";
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    updatePayReqState : async function(query){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('webViewMapper','updatePayReqState',query,format);
            var [rows] = await connection.query(query);
        }catch(err){
            err.chk = "updatePayReqState";
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    updatePayReqAmount : async function(query){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('webViewMapper','updatePayReqAmount',query,format);
            var [rows] = await connection.query(query);
        }catch(err){
            err.chk = "updatePayReqAmount";
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },



    addPayApro : async function(query){
        const connection = await pool.getConnection();
        var rows =[];
        try{
            await connection.beginTransaction();
            //1. 최종인원 다시한번 체크
            // var q1 = 
            // va [r1] = 

            //2. 결제승인정보 DB저장 (최종인원 초과하지 않았다면)
            var q2 = mybatisMapper.getStatement('webViewMapper','addPayApro',query,format);
            var [r2] = await connection.query(q2);
            rows.push(r2);       
            //3. 결재요청창 업데이트
            var q3 = mybatisMapper.getStatement('webViewMapper','updatePayReqState',query,format);
            var [r3] = await connection.query(q3);
            rows.push(r3); 
            await connection.commit();
        }catch(err){
            err.chk = "addPayApro";
            await connection.rollback();
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

   

}

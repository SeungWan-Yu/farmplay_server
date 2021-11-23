const con = require('../../configs/mysql2-db');


module.exports = {

    apiList :async function(apiCrud){
        const connection = await con;

        console.log("모집수정 모델확인");
        //이후 프로세스 참가수정중,참가신청중 모두 참가취소로 변경되어야 함
        try{
            var sql1 = "SELECT apiCode, apiDivision, apiCrud, apiName, apiCnt, apiExplan, apiUrl, apiMethod, apiReqParam, apiReqParamKor, apiResParam, apiResParamKor, apiDetailExplan, apiRegDate FROM api WHERE apiCrud =?";
            var param1 = [apiCrud];
            var [rows] = await connection.query(sql1,param1);
            console.log("결과값")
            return rows;
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }

    },

    apiAllList :async function(){
        const connection = await con;
        try{
            var sql1 = "SELECT apiCode, apiDivision, apiCrud, apiName, apiCnt, apiExplan, apiUrl, apiMethod, apiReqParam, apiReqParamKor, apiResParam, apiResParamKor, apiDetailExplan, apiRegDate FROM api";
            var [rows] = await connection.query(sql1);
            console.log("결과값")
            return rows;
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }

    },

    addApi :async function(b){
        const connection = await con;

        console.log("api등록 모델확인");
        //이후 프로세스 참가수정중,참가신청중 모두 참가취소로 변경되어야 함
        try{
            var sql1 = "INSERT INTO api (apiDivision, apiCrud, apiName, apiCnt, apiExplan, apiUrl, apiMethod, apiReqParam, apiReqParamKor, apiResParam, apiResParamKor, apiDetailExplan, apiRegDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
            var param1 = [b.apiDivision,b.apiCrud,b.apiName,b.apiCnt,b.apiExplan,b.apiUrl,b.apiMethod,b.apiReqParam,b.apiReqParamKor,b.apiResParam,b.apiDetailExplan,b.apiRegDate];
            var [rows] = await connection.query(sql1,param1);
            console.log("결과값")
            return rows;
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }

    },
    
    appApiDel :async function(apiCode){
        const connection = await con;
        console.log("api등록 모델확인");
        //이후 프로세스 참가수정중,참가신청중 모두 참가취소로 변경되어야 함
        try{
            var sql1 = "DELETE FROM api WHERE apiCode=?";
            var param1 = [apiCode];
            var [rows] = await connection.query(sql1,param1);
            console.log("결과값")
            return rows;
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }

    },
   
}

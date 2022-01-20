const pool = require('../../configs/mysql2-db');
const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/web/webApi.xml']);


module.exports = {


    apiListCrud : async function(con,crud){
        var query = mybatisMapper.getStatement('webApiMapper','apiListCrud',crud);
        var [rows] = await con.query(query);
        return rows;
    },


    apiAllList : async function(con){
        var query = mybatisMapper.getStatement('webApiMapper','apiAllList');
        var [rows] = await con.query(query);
        return rows;
    },


        
    addApi : async function(con,body){
        var query = mybatisMapper.getStatement('webApiMapper','addApi',body);
        var [rows] = await con.query(query);
        return rows;
    },

    
    appApiDel :async function(apiCode){
        const connection = await pool.getConnection();
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

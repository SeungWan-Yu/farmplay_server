const pool = require('../../configs/mysql2-db');


module.exports = {
    
    getLogin :async function(id){
        const connection = await pool.getConnection();
        try{
            var params = [id];
            var [rows] = await connection.query("SELECT userPw FROM users WHERE userId = ?",params);   
            console.log("결과값");
            return rows;
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
    },
    getDestory :async function(){
        const connection = await pool.getConnection();
        var re = "리턴";
        try{
            console.log("파괴")
            connection.destroy();
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return re;
      
    }
}

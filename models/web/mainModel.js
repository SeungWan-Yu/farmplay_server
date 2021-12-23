const pool = require('../../configs/mysql2-db');


module.exports = {

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

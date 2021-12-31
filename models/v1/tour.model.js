const pool = require('../../configs/mysql2-db');
const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/v1/tour.xml']);


module.exports = {
    
    getTourFoodList :async function(body){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('tourMapper','getTourFoodList',body);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

   
}

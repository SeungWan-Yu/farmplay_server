const pool = require('../../configs/mysql2-db');
const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/web/webTour.xml']);

module.exports = {
    
    setFoodList :async function(itemFoodList){
        console.log("모델체크");
        console.log(itemFoodList);
        console.log(itemFoodList.length);
        const connection = await pool.getConnection();
   
        try{
            await connection.beginTransaction();
            var q1 = mybatisMapper.getStatement('webTourMapper','getFoodCodeList',format);
            var [r1] = await connection.query(q1);
            console.log(r1);
            console.log(r1[0].foodCode);
            var q2 = mybatisMapper.getStatement('webTourMapper','removeFoodAll',r1,format);
            var [r2] = await connection.query(q2);

            console.log(r2);
            console.log(rows);
            var q3 = mybatisMapper.getStatement('webTourMapper','addTourFood',itemFoodList,format);
            console.log(q3);
            var [r3] = await connection.query(q3);
            await connection.commit();
        }catch(err){
            console.log("에러 롤백");
            await connection.rollback();
            throw err;
        }finally{
            connection.release();
        }
        return r3;
    },

   
}

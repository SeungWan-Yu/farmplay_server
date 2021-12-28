const pool = require('../../configs/mysql2-db');
const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/web/webTour.xml']);

module.exports = {
    
    setFoodList :async function(itemFoodListMap){
        console.log("모델체크");
        const connection = await pool.getConnection();
   
        try{
            await connection.beginTransaction();
            var q1 = mybatisMapper.getStatement('webTourMapper','getFoodCodeList',format);
            var [r1] = await connection.query(q1);
            var mapR1 = {"r1":r1};
            console.log(r1);
            console.log(r1[0].foodCode);
            var q2 = mybatisMapper.getStatement('webTourMapper','removeFoodAll',mapR1,format);
            console.log("쿼리2출력");
            console.log(q2);
            var [r2] = await connection.query(q2);

            console.log(r2);
            var q3 = mybatisMapper.getStatement('webTourMapper','addTourFood',itemFoodListMap,format);
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

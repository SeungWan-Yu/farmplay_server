const pool = require('../../configs/mysql2-db');
const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/web/webTour.xml']);

module.exports = {
    
    setFoodList :async function(itemFoodListMap){
        console.log("모델체크");
        const connection = await pool.getConnection();
   
        try{
            //await connection.beginTransaction();
            var q1 = mybatisMapper.getStatement('webTourMapper','getFoodCodeList',format);
            console.log(q1);
            var [r1] = await connection.query(q1);
            console.log(r1);
            if(r1.length>0){
                var mapR1 = {"r1":r1};
                var q2 = mybatisMapper.getStatement('webTourMapper','removeFoodAll',mapR1);
                var [r2] = await connection.query(q2);
                console.log("삭제완룟");
            }
            
            console.log("등록시작");
            var q3 = mybatisMapper.getStatement('webTourMapper','addTourFood',itemFoodListMap);
            console.log(q3);
            var [r3] = await connection.query(q3);
            // var itemFoodList = itemFoodListMap.itemFoodList;
            // console.log(itemFoodList.length);
            // for(var i=0;i<itemFoodList.length;i++){
            //     console.log("포문시작");
            //     var q4 = mybatisMapper.getStatement('webTourMapper','addTourFoodFor',itemFoodList[i],format);
            //     console.log(q4);
            //     var [r4] = await connection.query(q4);
            // }
           

            //await connection.commit();
        }catch(err){
            console.log("에러 롤백");
            //await connection.rollback();
            throw err;
        }finally{
            connection.release();
        }
        return r3;
    },
    
    addTourFood :async function(itemFoodListMap){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('webTourMapper','addTourFood',itemFoodListMap);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getFoodCodeList :async function(){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('webTourMapper','getFoodCodeList',format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getFoodCodeDbList :async function(){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('webTourMapper','getFoodCodeDbList',format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    updateFoodList :async function(itemFoodUpdateListMap){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('webTourMapper','updateFoodList',itemFoodUpdateListMap);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },
   
}

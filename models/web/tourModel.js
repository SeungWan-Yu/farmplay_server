const con = require('../../configs/mysql2-db');


module.exports = {
    
    setFoodList :async function(itemFood){
        console.log("모델체크");
        console.log(itemFood);
        console.log(itemFood.length);
        const connection = await con;
   
        try{
            await connection.beginTransaction();
            var sql = "TRUNCATE TABLE tour_food"
            var [rows] = await connection.query(sql);

            for(var i in itemFood){
                var sql1 = "INSERT INTO tour_food (foodCode, foodTypeId, foodAddr1, foodAreacode, foodSigunguCode, foodFirstimage, foodFirstimage2, foodMapx, foodMapy, foodTitle, foodReadCount, foodRegDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
                var param1 = [itemFood[i].contentid,itemFood[i].contenttypeid,itemFood[i].addr1,itemFood[i].areacode,itemFood[i].sigungucode,itemFood[i].firstimage,itemFood[i].firstimage2,itemFood[i].mapx,itemFood[i].mapy,itemFood[i].title,itemFood[i].readcount];
                var [rows] = await connection.query(sql1,param1);
            }
            console.log("결과값");
            await connection.commit();
            return rows;
        }catch(err){
            console.log("에러 롤백");
            await connection.rollback();
            throw err;
        }finally{
            connection.release();
        }
    },

   
}

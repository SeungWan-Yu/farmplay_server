const con = require('../../mysql2-db');

module.exports = {
    updateEnterState :async function(body){
        const connection = await con;
        console.log("업데이트 참가 상태 바디체크");
        console.log(body);
        var enterCode = body.enterCode;
        var enterUserId = body.enterUserId;
        var enterState = body.enterState;
        var enterEditReson = body.enterEditReson
        var enterEditStart = body.enterEditStart
        var enterEditEnd = body.enterEditEnd
        
        try{
            if(enterState=="참가취소됨"){
                var sql1 = "UPDATE farmpler SET enterEditDate=NOW(), enterEditReson=?, enterState=? WHERE enterCode =? AND enterUserId =?";
                var param1 = [enterEditReson,enterState,enterCode,enterUserId];
                var [rows] = await connection.query(sql1,param1);
                return rows
            }else if(enterState=="참가수정요청"){
                var sql1 = "UPDATE farmpler SET enterEditStart=?, enterEditEnd=?,enterEditDate=NOW(),enterEditReson=?,enterState=? WHERE enterCode =? AND enterUserId =?";
                var param1 = [enterEditStart,enterEditEnd,enterEditReson,enterState,enterCode,enterUserId];
                var [rows] = await connection.query(sql1,param1);
                return rows
            }
           
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
       
    },

    

}

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

    updateEnterConfirmCancel :async function(body){
        const connection = await con;
        console.log("수정컨펌 바디 확인");
        console.log(body);
        var enterCode = body.enterCode;
        var enterUserId = body.enterUserId;
        var enterStart = body.enterStart;
        var enterEnd = body.enterEnd;
        var enterState  = body.enterState;
        var confirmState  = body.confirmState;
        var state = "";
        var reson ="";

        if(confirmState=="수락"){
            state ="참가확정됨";
        }else if(confirmState=="취소"){
            state = "참가취소됨";
            reson = "농가취소";
        };

        if(enterState=="참가신청중"){
            enterStart = "";
            enterEnd = "";
            reson = "";
        };
        try{
            if(enterState=="참가신청중" || enterState=="참가확정됨"){
                var sql = "UPDATE farmpler SET enterState=?,enterEditReson=?,enterEditDate=NOW() WHERE enterUserId =? AND enterCode=?";
                var param = [state,reson,enterUserId,enterCode];
                var [rows] = await connection.query(sql,param);
                return rows
            }else if(enterState=="참가수정요청"){
                var sql = "UPDATE farmpler SET enterStart=?,enterEnd=?,enterState=?,enterEditReson=?,enterEditDate=NOW(),enterEditStart='',enterEditEnd='' WHERE enterUserId =? AND enterCode=?";
                var param = [enterStart,enterEnd,state,reson,enterUserId,enterCode];
                var [rows] = await connection.query(sql,param);
                return rows
            } 
            
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
       
    },

}

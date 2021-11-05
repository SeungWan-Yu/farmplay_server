const con = require('../../mysql2-db');

module.exports = {
    updateReruit :async function(b){
        const connection = await con;
        console.log("모집수정 모델확인");
        console.log(b);
        try{
            var sql1 = "UPDATE recruit SET recuritStart=?,recuritEnd=?,recuritJobStart=?,recuritJobEnd=?,recuritJobKind=?,recuritMealProvide=?,recuritMealVeget=?,recuritMealMemo=?,recuritChkFampler=?,recuritChkPeriod=?,recuritChkMinor=?,recuritChkMinorMemo=?,recuritChkMax=?,recuritChkSummary=? WHERE recuritCode=?";
            var param1 = [b.recuritStart,b.recuritEnd,b.recuritJobStart,b.recuritJobEnd,b.recuritJobKind,b.recuritMealProvide,b.recuritMealVeget,b.recuritMealMemo,b.recuritChkFampler,b.recuritChkPeriod,b.recuritChkMinor,b.recuritChkMinorMemo,b.recuritChkMax,b.recuritChkSummary,b.recuritCode];
            console.log("파라미터");
            console.log(param1);
            var [rows] = await connection.query(sql1,param1);
            console.log("결과값")
            return rows;
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }

    },

    endReruit :async function(query){
        const connection = await con;
        var recuritCode  = query.recuritCode
        console.log("모집수정 모델확인");
        //이후 프로세스 참가수정중,참가신청중 모두 참가취소로 변경되어야 함
        try{
            var sql1 = "UPDATE recruit SET recuritState='모집완료' WHERE recuritCode=?";
            var param1 = [recuritCode];
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

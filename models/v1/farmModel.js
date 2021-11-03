const con = require('../../mysql2-db');

module.exports = {
    getEnterList :async function(query){
        const connection = await con;
        var enterUserId = query.enterUserId;
        try{
            var sql1 = "SELECT farmCode, farmState, farmAskDate, farmRegDate, farmImg, farmName, farmStartOpen, farmProduce, farmType, farmerIntro, farmAddr, farmAddrDetail, farmRoomInternet, farmRoomSite, farmRoomInfo, farmRoom, farmRoomUnisex, farmRoomEtc, userName, farmRating, farmReviewCnt, recuritCode, recuritFarmCode, recuritState, recuritUserId, recuritStart, recuritEnd, recuritJobStart, recuritJobEnd, recuritJobKind, recuritMealProvide, recuritMealVeget, recuritMealMemo, recuritChkFampler, recuritChkPeriod, recuritChkMinor, recuritChkMinorMemo, recuritChkMax, recuritChkSummary, enterCode, enterfarmCode, enterRecuritCode, enterUserId, enterUserName, enterUserPhoto, enterUserRating, enterReporting, enterStart, enterEnd, enterEditStart, enterEditEnd, enterFarmplerIntro, enterCancelReson, enterEditReson, enterState, enterReview FROM farm_recruit_farmpler  WHERE enterUserId =?";
            var param1 = [enterUserId];
            var [rows] = await connection.query(sql1,param1);
            console.log("결과값")
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return new Promise((resolve,reject) =>{    
            resolve(rows)
 
        });
    },


    getRecruitList :async function(query){
        const connection = await con;
        var farmCode = query.farmCode;
        console.log("쿼리>>"+query);
        console.log(query);
        console.log("팜코드>>"+farmCode);
        try{
            var sql1 = "SELECT farmCode, farmState, farmAskDate, farmRegDate, farmImg, farmName, farmStartOpen, farmProduce, farmType, farmerIntro, farmAddr, farmAddrDetail, farmRoomInternet, farmRoomSite, farmRoomInfo, farmRoom, farmRoomUnisex, farmRoomEtc, userName, farmRating, farmReviewCnt, recuritCode, recuritFarmCode, recuritState, recuritUserId, recuritStart, recuritEnd, recuritJobStart, recuritJobEnd, recuritJobKind, recuritMealProvide, recuritMealVeget, recuritMealMemo, recuritChkFampler, recuritChkPeriod, recuritChkMinor, recuritChkMinorMemo, recuritChkMax, recuritChkSummary FROM farm_recurit WHERE farmCode = ?";
            var param1 = [farmCode];
            var [rows] = await connection.query(sql1,param1);
            console.log("결과값")
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return new Promise((resolve,reject) =>{    
            resolve(rows)
        });
    },

}

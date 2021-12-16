const connection = require('../../configs/mysql2-db');

module.exports = {
    
    getRecruitList : function(){
        // return new Promise((resolve,reject) =>{       
        //     console.log("결과1>>"+con)
        //     con.query('SELECT r.recuritCode,r.recuritFarmCode,r.recuritState,r.recuritUserId,r.recuritStart,r.recuritEnd,r.recuritJobStart,r.recuritJobEnd,r.recuritJobKind,r.recuritMealProvide,r.recuritMealVeget,r.recuritMealMemo,r.recuritChkFampler,r.recuritChkPeriod,r.recuritChkMinor,r.recuritChkMinorMemo,r.recuritChkMax,r.recuritChkSummary,f.farmState,f.farmAskDate,f.farmRegDate,f.farmImg,f.farmName,f.farmStartOpen,f.farmProduce,f.farmType,f.farmerIntro,f.farmAddr,f.farmAddrDetail,f.farmRoomInternet,f.farmRoomSite,f.farmRoomInfo,f.farmRoom,f.farmRoomUnisex,f.farmRoomEtc FROM farm AS f INNER JOIN recruit AS r ON f.farmCode = r.recuritFarmCode', 
        //     function (err, result, fields) {
        //         if(err){
        //             console.log(err);
        //             reject(err)
        //         }else{
        //             resolve(result)
        //         }
        //     });
        // });
    },

  
}

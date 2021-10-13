var con = require('../../mysql-db');

module.exports = {
    
    getFarmplerRlist : function(recuritCode){
        return new Promise((resolve,reject) =>{       
            console.log("결과1>>"+con)
            con.query('SELECT enterCode, enterfarmCode, enterRecuritCode, enterUserId, enterUserName, enterUserPhoto, enterUserRating, enterReporting, enterStart, enterEnd, enterEditStart, enterEditEnd, enterFarmplerIntro, enterCancelReson, enterEditReson, enterState FROM farmpler WHERE enterRecuritCode = ?',recuritCode, 
            function (err, result, fields) {
                if(err){
                    reject(err)
                }else{
                    console.log("결과>>"+result)
                    resolve(result)
                }
            });
        });
    },

}

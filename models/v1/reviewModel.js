const con = require('../../mysql2-db');

module.exports = {
    addReview :async function(review){
        const connection = await con;
        try{
            await connection.beginTransaction();
            var sql1 = "INSERT INTO review (reviewStandard, reviewFpId, reviewFarmCode, reviewRecuritCode, reviewRating, reviewApplicatDay, reviewAttendanceDay, reviewContent, reviewRegDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())";
            var param1 = [review.reviewStandard,review.reviewFpId,review.reviewFarmCode,review.reviewRecuritCode
                        ,review.reviewRating,review.reviewApplicatDay,review.reviewAttendanceDay,review.reviewContent,review.reviewRegDate];
            var r1 = await connection.query(sql1,param1);
            console.log("r1>>>"+r1);
            

            if(review.reviewStandard=="농장"){
                var sql2="SELECT FLOOR(AVG(reviewRating)*10+0.5)/10 AS farmRating, COUNT(reviewRating) AS reviewCnt FROM review  WHERE reviewStandard='농장'  AND reviewFarmCode = ? "
                var param2=[review.reviewFarmCode];
                var [r2] = await connection.query(sql2,param2);
                console.log("r2체크 해복")
                console.log(r2[0])
                var farmRating = r2[0].farmRating;
                var reviewCnt = r2[0].reviewCnt;

                var sql3="UPDATE farm SET farmRating=?, farmReviewCnt=? WHERE  farmCode = ?";
                var param3 = [farmRating,reviewCnt,review.reviewFarmCode];
                var r3 = await connection.query(sql3,param3);

                var sql4 = "UPDATE farmpler SET enterReview='Y' WHERE enterRecuritCode =? AND enterUserId =? AND enterState = '참가완료'";
                var param4 = [review.reviewRecuritCode,review.reviewFpId];
                var r4 =- await connection.query(sql4,param4);

                console.log("r3>>>"+r3);
            }else if(review.reviewStandard=="팜플러"){
                var sql2 = "SELECT FLOOR(AVG(reviewRating)*10+0.5)/10 AS fpRating, COUNT(reviewRating) AS reviewCnt FROM review  WHERE reviewStandard='팜플러'  AND reviewFpId = ?";
                var param2 = [review.reviewFpId];
                var r2 = await connection.query(sql2,param2);
                var fpRating = r2[0][0].fpRating;
                var reviewCnt = r2[0][0].reviewCnt;

                var sql3 ="UPDATE users SET userRating=?, userReviewCnt=? WHERE  user_id = ?";
                var param3 = [fpRating,reviewCnt,review.reviewFpId];
                var r3 = await connection.query(sql3,param3);
                
                console.log("리뷰평점>>"+review.reviewRating);

                var enterState;
                if(review.reviewRating>0){
                    enterState = "참가완료"
                }else if(review.reviewRating==0){
                    enterState = "미참석"
                }
                console.log("변경할상태>>>"+enterState);
                console.log("상태>>>"+enterState);
                console.log("상태>>>"+enterState);
             
                var sql4 ="UPDATE farmpler SET enterState=? WHERE enterRecuritCode =? AND enterUserId =?  AND enterState= '참가확정됨'";
                var param4 = [enterState,review.reviewRecuritCode,review.reviewFpId];
                var r4 = await connection.query(sql4,param4);
                console.log("갑체크");
                console.log(r4[0].affectedRows);
                if(r4[0].affectedRows==0){
                    console.log("변경된 값이 없습니다.")
                    await connection.rollback();
                    throw Error;;
                }

                console.log("r4>>"+r4);
            }

            await connection.commit();
            console.log("트랜잭션성공");
        }catch(err){
            console.log("에러발생 롤백");
            await connection.rollback();
            throw err;
        }finally{
            connection.release();
        }

    },

    getReview :async function(params){
        const connection = await con;
        var reviewStandard = params.reviewStandard;
        var recuritCode = params.recuritCode;
        var enterUserId = params.enterUserId;
        try{
            var sql1 = "SELECT reviewCode, reviewStandard, reviewFpId, reviewFarmCode, reviewRecuritCode, reviewRating, reviewApplicatDay, reviewAttendanceDay, reviewContent, reviewRegDate FROM review WHERE reviewStandard = ? AND reviewFpId=? AND reviewRecuritCode = ?";
            var param1 = [reviewStandard,enterUserId,recuritCode];
            var [r1] = await connection.query(sql1,param1);
            console.log("결과값")
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return new Promise((resolve,reject) =>{    
            resolve(r1[0])
 
        });
    },

    getReviewRating :async function(params){
        console.log("모델확인");
        console.log(params);
        const connection = await con;
        var farmcode = params.farmcode;
        var farmstate = params.farmstate;
        var userid = params.userid;
        var r ="";
        try{
            if(farmstate==1){
                var sql = "SELECT userRating, userReviewCnt FROM users WHERE user_id =?"
                var param  = [userid];
                [r] = await connection.query(sql,param);
            }else if(farmstate==2){
                var sql = "SELECT f.farmCode ,u.userRating, u.userReviewCnt,f.farmRating,f.farmReviewCnt FROM users AS u LEFT JOIN farm AS f ON u.user_id = f.userName WHERE u.user_id = ? AND farmCode = ?"
                var param  = [userid,farmcode];
                [r] = await connection.query(sql,param);``
            }
            console.log("결과값")
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return new Promise((resolve,reject) =>{    
            resolve(r[0])
        });
    },


}

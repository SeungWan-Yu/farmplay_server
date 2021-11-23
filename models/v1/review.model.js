const con = require('../../configs/mysql2-db');
const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/v1/review.xml']);

module.exports = {
    addReviewFarm :async function(review){
        const connection = await con;
        try{
            await connection.beginTransaction();
            //1.리뷰등록
            var q1 = mybatisMapper.getStatement('reviewMapper','addReview',review, format);
            var [r1] = await connection.query(q1);
            //2.등록후 평점계산     
            var q2= mybatisMapper.getStatement('reviewMapper','getReviewRatingCal',review, format);
            var [r2] = await connection.query(q2);
            //3.농가테이블에 농가평점업데이트
            var reviewCal = {
                reviewRating : r2[0].farmRating,
                reviewCnt : r2[0].reviewCnt,
                farmCode : review.reviewFarmCode
            };
            var q3= mybatisMapper.getStatement('reviewMapper','updateReviewRatingFarm',reviewCal, format);
            var [r3] = await connection.query(q3);
            //4.팜플러테이블에 리뷰 'Y'로 업데이트
            var q4= mybatisMapper.getStatement('reviewMapper','updateEnterReview',review, format);
            var [r4] = await connection.query(q4);

            console.log("r4>>>"+r4);
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

    addReviewFarmpler :async function(review){
        const connection = await con;
        try{
            await connection.beginTransaction();
            //1. 리뷰등록
            var q1 = mybatisMapper.getStatement('reviewMapper','addReview',review, format);
            var [r1] = await connection.query(q1);
            //2. 등록후 평점계산
            var q2= mybatisMapper.getStatement('reviewMapper','getReviewRatingCal',review, format);
            var [r2] = await connection.query(q2);
            var reviewCal = {
                reviewRating : r2[0].farmRating,
                reviewCnt : r2[0].reviewCnt,
                userId : review.reviewFpId
            };
            //3. 유저테이블에 유저평점업데이트
            var q3= mybatisMapper.getStatement('reviewMapper','updateReviewRatingUser',reviewCal, format);
            var [r3] = await connection.query(q3);
            var enterState;
            if(review.reviewRating>0){
                enterState = "참가완료"
            }else if(review.reviewRating==0){
                enterState = "미참석"
            }
            
            var enterState = {
                enterState  : enterState,
                enterCode   : review.reviewEnterCode,
                enterUserId : review.reviewFpId
            }
            //4. 팜플러테이블에 팜플러 참가상태 변경
            var q4= mybatisMapper.getStatement('reviewMapper','updateEnterState',enterState, format);
            var [r4] = await connection.query(q4);
            
            // 이건 변경된값 없는거 체크하는건대.. 사용보류
            // if(r4[0].affectedRows==0){
            //     console.log("변경된 값이 없습니다.")
            //     await connection.rollback();
            //     throw Error;;
            // }
            console.log("r4>>"+r4);
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

    getReview :async function(body){
        const connection = await con;
        try{
            var query = mybatisMapper.getStatement('reviewMapper','getReview',body, format);
            var [rows] = await connection.query(query);
            console.log("결과값")
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows[0];
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
                [rows] = await connection.query(sql,param);
            }else if(farmstate==2){
                var sql = "SELECT f.farmCode ,u.userRating, u.userReviewCnt,f.farmRating,f.farmReviewCnt FROM users AS u LEFT JOIN farm AS f ON u.user_id = f.userName WHERE u.user_id = ? AND farmCode = ?"
                var param  = [userid,farmcode];
                [rows] = await connection.query(sql,param);``
            }
            console.log("결과값")
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows[0];
    },


}

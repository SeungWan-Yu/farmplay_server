const pool = require('../../configs/mysql2-db');
const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/v1/review.xml']);

module.exports = {

    addReviewFarm :async function(review){
        const connection = await pool.getConnection();
        var rowCheck = false;
        var rows = [];
        try{
            await connection.beginTransaction();
            //1.리뷰등록
            var q1 = mybatisMapper.getStatement('reviewMapper','addReview',review, format);
            var [r1] = await connection.query(q1);
            if(r1.affectedRows!=1){
                rowCheck = true;
            }else{
                rows.push(r1);
            }
            //2.등록후 평점계산     
            var q2= mybatisMapper.getStatement('reviewMapper','getReviewRatingCal',review, format);
            var [r2] = await connection.query(q2);
            if(r2.length==0){
                rowCheck = true;
            }else{
                rows.push(r2);
            }
            
            //3.농가테이블에 농가평점업데이트
            var reviewCal = {
            reviewRating : r2[0].farmRating,
            reviewCnt : r2[0].reviewCnt,
            farmCode : review.reviewFarmCode
            }
            var q3= mybatisMapper.getStatement('reviewMapper','updateReviewRatingFarm',reviewCal, format);
            var [r3] = await connection.query(q3);
            
            if(r3.changedRows!=1){
                rowCheck = true;
            }else{
                rows.push(r3);
            }

            //4.팜플러테이블에 리뷰 'Y'로 업데이트
            var q4= mybatisMapper.getStatement('reviewMapper','updateEnterReview',review, format);
            var [r4] = await connection.query(q4);
            if(r4.changedRows!=1){
                rowCheck = true;
            }else{
                rows.push(r4);
            }
            if(rowCheck){
                await connection.rollback();
                throw Error("affectedRows");
            }else{
                await connection.commit();
                console.log("트랜잭션성공");
            }
        }catch(err){
            console.log("에러발생 롤백");
            await connection.rollback();
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    addReviewFarmpler :async function(review){
        const connection = await pool.getConnection();
        var rowCheck = false;
        var rows = [];
        try{
            await connection.beginTransaction();
            //1. 리뷰등록
            var q1 = mybatisMapper.getStatement('reviewMapper','addReview',review, format);
            var [r1] = await connection.query(q1);
            if(r1.affectedRows!=1){
                rowCheck = true;
            }else{
                rows.push(r1);
            }

            //2. 등록후 평점계산
            var q2= mybatisMapper.getStatement('reviewMapper','getReviewRatingCal',review, format);
            var [r2] = await connection.query(q2);
            if(r2.length==0){
                rowCheck = true;
            }else{
                rows.push(r2);
            }
    
            //3. 유저테이블에 유저평점업데이트
            var reviewCal = {
                reviewRating : r2[0].farmRating,
                reviewCnt : r2[0].reviewCnt,
                userId : review.reviewFpId
            };
            var q3= mybatisMapper.getStatement('reviewMapper','updateReviewRatingUser',reviewCal, format);
            var [r3] = await connection.query(q3);
            if(r3.changedRows!=1){
                rowCheck = true;
            }else{
                rows.push(r3);
            }
        
            //4. 팜플러테이블에 팜플러 참가상태 변경
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
            var q4= mybatisMapper.getStatement('reviewMapper','updateEnterState',enterState, format);
            var [r4] = await connection.query(q4);

            if(r4.changedRows!=1){
                rowCheck = true;
            }else{
                rows.push(r4);
            }
            
            if(rowCheck){
                await connection.rollback();
                throw Error("affectedRows");
            }else{
                await connection.commit();
                console.log("트랜잭션성공");
            }
        }catch(err){
            console.log("에러발생 롤백");
            await connection.rollback();
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getReview :async function(body){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('reviewMapper','getReview',body, format);
            var [rows] = await connection.query(query);
            console.log("결과값")
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },

    getFarmReviewList :async function(body){
        const connection = await pool.getConnection();
        try{
            var query = mybatisMapper.getStatement('reviewMapper','getFarmReviewList',body,format);
            var [rows] = await connection.query(query);
        }catch(err){
            throw err;
        }finally{
            connection.release();
        }
        return rows;
    },



}

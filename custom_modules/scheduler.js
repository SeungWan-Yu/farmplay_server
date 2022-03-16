const cron = require('node-cron');
const pool = require('../configs/mysql2-db');
const recruitModel = require("../models/v1/recruit.model");
const farmplerModel = require("../models/v1/farmpler.model");



//모집완료 스케쥴러 (0시1분,10분,20분에 그전날기준으로 모집중인 리스트 가져와 모집완료한다.)
function schedulerRecruitEnd(){
    //'1,10,20 0 * * *'     <-- 0시 1분마다 실행
    cron.schedule('0,1,2 13 * * *', async function () {
      const con = await pool.getConnection();
      try {
        await con.beginTransaction();
        var recruitListMap ={};
        var enterListMap ={};
      
        // 1.모집완료할 리스트 가져오기 
        var r1 =  await recruitModel.getRecruitEndList(con);
        recruitListMap.recruitList = r1;
        console.log(recruitListMap);
        if(r1.length>0){
          // 2.해당 리스트 모집완료 상태 변경  
          var r2 = await recruitModel.updateRecruitList(con,recruitListMap);
          console.log("r2체크하기");
          console.log(r2);
          if(r2.changedRows != r1.length){
            throw Error("affectedRows");
          }
          //3. 해당 리스트 참가인원중 참가신청중,참가수정요청 회원 가져옴
          var r3 = await farmplerModel.getRecruitEndEnterList(con,recruitListMap);
          enterListMap.enterList = r3;
          console.log("r3체크");
          console.log(r3);
          if(r3.length>0){
            //4. 참가수정요청, 참가신청중 회원 참가상태 참가취소로 업데이트
            var r4 = await farmplerModel.updateEnterListEdit(con,enterListMap);
            console.log("r4체크하기");
            console.log(r4);
            if(r4.changedRows != r3.length){
              throw Error("affectedRows");
            }
          }
        }
        await con.commit();
      } catch (error) {
        await con.rollback();
        console.log("에러로오는지 확인")
        console.log(error);
      }finally{
        con.release();
      }
    });
};




module.exports = {schedulerRecruitEnd};
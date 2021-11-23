
const farmModel = require("../../models/web/farmModel");


//파일 삭제함수
function dFile(path){
    const fs = require('fs');
    const directory = fs.existsSync(path)//디렉토리 경로 입력
    if(directory){
        try {
            fs.unlinkSync(path)
            console.log("파일삭제성공");
        } catch(err) {
            console.error(err)
        }
    }else{
        console.log("파일이 없다");
        return false;
    }
};

//농가리스트
exports.farmList =async function (req, res) {
    var results = {result:"", msg:"성공"};
    try {
        results.result = await farmModel.getFarmList();
    } catch (error) {
        results.result = "실패";
        results.msg = error;
    }
    console.log("리턴값체크");
    console.log(results);
    res.render("../pages/farm/farmList",{data:results.result,msg:results.msg,chk:""});
}


//농가숙박이미지 리스트
exports.farmRoomImgList = function (req, res) {
    var farmCode = req.body.farmCode;
    farmModel.getFarmRoomImgList(farmCode).then(function(data){
        console.log("결과>>>"+data)
        res.json(data)
    })
   
};

//농가숙박이미지 삭제
exports.farmRoomImgDel = function (req, res) {
    var roomImgCode = req.body.roomImgCode;
    farmModel.delFarmRoomImgList(roomImgCode).then(function(data){
        console.log(data)
        res.json(data)
    })
   
};

//농가숙박이미지 등록
exports.farmRoomImgInsert = function (req, res) {
    var name = req.body;
    console.log("body 데이터 : ", name);
  
    //배열 형태이기 때문에 반복문을 통해 파일 정보를 알아낸다.
    req.files.map(data => {
      console.log("폼에 정의된 필드명 : ", data.fieldname);
      console.log("사용자가 업로드한 파일 명 : ", data.originalname);
      console.log("파일의 엔코딩 타입 : ", data.encoding);
      console.log("파일의 Mime 타입 : ", data.mimetype);
      console.log("파일이 저장된 폴더 : ", data.destination);
      console.log("destinatin에 저장된 파일 명 : ", data.filename);
      console.log("업로드된 파일의 전체 경로 ", data.path);
      console.log("파일의 바이트(byte 사이즈)", data.size);
    });

    res.json({ok: true, msg: "업로드 되었습니다."})   
}

//농가삭제
exports.farmDel = function (req, res) {
    var farmCode = req.query.farmCode;
    var chk = req.query.chk;
    console.log("팜코드>>>"+farmCode);
    console.log("체크>>>"+chk);
    var result = "false";

    farmModel.delFarm(farmCode).then(function(data){
        console.log("--------결과------------");
        console.log(data);
        result = "true";
        if(chk=="ask"){
            res.redirect("/admin/farm/farmAskList?result="+result);
        }else{
            res.redirect("/admin/farm/farmList?result="+result);
        }
    }).catch(function(err){
        console.log("캐치에러");
        console.log(err); 
        if(chk=="ask"){
            res.redirect("/admin/farm/farmAskList?result="+result);
        }else{
            res.redirect("/admin/farm/farmList?result="+result);
        }
    });
    
}

//농가수정화면
exports.farmEdit =async function(req,res){
    var farmCode = req.query.farmCode;
    var chk = req.query.chk; //농가리스트인지 농가승인리스트인지 구분해주는 변수
    console.log("파람스 확인");
    console.log("수정 팜코드>>>"+farmCode);
    var data = await  farmModel.getOneFarm(farmCode);
    var rImgLeng = await  farmModel.getFarmRoomImgCnt(farmCode);
    console.log("이미지카운터");
    console.log(rImgLeng);
    res.render("../pages/farm/farmEdit",{data:data,chk:chk,rImgLeng:rImgLeng});
}

//농가수정
exports.editFarm =async function(req,res){
    console.log("현재유알엘>>"+req.url);
    console.log("농가수정페이지");
    var farm = req.body;
    console.log(farm.chk);
    console.log("팜이미지 파일 출력");
    var dFarmImg = farm.dFarmImg;
    var farmImg = req.files.farmImgFile;     //넘어온 농가이미지 파일(수정)
    var roomImg = req.files.roomImgFile         //넘어온 숙소이미지 파일
    console.log("룸이미지----");
    console.log(roomImg);
    var delRimgList = farm.delRimgList;
    var dRoomImgList = [];
    var roomImgUrl;
    console.log("삭제리스트----");


    //숙소이미지 삭제리스트가 있다면 db에서 url가져오기
    if(delRimgList!=""){
        console.log("확인숙소이미지");
        dRoomImgList = delRimgList.split(",");
        roomImgUrl = await farmModel.getRoomImgUrl(dRoomImgList);   //이미지 URL 호출
    }

    //농가이미지 수정한다면 db에 url수정해서 저장하기
    if(farm.dFarmImgChk=='t'){
        console.log(farmImg[0]);
        farm.farmImg = farmImg[0].filename;   //새로운주소 db에저장
    }
    
    //농가수정
    var data = await farmModel.updateFarm(farm,roomImg,dRoomImgList).then(function(data){
        console.log("정상적임");

        //화면에서 삭제한 숙소이미지 삭제 
        if(delRimgList!=""){
            console.log("화면에서 삭제한 숙소이미지 삭제");
            for(var i=0;i<roomImgUrl.length;i++){
                var url = roomImgUrl[i].roomImgUrl;
                const path = url.substring(1,url.length);
                console.log(path);
                var df = dFile(path);     
            }
        }

        //기존 농장사진 삭제
        if(farm.dFarmImgChk=='t'){  
            console.log("기존농장사진삭제");
            const path = dFarmImg.substring(1,dFarmImg.length);
            console.log(path);
            dFile(path);    //파일삭제 함수;
        }


    }).catch(function(err){
        console.log("캐칭에러 아래 에러출력");
        console.log(err);

        //업데이트가 되지 않았다면 업로드한 농가이미지 삭제
        if(farmImg!=null){
            console.log("농가이미지 삭제");
            dFile(farmImg[0].path);
        }

        //업데이트가 되지 않았다면 업로드한 숙소이미지 삭제
        if(roomImg!=null){
            console.log("숙소이미지 삭제");
    
            for(var i=0;i<roomImg.length;i++){
                dFile(roomImg[i].path);
            }
        }
    })
  
    console.log("업데이트 완료>>>>"+data);
    console.log(data);
    if(farm.chk=="ask"){
        res.redirect("/admin/farm/farmAskList");
    }else{
        res.redirect("/admin/farm/farmList");
    }
}

//농가승인화면
exports.farmAskList =async function (req, res) {
    var results = {result:"", msg:"성공"};
    try {
        results.result = await farmModel.getFarmAskList();
    } catch (error) {
        results.result = "실패";
        results.msg = error;
    }
    console.log("리턴값체크");
    console.log(results);
    res.render("../pages/farm/farmList",{data:results.result,msg:results.msg,chk:"ask"});
}

//농가승인
exports.farmConfirm =async function (req, res) {
    console.log("확인 컨트롤러");
    console.log(req.body);
    var farmCodeList = req.body.farmCodeList;
    var userId = req.body.userId;
    console.log("팜리스트>>>"+farmCodeList.length);
    console.log("유저아이디>>>"+userId);
    var chk;
    var resString = "";
    var userToken  = "";
    await farmModel.UpdateFarmConfirm(farmCodeList,userId).then(function(data){
        chk = true;
        console.log("리턴값" +data);
        console.log(data);
        userToken = data[0].token
       
    }).catch(function(err){
        chk= false;
        resString = "등록실패하였습니다. 관리자에게 문의";
    });
    
    console.log(userToken);
    if(chk){
        
        var admin = require('../../configs/firebase');
        let message = {
            data: {
                message : JSON.stringify({
                    type:'farmConfirm',
                    title: '농가등록완료',
                    content: '신청하신 농가 등록이 완료되었습니다.',
                    imgUrl : '',
                })  
            },
            token: userToken,
        };
        console.log("체크합니다");
        await admin.messaging().send(message).then(() => {
            resString = "등록되었습니다.";
        }).catch((err) => {
            console.log(err);
            resString = "푸쉬실패";
        });


    }

    res.json(resString);
}
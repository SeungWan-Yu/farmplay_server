const {farmModel} = require("../../models/v1");
const ErrorJson = require("../../custom_modules/errorJson");
var fileDel = require('../../custom_modules/fileDelete');
var errorJson = new ErrorJson();


exports.getRoomImgListFarmCode = async(req,res) => {
    var body = req.body;
    var farmRoomImg = errorJson.farmRoomImg();
    var result;
    try {
        result = await farmModel.getRoomImgListFarmCode(body);
    } catch (error) {
        console.log(error);
        var list = [];
        list.push(farmRoomImg);
        result = list;
    }
    console.log(result);
    res.send(result); 
};


exports.getFarmUser = async(req,res) => {
    var body = req.body;
    var result;
    try {
        result = await farmModel.getFarmUser(body);
    } catch (error) {
        console.log(error);
        result = error;
    }
    res.send(result); 
};

exports.getFarmRoom = async(req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;    
    var roomImgCode = [];   //룸이미지 키값 담는 배열
    var roomImgUrl = [];    //룸이미지 주소담는 배열
    try {
        var [r1] = await farmModel.getFarm(body);
        var r2 = await farmModel.getFarmRoomImg(body);
        if([r1].length >0){
            results.message = "exist";
            if(r2.length ==0) results.message = "emptyImg";
            for(var i in r2){
                roomImgUrl.push(r2[i].roomImgUrl);
                roomImgCode.push(r2[i].roomImgCode);
            }
            r1.roomImgCode = roomImgCode;
            r1.roomImgUrl = roomImgUrl;
            results.data = [r1];
        }
 
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }
    res.send(results); 
};

exports.getFarmCheck = async(req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    try {
        results.data = await farmModel.getFarmCheck(body);
        if(results.data.length>0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }
    console.log(results);
    res.send(results); 
};

exports.getFarmList = async(req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    try {
        results.data = await farmModel.getFarmList();
        if(results.data.length>0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }
    console.log(results)
    res.send(results); 
};


exports.addFarm = async(req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    console.log("농장등록시작");
    var body = req.body;
    console.log(body);
    var farmImg = req.files.farmImgFile;     //농가이미지 파일
    var roomImg = req.files.roomImgFile;     //숙소이미지 파일
    body.farmImg = farmImg[0].filename;      //농가이미지 이름 body객체에 넣기
    
    // /*** 농가이미지 리스트맵 만들기  ***/
    // var roomImgMap = {};                    
    // var roomImgList = [];
    // for(var i in roomImg){
    //     var roomImgListMap = {};
    //     roomImgListMap.roomImgUrl = roomImg[i].filename;
    //     roomImgList.push(roomImgListMap);
    // }    
    // roomImgMap.roomImgList = roomImgList;

    try {
        results.data = await farmModel.addFarm(body,roomImg);
        results.message = "exist";
        console.log("정상");
        console.log(results.data);
    } catch (error) {
        //파일삭제
        //1.농장사진삭제
        fileDel(farmImg[0].path);
        //2.숙소사진삭제
        for(var i in roomImg){
            fileDel(roomImg[i].path);
        }
        //affectedRows 메세지는 변경된 내역이 없으므로 success,empty로 반환한다.
        if(error.message!="affectedRows"){
            results.result = "fail"
            results.message = error.message;
        }
        console.log(error.message); 
    }
    res.send(results); 
};


exports.updateFarm = async(req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    console.log("업데이트 컨트롤러")
    var farmImg = req.files.farmImgFile;     //넘어온 농가이미지 파일(수정)
    var roomImg = req.files.roomImgFile;
    var body = req.body;
    var delRoomImgList = body.delRoomImgList;
    var roomImgMap = {};
    var roomImgDelMap = {};
    var farmImgName;
    console.log("넘어온값");
    console.log(farmImg);
    console.log(roomImg);
    console.log(body);
    //업로드한 농장이미지가 있다면 
    if(farmImg!=undefined){
        body.farmImg = farmImg[0].filename; 
    }
    //업로드한 숙소이미지가 있다면
    if(roomImg != undefined){
        var roomImgList = [];
        for(var i in roomImg){
            var roomImgListMap = {};
            roomImgListMap.farmCode = body.farmCode;
            roomImgListMap.roomImgUrl = roomImg[i].filename;
            roomImgList.push(roomImgListMap);
        }    
        roomImgMap.roomImgList = roomImgList;
    }
    //삭제한 숙소이미지가 있다면
    if(delRoomImgList!=undefined){
        //타입체크
        console.log(typeof(delRoomImgList));
        if(typeof(delRoomImgList)=="string"){
            delRoomImgList = [delRoomImgList];
        }
        console.log(delRoomImgList)
        var roomImgDelList = [];
        for(var i in delRoomImgList){
            var roomImgDelListMap = {};
            roomImgDelListMap.farmCode = body.farmCode;
            roomImgDelListMap.roomImgUrl = delRoomImgList[i];
            roomImgDelList.push(roomImgDelListMap);
        }    
        roomImgDelMap.roomImgList = roomImgDelList;
    }
    //룸이미지 리스트맵 만들기.
    console.log("맵체크 룸이미지 추가")
    console.log(roomImgMap)
    console.log("맵체크 룸이미지 삭제")
    console.log(roomImgDelMap)
    console.log("바디체크")
    console.log(delRoomImgList)

    try {
        if(farmImg!=undefined){
            farmImgName = await farmModel.getFarmImg(body);
        }
        results.data = await farmModel.updateFarm(body,roomImgMap,roomImgDelMap);
        results.message = "exist";

        //농가사진 삭제 (농가이미지가 변경되었다면)
        if(farmImgName!=undefined){
            fileDel("public/uploads/"+farmImgName[0].farmImg);
        }
        //숙소사진 삭제 (삭제할 숙소사진이 있다면)
        if(delRoomImgList!=undefined){
            for(var i in delRoomImgList){
                fileDel("public/uploads/"+delRoomImgList[i]);
            }        
        }

    } catch (error) {
        //에러로 인한 파일삭제
        if(farmImg!=undefined){
             //1.농장사진삭제
            fileDel(farmImg[0].path);
        }
        if(roomImg!=undefined){
            //2.숙소사진삭제
            for(var i in roomImg){
                fileDel(roomImg[i].path);
            }        
       }
        //affectedRows 메세지는 변경된 내역이 없으므로 success,empty로 반환한다.
        if(error.message!="affectedRows"){
            results.result = "fail"
            results.message = error.message;
            console.log(error);
        }
    }
    res.send(results); 
};

exports.getFarmRecruitEnterList = async(req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    console.log(body);
    try {
        results.data = await farmModel.getFarmRecruitEnterList(body);
        if(results.data.length>0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }
    console.log(results);
    res.send(results); 
};

exports.getFarmRecruitList = async(req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    try {
        results.data = await farmModel.getFarmRecruitList(body);
        if(results.data.length>0)results.message = "exist";
    } catch (error) { 
        results.result = "fail";
        results.message = error.message;
        console.log(error);
      
    }   
    console.log(results);
    res.send(results); 
};




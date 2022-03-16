const {tourModel} = require("../../models/v1");
var tourApiModule = require("../../custom_modules/tourApiModule");

exports.getFoodList = async(req,res) => {
    var results = {result:"success" ,data:[] ,message:"empty"};
    var body = req.body;
    console.log("바디체크");
    console.log(body);
    try {
        results.data = await tourModel.getTourFoodList(body);
        if(results.data.length>0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }
    res.send(results); 
};

exports.getTourDetail = async(req,res) => {
    console.log("바디체크");
    var body = req.body;
    console.log(body);
    var results = {result:"success" ,data:[] ,message:"empty"};
    try {
      var api1 = await tourApiModule.getTourDetail(body.contentTpyeId,body.contentid);
      if(api1.result=="success"){
        results.data = api1.data;
        results.message = "exist";
      }else{
        console.log("통신에러 메세지 출력")
        console.log(api1.message);
        if(api1.message!="notData"){
            throw Error("api Error");
        }   
      }
    }catch (error) {
        console.log("에러테스트");
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }
    console.log("최종결과값 출력");
    console.log(results);
    res.send(results);
  }


exports.getTour = async(req,res) => {
    console.log("바디체크");
    var body = req.body;
    var results = {result:"success" ,data:[] ,message:"empty"};
    try {
      var api1 = await tourApiModule.getTourLocationList(body.tpyeId,body.mapx,body.mapy,body.pageNo);
      if(api1.result=="success"){
        results.data = api1.data;
        results.message = "exist";
      }else{
        console.log("통신에러 메세지 출력")
        console.log(api1.message);
        if(api1.message!="notData"){
            throw Error("api Error");
        }
        
      }
      // console.log(api1);
  
    } catch (error) {
        console.log("에러테스트");
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }
    console.log("최종결과값 출력");
    res.send(results);
  }


exports.getLodgmentList = ( req,res,next) => {
    
    const marker = [
        {
            name : "대성 호텔",
            contents:"전라북도 전주시 덕진구 반룡로 109 A동",
            latitude : 35.82430626863803,
            longitude : 127.14801122677846,
            like : 10,
            img : "lodgment.jpeg"
        },
        {
            name : "대성 펜션",
            contents:"전라북도 전주시 덕진구 반룡로 109 B동",
            latitude : 35.82430626863803,
            longitude : 127.14801122677846,
            like : 12,
            img : "lodgment.jpeg"
        }
    ]
    console.log(marker)
    res.send(marker)
};

exports.getAttractionsList = ( req,res,next) => {

    const marker = [
        {
            name : "대성 폭포",
            contents:"전라북도 전주시 덕진구 반룡로 109 A동",
            latitude : 35.82430626863803,
            longitude : 127.14801122677846,
            like : 10,
            img : "attractions.jpeg"
        },
        {
            name : "대성사",
            contents:"전라북도 전주시 덕진구 반룡로 109 B동",
            latitude : 35.82430626863803,
            longitude : 127.14801122677846,
            like : 12,
            img : "attractions.jpeg"
        }
    ]
    console.log(marker)
    res.send(marker)
};

exports.getCultureList = ( req,res,next) => {
    const marker = [
        {
            name : "대성 한옥",
            contents:"전라북도 전주시 덕진구 반룡로 109 A동",
            latitude : 35.82430626863803,
            longitude : 127.14801122677846,
            like : 10,
            img : "culture.jpeg"
        },
        {
            name : "대성",
            contents:"전라북도 전주시 덕진구 반룡로 109 B동",
            latitude : 35.82430626863803,
            longitude : 127.14801122677846,
            like : 12,
            img : "culture.jpeg"
        }
    ]
    console.log(marker)
    res.send(marker)
};

exports.getShoppingList = ( req,res,next) => {

    const marker = [
        {
            name : "대성 백화점",
            contents:"전라북도 전주시 덕진구 반룡로 109 A동",
            latitude : 35.82430626863803,
            longitude : 127.14801122677846,
            like : 10,
            img : "shopping.jpeg"
        },
        {
            name : "대성 전통 시장",
            contents:"전라북도 전주시 덕진구 반룡로 109 B동",
            latitude : 35.82430626863803,
            longitude : 127.14801122677846,
            like : 12,
            img : "shopping.jpeg"
        }
    ]
    console.log(marker)
    res.send(marker)
};

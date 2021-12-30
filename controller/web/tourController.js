const tourModel = require("../../models/web/tourModel");
const axios = require('axios');
const timer = ms => new Promise(res=>setTimeout(res,ms));
// const puppeteer = require('puppeteer');

//전역함수
function getConId(conId){
  var contentId = '&' + encodeURIComponent('contentId') + '=' + encodeURIComponent(conId);
  return contentId;
}

//스크롤 함수
async function autoScroll(page){
  console.log("스크롤시작");
  await page.evaluate(async () => {
    console.log("스크롤시작1");
      // await new Promise((resolve, reject) => {
      //   console.log("스크롤체크");
      //     var totalHeight = 0;
      //     var distance = 100;
      //     var timer = setInterval(() => {
      //         var scrollHeight = document.body.scrollHeight;
      //         console.log("스크롤길이");
      //         console.log(scrollHeight);
      //         window.scrollBy(0, distance);
      //         totalHeight += distance;

      //         if(totalHeight >= scrollHeight){
      //           console.log("스크롤호호");
      //             clearInterval(timer);
      //             resolve();
      //         }
      //     }, 100);
      // });
  });
  console.log("스크롤끝");
}

exports.getRestaurantCrawl =async function (req, res) {
  console.log("크롤링시작");
  // const browser = await puppeteer.launch({ // 브라우저 생성
  //   headless: false, // headless 사용안함
  //   defaultViewport: { // Viewport 크기 설정
  //     width: 1000,
  //     height: 670
  //   }
  // }); 
  
  // const page = await browser.newPage(); 
  // await page.goto('https://map.naver.com/v5/search/군산맛집'); 
  // const frame = page.frames().find(frame => frame.name() === 'searchIframe');
 
  // console.log("프레임");
  // console.log(frame)
  
  // await frame.waitForXPath('//*[@id="_pcmap_list_scroll_container"]/ul/li');
  // await autoScroll(frame);
  // var article= await frame.$x('//*[@id="_pcmap_list_scroll_container"]/ul/li');

  // //await page.waitForXPath('//*[@id="_pcmap_list_scroll_container"]/ul/li[1]',{timeout: 120000});
  // //const article = await page.$$('#searchIframe');
  // console.log("길이>>"+article.length);
  // console.log("길이>>"+article);
  // //await page.waitForSelector('._1EKsQ _12tNp _3in-q',{visible:true}); 
  // const links = await page.evaluate(() => { 
  // return Array.from(document.querySelectorAll('#app-root ul li a span')).map(span => (span.textContent)); // h3태그 의 text 가져옴 
  // }); 
  // console.log(links.join('\n')); 

  res.json({"data":"응"});
}


exports.getRestaurant = function (req, res) {
    console.log("레스트롱타");
    res.render("../pages/tour/restaurant");
}

exports.tourList = function (req, res) {
  console.log("투어리스트컨트롤러");
  res.render("../pages/tour/tourList");
}


exports.tourApiDelFood = async(req,res) => {
  console.log("델");
  var results = {result:"success" ,data:[] ,message:"empty"};
  try {
    var r1  =  await tourModel.getFoodCodeList();
    if(r1.length>0){
      var mapR1 = {"r1":r1};
      console.log("현재 삭제 막음");
      results.data =  await tourModel.removeTourFood(mapR1);
   }
   
    
    //results.data = await tourModel.getFarmCheck(body);
  } catch (error) {
      results.result = "fail";
      results.message = error.message;
      console.log(error);
  }
  res.send(results);
}


exports.tourApiGetFood =async (req, res) => {
  console.log("투어리스트컨트롤러234");
  var results = {result:"success" ,data:[] ,message:"empty"};
  //전역변수
  var itemLocationList = [];      //지역코드 담을 배열
  var itemFoodList = [];  //지역기반 관광정보 음식 담을 배열
  var itemFoodListMap = {}; //지역기반 관광정보 음식 담을 리스트

  var itemFoodUpdateList = [];
  var itemFoodUpdateListMap = {};

  var itemFoodImgList = [];
  var itemFoodImgListMap = {};

  //컬럼들
  const key = "wu%2BQr1R6El1Ivc8biRdmj9V4JZClWc8t%2Ff%2BA8eG82vy3Kt4txZmfSA92MBenRvoPyNLIkQUb81%2F%2BiuLX9j%2FDpw%3D%3D";
  var numOfRows  = '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('30000');
  var pageNo  = '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
  //MobileOS:IOS (아이폰), AND (안드로이드),WIN (원도우폰), ETC
  var mobileOS  = '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('AND'); 
  var mobileApp = '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('farmplay');
  var type = '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json');
  var serviceKey = encodeURIComponent('serviceKey') + '=' + key;
  //arrange: (A=제목순, B=조회순, C=수정일순, D=생성일순) , 대표이미지가 반드시 있는 정렬 (O=제목순, P=조회순, Q=수정일순, R=생성일순)
  var arrange = '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent('P');
  var contentFood = '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent('39');
  var defaultYN = '&' + encodeURIComponent('defaultYN') + '=' + encodeURIComponent('Y');
  var overviewYN = '&' + encodeURIComponent('overviewYN') + '=' + encodeURIComponent('Y');
  var imageY =   '&' + encodeURIComponent('imageYN') + '=' + encodeURIComponent('Y');
  var imageN =   '&' + encodeURIComponent('imageYN') + '=' + encodeURIComponent('N');
  
  // //******************************지역 코드 api (안씀)***********************************//

  // //지역코드 불러는 url
  // const url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode?";
  // //지역코드 파람  
  // var queryParams = serviceKey + numOfRows + pageNo + mobileOS + mobileApp + type; 
  // //지역코드 가져오기 api연동
  // try {
  //   var obj = await axios.get(url+queryParams);
  //   itemLocationList = obj.data.response.body.items.item;
  // } catch (err) {
  //   result = "지역코드 api 실패";
  //   res.json({result,err});
  // }


  //******************************지역기반 관광정보(음식) api ***********************************//

  //지역기반 관광정보 url
  const url2 = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?"

   //소개정보조회 url
  const url3 = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro?";

    //공통정보조회 url
  const url4 = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?";


  const url5 = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailImage?";
  
  //지역코드로 지역기반 관광정보 불러오기
  var queryParams2 = serviceKey + pageNo + numOfRows + mobileApp + mobileOS + arrange + contentFood  + type;
  
  
  try {
    
    var obj2 = await axios.get(url2+queryParams2);
    var item2 = obj2.data.response.body.items.item;
    var item2Length = item2.length;

    var r1= await tourModel.getFoodCodeList();
   
    console.log(r1.length);
    console.log(item2Length);
    console.log(r2);

    if(r1.length==0){
      console.log("다름");
      for(var i in item2){  
        var foodMap = {};
        foodMap.contentid       = item2[i].contentid;
        foodMap.contenttypeid   = item2[i].contenttypeid+"";
        foodMap.addr1           = item2[i].addr1+"";
        foodMap.areacode        = item2[i].areacode+"";
        foodMap.sigungucode     = item2[i].sigungucode+"";
        foodMap.firstimage      = item2[i].firstimage+"";
        foodMap.firstimage2     = item2[i].firstimage2+"";
        foodMap.mapx            = item2[i].mapx+"";
        foodMap.mapy            = item2[i].mapy+"";
        foodMap.title           = item2[i].title+"";
        foodMap.readcount       = item2[i].readcount+"";
        foodMap.dbIntro         = "N";
        foodMap.dbCommon        = "N";
        foodMap.dbImg           = "N";
        itemFoodList.push(foodMap);
      }
      itemFoodListMap.itemFoodList = itemFoodList;
      console.log(itemFoodList);
      results.data = await tourModel.addTourFood(itemFoodListMap);
    };


    var r2= await tourModel.getFoodCodeDbList();
    if(r2.length==0){
      console.log("가져올것 없음");
      res.json(results);
      return false;
    };

    //var j in r2
    for(var j in r2){
      var dbIntro = "N";
      var dbCommon = "N";
      var dbImg = "N";
      console.log("체크>>"+r2[j].foodCode);
      var queryParams3 = serviceKey + numOfRows + pageNo + mobileOS + mobileApp + getConId(r2[j].foodCode) + contentFood + type;
      var obj3 = await axios.get(url3+queryParams3,{timeout: 5000,});
      var item3 = obj3.data.response.body.items.item;
      if(item3==undefined){
        console.log("언디파인");
        item3 = {};
        item3.firstmenu="undefined";
        item3.infocenterfood="undefined";
        item3.opentimefood="undefined";
        item3.parkingfood="undefined";
        item3.treatmenu="undefined";
        item3.reservationfood="undefined";
        item3.restdatefood="undefined";
        item3.packing="undefined";
        
        console.log(item3);
      };
      dbIntro = "Y";

      //공통정보
      var queryParams4 = serviceKey + numOfRows + pageNo + mobileOS + mobileApp + getConId(r2[j].foodCode) + contentFood + defaultYN + overviewYN +type;
      var obj4 = await axios.get(url4+queryParams4,{timeout: 5000,});
      var item4 = obj4.data.response.body.items.item;
      dbCommon="Y";

     

      var queryParams5 = serviceKey + numOfRows + pageNo + mobileOS + mobileApp + getConId(r2[j].foodCode) + imageY;
      var queryParams6 = serviceKey + numOfRows + pageNo + mobileOS + mobileApp + getConId(r2[j].foodCode) + imageN;

      var obj5 = await axios.get(url5+queryParams5,{timeout: 5000,});
      var item5 = obj5.data.response.body.items.item;
      
      var obj6 = await axios.get(url5+queryParams6,{timeout: 5000,});
      var item6 = obj6.data.response.body.items.item;
      dbImg="Y";


      var foodUpdateMap = {};
      foodUpdateMap.foodCode        = r2[j].foodCode;
      foodUpdateMap.firstmenu       = item3.firstmenu+"";
      foodUpdateMap.infocenterfood  = item3.infocenterfood+"";
      foodUpdateMap.opentimefood    =  item3.opentimefood+"";
      foodUpdateMap.parkingfood     = item3.parkingfood+"";
      foodUpdateMap.treatmenu       = item3.treatmenu+"";
      foodUpdateMap.reservationfood = item3.reservationfood+"";
      foodUpdateMap.restdatefood    =  item3.restdatefood+"";
      foodUpdateMap.packing         = item3.packing+"";
      foodUpdateMap.homepage        = item4.homepage+"";
      foodUpdateMap.overview        = item4.overview+"";
      foodUpdateMap.dbIntro         = dbIntro;
      foodUpdateMap.dbCommon        = dbCommon;
      foodUpdateMap.dbImg           = dbImg;
      itemFoodUpdateList.push(foodUpdateMap);
      
      if(item5!=undefined){
        if(Array.isArray(item5)){
          for(var k in item5){
            foodImgMap = {};
            foodImgMap.foodCode = r2[j].foodCode;
            foodImgMap.originimgurl = item5[k].originimgurl+"";
            foodImgMap.imgDivision = "content";
            itemFoodImgList.push(foodImgMap);
          };
        }else{
          if(item5.originimgurl!=undefined){
            foodImgMap = {};
            foodImgMap.foodCode = r2[j].foodCode;
            foodImgMap.originimgurl = item5.originimgurl+"";
            foodImgMap.imgDivision = "content";
            itemFoodImgList.push(foodImgMap);
          }
        }
      }
     

      if(item6!=undefined){
        if(Array.isArray(item6)){
          for(var l in item6){
            foodImgMap2 = {};
            foodImgMap2.foodCode = r2[j].foodCode;
            foodImgMap2.originimgurl = item6[l].originimgurl+"";
            foodImgMap2.imgDivision = "menu";
            itemFoodImgList.push(foodImgMap2);
          };
        }else{
          if(item6.originimgurl!=undefined){
            foodImgMap2 = {};
            foodImgMap2.foodCode = r2[j].foodCode;
            foodImgMap2.originimgurl = item6.originimgurl+"";
            foodImgMap2.imgDivision = "menu";
            itemFoodImgList.push(foodImgMap2);
          }
        }
      }
      
      
    
      console.log("카운터"+j+"/"+r2.length);

    }

    // console.log("리스트확인");
    // console.log(itemFoodImgList);

    //푸드 정보 테이블
    itemFoodUpdateListMap.itemFoodUpdateList = itemFoodUpdateList;
    itemFoodImgListMap.itemFoodImgList = itemFoodImgList;
    var r3= await tourModel.updateFoodList(itemFoodUpdateListMap,itemFoodImgListMap);


    //푸드 이미지 정보 테이블
    //var r4= await tourModel.addFoodImgList(itemFoodImgListMap);


    

  } catch (error) {
    console.log("에러화면");
    console.log(itemFoodUpdateList);


    itemFoodUpdateListMap.itemFoodUpdateList = itemFoodUpdateList;
    itemFoodImgListMap.itemFoodImgList = itemFoodImgList;
    var r4= await tourModel.updateFoodList(itemFoodUpdateListMap,itemFoodImgListMap);



    results.result = "fail";
    results.message = error.message;
    console.log(error);
  }
  console.log(results);
  res.json(results);

}

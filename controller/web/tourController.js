const tourModel = require("../../models/web/tourModel");
const axios = require('axios');
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



exports.tourApiUpdate =async (req, res) => {
  console.log("투어리스트컨트롤러234");
  var results = {result:"success" ,data:[] ,message:"empty"};
  //전역변수
  var itemLocationList = [];      //지역코드 담을 배열
  var itemFoodList = [];  //지역기반 관광정보 음식 담을 배열
  var itemFoodListMap = {};


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
  
  //지역코드로 지역기반 관광정보 불러오기
  var queryParams2 = serviceKey + pageNo + numOfRows + mobileApp + mobileOS + arrange + contentFood  + type;
  
  try {
    var obj2 = await axios.get(url2+queryParams2);
    var item2 = obj2.data.response.body.items.item;
    
    for(var j in item2){
      
      // //소개정보 
      // var queryParams3 = serviceKey + numOfRows + pageNo + mobileOS + mobileApp + getConId(item2[j].contentid) + contentFood + type;
      // var obj3 = await axios.get(url3+queryParams3);
      // var item3 = obj3.data.response.body.items.item;

      // //공통정보
      // var queryParams4 = serviceKey + numOfRows + pageNo + mobileOS + mobileApp + getConId(item2[j].contentid) + contentFood + defaultYN + overviewYN +type;
      // console.log(url4+queryParams4);
      // var obj4 = await axios.get(url4+queryParams4);
      // var item4 = obj4.data.response.body.items.item;


      var foodMap = {};
      foodMap.contentid = item2[j].contentid;
      foodMap.contenttypeid = item2[j].contenttypeid;
      foodMap.addr1 = item2[j].addr1;
      foodMap.areacode = item2[j].areacode;
      foodMap.sigungucode = item2[j].sigungucode;
      foodMap.firstimage = item2[j].firstimage;
      foodMap.firstimage2 = item2[j].firstimage2;
      foodMap.mapx = item2[j].mapx;
      foodMap.mapy = item2[j].mapy;
      foodMap.title = item2[j].title;
      foodMap.readcount = item2[j].readcount;
      // foodMap.overview = item4.overview;
      itemFoodList.push(foodMap);
    }
    itemFoodListMap.itemFoodList = itemFoodList;
    console.log(itemFoodListMap);
    results.data = await tourModel.setFoodList(itemFoodListMap);
    if(results.data.affectedRows!=0)results.message = "exist";

  } catch (error) {
    results.result = "fail";
    results.message = error.message;
    console.log(error);
  }
  console.log(results);
  res.json(results);

}

const tourModel = require("../../models/web/tourModel");
const axios = require('axios');

//전역함수
function getConId(conId){
  var contentId = '&' + encodeURIComponent('contentId') + '=' + encodeURIComponent(conId);
  return contentId;
}


exports.tourList = function (req, res) {
    console.log("투어리스트컨트롤러");
    res.render("../pages/tour/tourList");
}

exports.tourApiUpdate =async function (req, res) {
  console.log("투어리스트컨트롤러234");

  //전역변수
  var result = "";    //반환 결과값 담을 변수
  var item = [];      //지역코드 담을 배열
  var itemFood = [];  //지역기반 관광정보 음식 담을 배열


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
  //   item = obj.data.response.body.items.item;
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
      itemFood.push(foodMap);
    }
  } catch (err) {
    result = "지역기반 api 실패";
    res.json({result,err});
  }

  console.log("길이"+itemFood.length);
  tourModel.setFoodList(itemFood).then(function(data){
    console.log(data)
    res.json(data);
  })


}

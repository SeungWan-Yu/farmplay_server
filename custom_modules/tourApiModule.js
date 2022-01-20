var axios = require('axios');

function getConId(conId){
    var contentId = '&' + encodeURIComponent('contentId') + '=' + encodeURIComponent(conId);
    return contentId;
}

function getMapx(mapx){
    var mapX = '&' + encodeURIComponent('mapX') + '=' + encodeURIComponent(mapx);
    return mapX;
}

function getMapy(mapy){
    var mapY = '&' + encodeURIComponent('mapY') + '=' + encodeURIComponent(mapy);
    return mapY;
}

function getNumOfRows(num){
    var numOfRows  = '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent(num);
    return numOfRows;
}

function getPageNo(num){
    var pageNo  = '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(num);
    return pageNo;
}

function getContentTpyeId(contentTpyeId){
    var contentTpyeId = '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent(contentTpyeId);
    return contentTpyeId;
}



const key = "wu%2BQr1R6El1Ivc8biRdmj9V4JZClWc8t%2Ff%2BA8eG82vy3Kt4txZmfSA92MBenRvoPyNLIkQUb81%2F%2BiuLX9j%2FDpw%3D%3D";
var serviceKey = encodeURIComponent('serviceKey') + '=' + key;
var numOfRows  = '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('50000');
var pageNo  = '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
 //MobileOS:IOS (아이폰), AND (안드로이드),WIN (원도우폰), ETC
 var mobileOS  = '&' + encodeURIComponent('MobileOS') + '=' + encodeURIComponent('AND'); 
 var mobileApp = '&' + encodeURIComponent('MobileApp') + '=' + encodeURIComponent('farmplay');
 var type = '&' + encodeURIComponent('_type') + '=' + encodeURIComponent('json');
//arrange: (A=제목순, B=조회순, C=수정일순, D=생성일순) , 대표이미지가 반드시 있는 정렬 (O=제목순, P=조회순, Q=수정일순, R=생성일순)
var arrange = '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent('P');
var arrangeLocation = '&' + encodeURIComponent('arrange') + '=' + encodeURIComponent('E');
var contentFood = '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent('39');
var contentLodgment = '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent('32');
var contentAttractions = '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent('12');
var contentCulture = '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent('14');
var contentShopping = '&' + encodeURIComponent('contentTypeId') + '=' + encodeURIComponent('38');
var defaultYN = '&' + encodeURIComponent('defaultYN') + '=' + encodeURIComponent('Y');
var overviewYN = '&' + encodeURIComponent('overviewYN') + '=' + encodeURIComponent('Y');
var imageY =   '&' + encodeURIComponent('imageYN') + '=' + encodeURIComponent('Y');
var imageN =   '&' + encodeURIComponent('imageYN') + '=' + encodeURIComponent('N');
var radius = '&' + encodeURIComponent('radius') + '=' + encodeURIComponent('30000');


//위치기반 관광정보 url
const url1 = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/locationBasedList?"

//지역기반 관광정보 url
const url2 = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?"

//소개정보조회 url
const url3 = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro?";

//공통정보조회 url
const url4 = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?";

//이미지정보조회 url
const url5 = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailImage?";

//반복정보조회 url
const url6 = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailInfo?";

//위치기반 관광정보 불러오기
async function getTourLocation(tpyeId,mapx,mapy,pageNo){
    var results = {result:"success" ,data:"" ,message:""};
    var dataList = [];
    console.log("관광함수")
    try {
        var contentTpyeId = getContentTpyeId(tpyeId);
        var queryParams = serviceKey + getNumOfRows(10) + getPageNo(pageNo) + mobileOS + mobileApp + arrangeLocation + contentTpyeId +getMapx(mapx) +getMapy(mapy) +radius;

        var obj = await axios.get(url1+queryParams);
        var item =  obj.data.response.body.items.item;
        var arrayChk = Array.isArray(item)
        
        if(item==undefined){
            throw Error("notData");
        }

        if(!arrayChk){
            item = [item];
        }
        console.log(item);

        for(var i in item){
            var imgMainList = [];
            var imgMenuList = [];
            console.log(i)
            var contentid = item[i].contentid;

            var promiseList = [getTourIntro(contentTpyeId,contentid), getTourCommon(contentTpyeId,contentid), getTourImg(contentid,"Y")];
            if(tpyeId==39){
                promiseList.push(getTourImg(contentid,"N"));
            }   
            
            var promiseRes =await Promise.all(promiseList);

            var r1 = promiseRes[0];
            var r2 = promiseRes[1];
            var r3 = promiseRes[2];
            var r4;

            
            // var r1 = await getTourIntro(contentTpyeId,contentid);
            // var r2 = await getTourCommon(contentTpyeId,contentid);
            // var r3 = await getTourImg(contentid,"Y");
            // var r4;

            // if(tpyeId==39){
            //     r4 = await getTourImg(contentid,"N");
            // }   


            if(tpyeId==39){
                r4 =  promiseRes[3];
                if(r4.data==undefined){
                    imgMenuList = null;
                }else{
                    var chk1 =  Array.isArray(r4.data);
                    if(chk1){
                        for(var j in r4.data){
                            imgMenuList.push(r4.data[j].originimgurl);
                        } 
                    }else{
                        imgMenuList.push(r4.data.originimgurl);
                    }
    
                }
            }

            
            if(r3.data==undefined){
                imgMainList = null;
            }else{
                var chk2 =  Array.isArray(r3.data);
                if(chk2){
                    for(var k in r3.data){
                        imgMainList.push(r3.data[k].originimgurl);
                    } 
                }else{
                    imgMainList.push(r3.data.originimgurl);
                }

            }

            if(r1.result!="success" && r2.result!="success" && r3.result!="success"){
                throw Error("apiError");
            }
            
            var dataMap = {};
            dataMap.contentid       = item[i].contentid;
            dataMap.contenttypeid   = item[i].contenttypeid+"";
            dataMap.addr1           = item[i].addr1+"";
            dataMap.firstimage      = item[i].firstimage+"";
            dataMap.dist            = item[i].dist+"";
            dataMap.title           = item[i].title+"";
            dataMap.readcount       = item[i].readcount+"";
            dataMap.mapx            = item[i].mapx+"";
            dataMap.mapy            = item[i].mapy+"";
            dataMap.overview        = r2.data.overview+"";
            dataMap.homepage        = r2.data.homepage+"";
            dataMap.mainImgList     = imgMainList;
            if(tpyeId==39){
                dataMap.menuImgList     = imgMenuList;
            }
            
            //식당
            if(tpyeId==39){
                dataMap.infocenter      = r1.data.infocenterfood+"";
                dataMap.opentime    = r1.data.opentimefood+"";
                dataMap.parking     = r1.data.parkingfood+"";
                dataMap.firstmenu       = r1.data.firstmenu+"";
                dataMap.treatmenu       = r1.data.treatmenu+"";
                dataMap.reservation     = r1.data.reservationfood+"";
                dataMap.restdate        = r1.data.restdatefood+"";
                dataMap.packing         = r1.data.packing+"";
            //숙박
            }else if(tpyeId ==32){
                dataMap.checkintime         = r1.data.checkintime+"";
                dataMap.checkouttime        = r1.data.checkouttime+"";
                dataMap.chkcooking          = r1.data.chkcooking+"";
                dataMap.foodplace           = r1.data.foodplace+"";
                dataMap.infocenter          = r1.data.infocenterlodging+"";
                dataMap.parking             = r1.data.parkinglodging+"";
                dataMap.reservation         = r1.data.reservationlodging+"";
                dataMap.roomcount           = r1.data.roomcount+"";
                dataMap.roomtype            = r1.data.roomtype+"";
                dataMap.subfacility         = r1.data.subfacility+"";
            //명소
            }else if(tpyeId ==12){
                dataMap.chkbabycarriage     = r1.data.chkbabycarriage+"";
                dataMap.chkcreditcard       = r1.data.chkcreditcard+"";
                dataMap.chkpet              = r1.data.chkpet+"";
                dataMap.infocenter          = r1.data.infocenter+"";
                dataMap.parking             = r1.data.parking+"";
                dataMap.usetime             = r1.data.usetime+"";
                dataMap.restdate            = r1.data.restdate+"";
            //문화
            }else if(tpyeId ==14){
                dataMap.chkbabycarriage     = r1.data.chkbabycarriageculture+"";
                dataMap.chkcreditcard       = r1.data.chkcreditcardculture+"";
                dataMap.chkpet              = r1.data.chkpetculture+"";
                dataMap.infocenter          = r1.data.infocenterculture+"";
                dataMap.parking             = r1.data.parkingculture+"";
                dataMap.usetime             = r1.data.usetimeculture+"";
                dataMap.restdate            = r1.data.restdateculture+"";
                dataMap.usefee              = r1.data.usefee+"";
            //쇼핑    
            }else if(tpyeId ==38){
                dataMap.chkbabycarriage     = r1.data.chkbabycarriageshopping+"";
                dataMap.chkcreditcard       = r1.data.chkcreditcardshopping+"";
                dataMap.chkpet              = r1.data.chkpetshopping+"";
                dataMap.infocenter          = r1.data.infocentershopping+"";
                dataMap.parking             = r1.data.parkingshopping+"";
                dataMap.restroom            = r1.data.restroom+"";
                dataMap.restdate            = r1.data.restdateshopping+"";
                dataMap.saleitemcost        = r1.data.saleitemcost+"";
                dataMap.shopguide           = r1.data.shopguide+"";
            };

            dataList.push(dataMap);
        }

        results.data = dataList;
    } catch (error) {
        console.log(error);
        results.result = "fail";
        results.data = error;
        results.message = error.message;
    } finally{
        return results;
    }

};



//지역기반 관광정보 불러오기
async function getTourArea(division){
    var results = {result:"success" ,data:"" ,message:""};
    var dataList = [];
    try {
        var content;
        if(division=="음식")content = contentFood;
        if(division=="숙박")content = contentLodgment;
        if(division=="명소")content = contentAttractions;
        if(division=="문화")content = contentCulture;
        if(division=="쇼핑")content = contentShopping;
        if(division=="관광")content = "";
        var queryParams = serviceKey + pageNo + numOfRows + mobileApp + mobileOS + arrange + content  + type;

        var obj = await axios.get(url2+queryParams);
        var item =  obj.data.response.body.items.item;
        for(var i in item){
            var dataMap = {};
            dataMap.contentid       = item[i].contentid;
            dataMap.contenttypeid   = item[i].contenttypeid+"";
            dataMap.addr1           = item[i].addr1+"";
            dataMap.areacode        = item[i].areacode+"";
            dataMap.sigungucode     = item[i].sigungucode+"";
            dataMap.firstimage      = item[i].firstimage+"";
            dataMap.mapx            = item[i].mapx+"";
            dataMap.mapy            = item[i].mapy+"";
            dataMap.title           = item[i].title+"";
            dataMap.readcount       = item[i].readcount+"";
            dataList.push(dataMap);
        }

        results.data = dataList;
    } catch (error) {
        console.log(error);
        results.result = "fail";
        results.data = error;
        results.message = error.message;
    } finally{
        return results;
    }

};

//소개정보 불러오기
async function getTourIntro(contentTpyeId,contentId){
    var results = {result:"success" ,data:"" ,message:""};
    try {
        var queryParams = serviceKey + numOfRows + pageNo + mobileOS + mobileApp + getConId(contentId) + contentTpyeId + type;
        var obj = await axios.get(url3+queryParams,{timeout: 5000,}); 
        var item = obj.data.response.body.items.item;
        results.data = item;
    } catch (error) {
        console.log(error);
        results.result = "fail";
        results.data = error;
        results.message = error.message;
    } finally{
        return results;
    }

};

//공통정보 불러오기
async function getTourCommon(contentTpyeId,contentId){
    var results = {result:"success" ,data:"" ,message:""};
    try {
       
        var queryParams =  serviceKey + numOfRows + pageNo + mobileOS + mobileApp + getConId(contentId) + contentTpyeId + defaultYN + overviewYN +type;
        var obj = await axios.get(url4+queryParams,{timeout: 5000,}); 
        var item = obj.data.response.body.items.item;
        results.data = item;
    } catch (error) {
        console.log(error);
        results.result = "fail";
        results.data = error;
        results.message = error.message;
    } finally{
        return results;
    }

};

//이미지정보 불러오기
async function getTourImg(contentId,imgChk){
    var results = {result:"success" ,data:"" ,message:""};
    var queryParams;
    try {
        if(imgChk=="Y"){
            queryParams = serviceKey + numOfRows + pageNo + mobileOS + mobileApp + getConId(contentId) + imageY;
        }else{
            queryParams = serviceKey + numOfRows + pageNo + mobileOS + mobileApp + getConId(contentId) + imageN;
        }
        var obj = await axios.get(url5+queryParams,{timeout: 5000,}); 
        var item = obj.data.response.body.items.item;
        results.data = item;
    } catch (error) {
        console.log(error);
        results.result = "fail";
        results.data = error;
        results.message = error.message;
    } finally{
        return results;
    }

};


//반복정보 불러오기
async function getTourRepeat(contentTpyeId,contentId){
    var results = {result:"success" ,data:"" ,message:""};
    try {
        var queryParams = serviceKey + numOfRows + pageNo + mobileOS + mobileApp + getConId(contentId) + contentTpyeId + defaultYN + overviewYN +type;
        var obj = await axios.get(url6+queryParams,{timeout: 5000,}); 
        var item = obj.data.response.body.items.item;
        results.data = item;
    } catch (error) {
        console.log(error);
        results.result = "fail";
        results.data = error;
        results.message = error.message;
    } finally{
        return results;
    }

};



module.exports = {
    getTourArea,
    getTourIntro,
    getTourCommon,
    getTourLocation,
    getTourImg,
    getTourRepeat,
};
var axios = require('axios');

//결제 취소 함수 
async function payCancel(paymentKey,reason){
    var results = {result:"success" ,data:"" ,message:""};
    try {
        //결재취소 api
        console.log("결제취소시작");
        var cancelData =  {"cancelReason" : reason};
        var response = await axios.post('https://api.tosspayments.com/v1/payments/'+paymentKey+'/cancel',cancelData, {
            headers: {
                'Authorization':'Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==',
                'Content-Type': 'application/json',
            }
        });
        results.data = response.data;
    } catch (error) {
        console.log("결제취소 에러발생");
        console.log(error);
        results.result = "fail";
        results.data = error;
        results.message = error.message;
    }finally{
        return results;
    }
};


//결제 조회 함수 
async function paySearch(orderId){
    var results = {result:"success" ,data:"" ,message:""};
    try {
        //결재조회 api
        console.log("결제조회시작");
        var response = await axios.get('https://api.tosspayments.com/v1/payments/orders/'+orderId, {
            headers: {
                'Authorization':'Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==',
            }
        });
        results.data = response.data;
    } catch (error) {
        console.log("결제조회 에러발생");
        console.log(error);
        results.result = "fail";
        results.data = error;
        results.message = error.message;
    }finally{
        return results;
    }
};

//결제 승인 함수 
async function payApprove(paymentKey,formData){
    var results = {result:"success" ,data:"" ,message:""};
    try {
        //결재조회 api
        console.log("결제승인시작");

        var response = await axios.post('https://api.tosspayments.com/v1/payments/'+paymentKey,formData, {
            headers: {
                'Authorization':'Basic dGVzdF9za196WExrS0V5cE5BcldtbzUwblgzbG1lYXhZRzVSOg==',
                'Content-Type': 'application/json',
            }
        });
        results.data = response.data;

    } catch (error) {
        console.log("결제승인 에러발생");
        console.log(error);
        results.result = "fail";
        results.data = error;
        results.message = error.message;
    }finally{
        return results;
    }
};





module.exports = {
    payCancel,
    paySearch,
    payApprove,
};
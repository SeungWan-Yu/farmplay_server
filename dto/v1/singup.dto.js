class Singup{
    
    constructor(){
        this.user_id = "";
        this.user_pw = "";
        this.user_name = "";
        this.user_phone = "";
        this.user_adress = "";
        this.user_adress_detail = "";
        this.token = "";
    }

    setSingup(body){
        this.user_id = body.id;
        this.user_pw = body.pw;
        this.user_name = body.name;
        this.user_phone = body.phone;
        this.user_adress = body.adress;
        this.user_adress_detail = body.adressdetail;
        this.token = body.token;
    };
    
    


}



module.exports = Singup;
class Recruit{
    
    constructor(){
        this.recuritCode            = 0;
        this.recuritFarmCode        = 0;
        this.recuritState           = "";
        this.recuritUserId          = "";
        this.recuritStart           = "";
        this.recuritEnd             = "";
        this.recuritJobStart        = "";
        this.recuritJobEnd          = "";
        this.recuritJobKind         = "";
        this.recuritMealProvide     = "";
        this.recuritMealVeget       = "";
        this.recuritMealMemo        = "";
        this.recuritChkFampler      = "";
        this.recuritChkPeriod       = "";
        this.recuritChkMinor        = "";
        this.recuritChkMinorMemo    = "";
        this.recuritChkMax          = 0;
        this.recuritChkSummary      = "";
    }

    setRecruit(body){
        this.recuritCode            = body.recuritCode;
        this.recuritFarmCode        = body.recuritFarmCode;
        this.recuritState           = body.recuritState;
        this.recuritUserId          = body.recuritUserId;
        this.recuritStart           = body.recuritStart;
        this.recuritEnd             = body.recuritEnd;
        this.recuritJobStart        = body.recuritJobStart;
        this.recuritJobEnd          = body.recuritJobEnd;
        this.recuritJobKind         = body.recuritJobKind;
        this.recuritMealProvide     = body.recuritMealProvide;
        this.recuritMealVeget       = body.recuritMealVeget;
        this.recuritMealMemo        = body.recuritMealMemo;
        this.recuritChkFampler      = body.recuritChkFampler;
        this.recuritChkPeriod       = body.recuritChkPeriod;
        this.recuritChkMinor        = body.recuritChkMinor;
        this.recuritChkMinorMemo    = body.recuritChkMinorMemo;
        this.recuritChkMax          = body.recuritChkMax;
        this.recuritChkSummary      = body.recuritChkSummary;
    };
    
    


}



module.exports = Recruit;
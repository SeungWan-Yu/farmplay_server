
class Farm{

    getEnterList(rlt,dt,msg) {
        if(rlt=="fail"){;
            dt = []
        }
        var dataMap = {
            result : rlt,
            data : dt,
            message : msg,
        };
        return dataMap;
    }; 

    getRecruitList(rlt,dt,msg) {
        if(rlt=="fail"){;
            dt = []
        }
        var dataMap = {
            result : rlt,
            data : dt,
            message : msg,
        };
        return dataMap;
    }; 
};

module.exports = Farm;
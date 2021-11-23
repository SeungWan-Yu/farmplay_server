var con = require('../../mysql-db');
const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/web/user.xml']);


module.exports = {
    
    getUserList : function(){
        var param ={};
        var query = mybatisMapper.getStatement('webUserMapper', 'getUserList', param, format);
        return new Promise((resolve,reject) =>{       
            console.log("결과1>>"+con)
            con.query(query, 
            function (err, result, fields) {
                if(err){
                    console.log("모델에러발생");
                    reject(err)
                }else{
                    console.log("결과>>"+result)
                    resolve(result)
                }
            });
        });
    },

    delUser : function(id){
        return new Promise((resolve,reject) =>{
            console.log("아이디값>>"+id)
            con.query("DELETE FROM users WHERE user_id ="+"'"+id+"'", 
            function (err, result, fields) {
                if(err){
                    reject(err)
                }else{
                    console.log("결과>>"+result)
                    resolve(result)
                }
            });
        });
    },

    getOneUser : function(id){
        return new Promise((resolve,reject) =>{         
            console.log("아이디값>>"+id)
            con.query("SELECT * FROM users WHERE user_id ="+"'"+id+"'", 
            function (err, result, fields) {
                if(err){
                    reject(err)
                }else{
                    console.log("결과>>"+result)
                    resolve(result)
                }
            });
        });
    },

    updateUser : function(user){
        return new Promise((resolve,reject) =>{
            con.query("UPDATE ussers SET user_name="+"'"+user.uName+"', user_phone="+"'"+user.uPhone+"', user_adress="+"'"+user.uAddr+"', user_adress_detail="+"'"+user.uAddrDetail+"'  WHERE  user_id = "+"'"+user.uId+"'", 
            function (err, result, fields) {
                if(err){
                    reject(err)
                }else{
                    console.log("결과>>"+result)
                    resolve(result)
                }
            }); 
        });
    },

}

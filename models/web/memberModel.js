const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/web/webUser.xml']);


module.exports = {
    
    getUserList : async function(con){
        var query = mybatisMapper.getStatement('webUserMapper','getUserList');
        var [rows] = await con.query(query);
        return rows;
    },

    removeUser :async function(con,body){
        var query = mybatisMapper.getStatement('webUserMapper','removeUser',body);
        var [rows] = await con.query(query);
        return rows;
    },

    getOneUser :async function(con,id){
        var query = mybatisMapper.getStatement('webUserMapper','getOneUser',id);
        var [rows] = await con.query(query);
        return rows;
    },

    updateUser :async function(con,body){
        var query = mybatisMapper.getStatement('webUserMapper','updateUser',body);
        var [rows] = await con.query(query);
        return rows;
    },

}

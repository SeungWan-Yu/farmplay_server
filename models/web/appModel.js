const pool = require('../../configs/mysql2-db');
const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/web/webApp.xml']);


module.exports = {

    getBannerList : async function(con){
        var query = mybatisMapper.getStatement('webAppMapper','getBannerList');
        var [rows] = await con.query(query);
        return rows;
    },

    updateBannerList : async function(con,map){
        console.log("모델체크");
        console.log(map);
        var query = mybatisMapper.getStatement('webAppMapper','updateBannerList',map);
        var [rows] = await con.query(query);
        return rows;
    },

    insertBannerList : async function(con,map){
        var query = mybatisMapper.getStatement('webAppMapper','insertBannerList',map);
        var [rows] = await con.query(query);
        return rows;
    },

    deleteBannerList : async function(con,map){
        var query = mybatisMapper.getStatement('webAppMapper','deleteBannerList',map);
        var [rows] = await con.query(query);
        return rows;
    },
}

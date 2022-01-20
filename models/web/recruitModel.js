const mybatisMapper = require('mybatis-mapper');
const format = {language: 'sql', indent: ''};
mybatisMapper.createMapper(['./mapper/web/webRecruit.xml']);


module.exports = {
    
    getRecruitList : async function(con){
        var query = mybatisMapper.getStatement('webRecruitMapper','getRecruitList');
        var [rows] = await con.query(query);
        return rows;
    },
  
}

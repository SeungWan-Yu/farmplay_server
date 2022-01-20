const recruitModel = require("../../models/web/recruitModel");
const pool = require('../../configs/mysql2-db');


exports.getRecruitList = async (req,res) => {
    console.log("모집리스트");
    const con = await pool.getConnection();
    var results = {result:"success" ,data:[] ,message:"empty"};
    try {
        results.data = await recruitModel.getRecruitList(con);
        if(results.data.length>0)results.message = "exist";
    } catch (error) {
        results.result = "fail";
        results.message = error.message;
        console.log(error);
    }finally{
        con.release();
        console.log(results);
        res.render("../pages/recruit/recruitList",results);
    }

}



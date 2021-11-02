const Library   = require('../models/certifi');
const Sequelize   = require('./module');

module.exports = {
  ListAll : async function(res){
    try {
      const object = await Library.findAll({raw : true });
      console.log("인증정보 전부 가져옴",object);
      return res.json(object);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },//ListAll

  List    : async function(req, res){
    try {
      const object = await Library.findAll({
        where: {phone: req.params.id}, raw : true 
      });
      console.log("특정 인증정보 가져옴", object);
      return res.json(object);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },//List

  Count   : async function(req, res){
    try {
      const object = await Library.count({
        where: {phone: req.params.id}
      });
      console.log("갯수 가져옴",object);
      return res.json(object);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },//List

  Insert  : async function(req, res){
    try {
      const object = await Library.create({
        phone: req.body.phone,
        code: req.body.code,
      });
      console.log(object);
      return res.status(201).json(object);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },//Insert

  Update  : async function(req, res){
    try{
      const result = await Library.update({
        code: req.body.code,
      },{
        where: {phone: req.params.id}
      });
      return res.json(result);
    }
    catch(err){ 
      console.error(err);
      next(err);
    }
  },//Update

  Delete  : async function(req, res){
    try{
      const result = await Library.destroy({
        where: {phone: req.params.id}
      });
      return res.json(result);
    }
    catch(err){
      console.error(err); 
      next(err);
    }
  },//Delete
  
  Transactions : async function(req, res){

    const t = await Sequelize.transaction();
    try {
        
        //ex
        const result2 = await Library.destroy({
          where: {phone: req.params.id}
        }, { transaction: t });
        console.log("콘솔", result2);
        
        const result = await Library.create({
          phone: req.body.phone,
          code: req.body.code,
        }, { transaction: t });

        const result1 = await Library.findAll({
        raw : true
        }, { transaction: t });
        
        if(result1[0].phone === "01074966630")
        {
          console.log("콘솔test", result1[0].phone);
          throw new Error();
        }
        //Ex end

        await t.commit();
        return res.json(result2);
    } 
    catch (error) {
      console.log('트랜젝션 에러, 롤백');
      await t.rollback();
    }
  },//Transaction

}//module
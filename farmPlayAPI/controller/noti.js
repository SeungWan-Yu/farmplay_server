const Library   = require('../models/noti');
const Sequelize   = require('./module');

module.exports = {
  ListAll : async function(res){
    try {
      const object = await Library.findAll({raw : true });
      console.log("공지 전부 가져옴",object);
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
      console.log("특정 공지 가져옴", object);
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

        name: req.body.name,
        code: req.body.code,
        category: req.body.category,
        token: req.body.token,
        
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

        name: req.body.name,
        code: req.body.code,
        category: req.body.category,

      },{
        where: {token: req.params.id}
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
        where: {token: req.params.id}
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
        const result = await Library.findAll({
        raw : true
        }, { transaction: t });
        /*
        if(result[0].???? === "01074966630")
        {
          console.log("콘솔test");
          throw new Error();
        }
        */
        //Ex end

        await t.commit();
        return res.json(result);
    } 
    catch (error) {
      console.log('트랜젝션 에러, 롤백');
      await t.rollback();
    }
  },//Transaction

}//module
const Library   = require('../models/door');
const Sequelize   = require('./module');

module.exports = {
  ListAll : async function(res){
    try {
      const object = await Library.findAll({raw : true });
      console.log("정보 전부 가져옴",object);
      return res.json(object);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },//ListAll

  List    : async function(req, res){
    try {
      const object = await Library.findAll({
        where: {token: req.params.id}, raw : true 
      });
      console.log("특정 정보 가져옴", object);
      return res.json(object);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },//List

  Count   : async function(req, res){
    try {
      const object = await Library.count({
        where: {token: req.params.id}
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

        door1: req.body.door1,
        door2: req.body.door2,
        door3: req.body.door3,
        door4: req.body.door4,
        name: req.body.name,
        token: req.body.token,
        state: req.body.state,
        somunstate: req.body.somunstate,
        
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

        door1: req.body.door1,
        door2: req.body.door2,
        door3: req.body.door3,
        door4: req.body.door4,
        name: req.body.name,
        state: req.body.state,
        somunstate: req.body.somunstate,

      },{
        where: {token: req.params.id, name:req.body.name}
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
        where: {token: req.params.id, name:req.body.name}
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
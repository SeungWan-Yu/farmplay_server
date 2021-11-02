const Library = require('../models/beebox');
const Sequelize   = require('./module');


module.exports = {
  ListAll : async function(res){
    try {
      const object = await Library.findAll({raw : true });
      console.log("벌통정보 전부 가져옴",object);
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
      console.log("특정 벌통정보 가져옴", object);
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
        name: req.body.name,
        temp: req.body.temp,
        humi: req.body.humi,
        date: req.body.date,
        batt: req.body.batt,
        net: req.body.net,
        token: req.body.token,
        datetest: req.body.datetest,
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
        temp: req.body.temp,
        humi: req.body.humi,
        date: req.body.date,
        batt: req.body.batt,
        net: req.body.net,
        datetest: req.body.datetest,
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
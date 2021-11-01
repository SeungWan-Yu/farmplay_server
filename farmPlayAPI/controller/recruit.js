const Library   = require('../models/recruit');
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
        where: {recuritCode: req.params.id}, raw : true 
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
        where: {recuritCode: req.params.id}
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

        recuritCode: req.body.recuritCode,
        recuritFarmCode: req.body.recuritFarmCode,
        recuritState: req.body.recuritState,
        recuritUserId: req.body.recuritUserId,
        recuritStart: req.body.recuritStart,
        recuritEnd: req.body.recuritEnd,
        recuritJobStart: req.body.recuritJobStart,
        recuritJobEnd: req.body.recuritJobEnd,
        recuritJobKind: req.body.recuritJobKind,
        recuritMealProvide: req.body.recuritMealProvide,
        recuritMealVeget: req.body.recuritMealVeget,
        recuritMealMemo: req.body.recuritMealMemo,
        recuritChkFampler: req.body.recuritChkFampler,
        recuritChkPeriod: req.body.recuritChkPeriod,
        recuritChkMinor: req.body.recuritChkMinor,
        recuritChkMinorMemo: req.body.recuritChkMinorMemo,
        recuritChkMax: req.body.recuritChkMax,
        recuritChkSummary: req.body.recuritChkSummary,
        
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

        recuritFarmCode: req.body.recuritFarmCode,
        recuritState: req.body.recuritState,
        recuritUserId: req.body.recuritUserId,
        recuritStart: req.body.recuritStart,
        recuritEnd: req.body.recuritEnd,
        recuritJobStart: req.body.recuritJobStart,
        recuritJobEnd: req.body.recuritJobEnd,
        recuritJobKind: req.body.recuritJobKind,
        recuritMealProvide: req.body.recuritMealProvide,
        recuritMealVeget: req.body.recuritMealVeget,
        recuritMealMemo: req.body.recuritMealMemo,
        recuritChkFampler: req.body.recuritChkFampler,
        recuritChkPeriod: req.body.recuritChkPeriod,
        recuritChkMinor: req.body.recuritChkMinor,
        recuritChkMinorMemo: req.body.recuritChkMinorMemo,
        recuritChkMax: req.body.recuritChkMax,
        recuritChkSummary: req.body.recuritChkSummary,

      },{
        where: {recuritCode: req.params.id}
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
        where: {recuritCode: req.params.id}
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
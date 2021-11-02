const Library   = require('../models/farmpler');
const Sequelize   = require('./module');

module.exports = {
  ListAll : async function(res){
    try {
      const object = await Library.findAll({raw : true });
      console.log("유저정보 전부 가져옴",object);
      return res.json(object);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },//ListAll

  List    : async function(req, res){
    try {
      const object = await Library.findAll({
        where: {enterCode: req.params.id}, raw : true 
      });
      console.log("특정 유저정보 가져옴", object);
      return res.json(object);
    } catch (err) {
      console.error(err);
      next(err);
    }
  },//List

  Count   : async function(req, res){
    try {
      const object = await Library.count({
        where: {enterCode: req.params.id}
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

        enterCode: req.body.enterCode,
        enterfarmCode: req.body.enterfarmCode,
        enterRecuritCode: req.body.enterRecuritCode,
        enterUserId: req.body.enterUserId,
        enterUserName: req.body.enterUserName,
        enterUserPhoto: req.body.enterUserPhoto,
        enterUserRating: req.body.enterUserRating,
        enterReporting: req.body.enterReporting,
        enterStart: req.body.enterStart,
        enterEnd: req.body.enterEnd,
        enterEditStart: req.body.enterEditStart,
        enterEditEnd: req.body.enterEditEnd,
        enterFarmplerIntro: req.body.enterFarmplerIntro,
        enterCancelReson: req.body.enterCancelReson,
        enterEditReson: req.body.enterEditReson,
        enterState: req.body.enterState,
        
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

        enterfarmCode: req.body.enterfarmCode,
        enterRecuritCode: req.body.enterRecuritCode,
        enterUserId: req.body.enterUserId,
        enterUserName: req.body.enterUserName,
        enterUserPhoto: req.body.enterUserPhoto,
        enterUserRating: req.body.enterUserRating,
        enterReporting: req.body.enterReporting,
        enterStart: req.body.enterStart,
        enterEnd: req.body.enterEnd,
        enterEditStart: req.body.enterEditStart,
        enterEditEnd: req.body.enterEditEnd,
        enterFarmplerIntro: req.body.enterFarmplerIntro,
        enterCancelReson: req.body.enterCancelReson,
        enterEditReson: req.body.enterEditReson,
        enterState: req.body.enterState,

      },{
        where: {enterCode: req.params.id}
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
        where: {enterCode: req.params.id}
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
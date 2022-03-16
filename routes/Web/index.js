var express = require('express');
var router = express.Router();

var interceptor = function(req, res, next) {
    var uid = req.session.uid;
    if(req.url=="/loginPage" || req.url=="/login"){
        next();
    }else{
        if(uid==null){
            res.redirect("/admin/loginPage");
        }else{
            next();
        }
    }       
};


router.use('/', interceptor,require('./mainRouter'))
router.use('/member',interceptor,require('./memberRouter'));
router.use('/farm',interceptor,require('./farmRouter'));
router.use('/recruit',interceptor, require('./recruitRouter'));
router.use('/farmpler',interceptor, require('./farmplerRouter'));
router.use('/apiApp',interceptor, require('./appApiRouter'));
router.use('/tour',interceptor, require('./tourRouter'));
router.use('/app',interceptor, require('./appRouter'));

module.exports = router;
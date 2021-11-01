const express = require('express');

const Hive          = require('./beebox');
const Certification = require('./certifi');
const Door          = require('./door');
const RoomImg       = require('./farm_room_img');
const Farm          = require('./farm');
const FarmPlayer    = require('./farmpler');
const Notification  = require('./noti');
const Recruit       = require('./recruit');
const Temperature   = require('./tem');
const TempData      = require('./thdata');
const User          = require('./users');

const router = express.Router();

router.use('/hive',Hive);
router.use('/certify',Certification);
router.use('/door',Door);
router.use('/roomimg',RoomImg);
router.use('/farm',Farm);
router.use('/player',FarmPlayer);
router.use('/notice',Notification);
router.use('/recruit',Recruit);
router.use('/temp',Temperature);
router.use('/tempdata',TempData);
router.use('/user',User);

module.exports = router;
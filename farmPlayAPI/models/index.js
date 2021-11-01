const Sequelize = require('sequelize');

const beebox        = require('./beebox');
const certify       = require('./certifi');
const door          = require('./door');
const room_img      = require('./farm_room_img');
const farm          = require('./farm');
const farmplayer    = require('./farmpler');
const notify        = require('./noti');
const recruit       = require('./recruit');
const temperature   = require('./tem');
const environment   = require('./thdata');
const user          = require('./users');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.beebox       = beebox;
db.certify      = certify;
db.door         = door;
db.room_img     = room_img;
db.farm         = farm;
db.farmplayer   = farmplayer;
db.notify       = notify;
db.recruit      = recruit;
db.temperature  = temperature;
db.environment  = environment;
db.user         = user;

beebox.init(sequelize);
certify.init(sequelize);
door.init(sequelize);
room_img.init(sequelize);
farm.init(sequelize);
farmplayer.init(sequelize);
notify.init(sequelize);
recruit.init(sequelize);
temperature.init(sequelize);
environment.init(sequelize);
user.init(sequelize);

beebox.associate(db);
certify.associate(db);
door.associate(db);
room_img.associate(db);
farm.associate(db);
farmplayer.associate(db);
notify.associate(db);
recruit.associate(db);
temperature.associate(db);
environment.associate(db);
user.associate(db);

module.exports = db;

const Sequelize = require('sequelize');

module.exports = class farmPlayer extends Sequelize.Model{
    static init(sequelize) {
        return super.init({

            enterCode:       {
                type: Sequelize.INTEGER(11).UNSIGNED,
                primaryKey: true,
                autoIncrement: true // Automatically gets converted to SERIAL for postgres
            },

            enterfarmCode:    {
                type: Sequelize.INTEGER(11).UNSIGNED,
                allowNull: false,
            },

            enterRecuritCode:    {
                type: Sequelize.INTEGER(11).UNSIGNED,
                allowNull: false,
            },

            enterUserId :      {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            enterUserName :    {
                type: Sequelize.DATE,
                allowNull: false,
            },

            enterUserPhoto :    {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            enterUserRating  :       {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            enterReporting :       {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            enterStart :  {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            enterEnd :    {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            enterEditStart :       {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            enterEditEnd :    {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            enterFarmplerIntro :       {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            enterCancelReson : {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            enterEditReson : {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            enterState :   {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'FarmPlayer',
            tableName  : 'farmpler',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {}
}
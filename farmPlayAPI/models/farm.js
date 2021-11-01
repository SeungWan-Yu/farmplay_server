const Sequelize = require('sequelize');

module.exports = class farm extends Sequelize.Model{
    static init(sequelize) {
        return super.init({

            farmCode:       {
                type: Sequelize.INTEGER(11).UNSIGNED,
                primaryKey: true,
                autoIncrement: true // Automatically gets converted to SERIAL for postgres
            },

            farmState:      {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            farmAskDate:    {
                type: Sequelize.DATE,
                allowNull: false,
            },

            farmRegDate:    {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            farmImg :       {
                type: Sequelize.STRING(100),
                allowNull: true,
            },

            farmName:       {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            farmStartOpen:  {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            farmProduce:    {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            farmType:       {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            farmerIntro:    {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            farmAddr:       {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            farmAddrDetail: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            farmRoomInternet: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            farmRoomSite:   {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            farmRoomInfo:   {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            farmRoom:       {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            farmRoomUnisex: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            farmRoomEtc:    {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            
            userName:       {
                type: Sequelize.STRING(100),
                allowNull: false,
            },    
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Farm',
            tableName  : 'farm',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {}
}
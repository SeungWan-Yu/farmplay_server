const Sequelize = require('sequelize');

module.exports = class door extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            
            door1: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            
            door2: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            door3: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            door4: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            name:  {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            token: {
                type: Sequelize.TEXT,
                primaryKey: true,
                allowNull: false,
            },

            state: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                allowNull: false,
            },

            somunstate: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                allowNull: false,
            },

    
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Door',
            tableName  : 'door',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {}
}
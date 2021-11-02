const Sequelize = require('sequelize');

module.exports = class beebox extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            
            name: {
                type: Sequelize.STRING(100),
                primaryKey: true,
                //autoIncrement: true // Automatically gets converted to SERIAL for postgres
            },

            temp: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },

            humi: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },

            date: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            batt: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },

            net: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },

            token: {
                type: Sequelize.TEXT,
                allowNull: false,
            },

            datetest: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'BeeBox',
            tableName  : 'beebox',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {}
}
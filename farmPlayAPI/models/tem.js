const Sequelize = require('sequelize');

module.exports = class temperature extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            
            tem: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },

            humi: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },

            time:  {
                type: Sequelize.DATE,
                allowNull: false,
            },

            name:  {
                type: Sequelize.STRING(100),
                primaryKey: true,
                allowNull: false,
            },

            batt: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },    
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Temperature',
            tableName  : 'tem',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {}
}
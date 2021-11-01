const Sequelize = require('sequelize');

module.exports = class notify extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            date: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            category:  {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            token:  {
                type: Sequelize.TEXT,
                primaryKey: true,
                allowNull: false,
            },
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'notification',
            tableName  : 'noti',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {}
}
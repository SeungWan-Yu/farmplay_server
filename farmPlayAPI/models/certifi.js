const Sequelize = require('sequelize');

module.exports = class certify extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            
            phone: {
                type: Sequelize.STRING(100),
                primaryKey: true,
                allowNull: false,
            },

            code:  {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Certification',
            tableName  : 'certifi',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {}
}
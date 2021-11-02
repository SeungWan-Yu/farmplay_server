const Sequelize = require('sequelize');

module.exports = class environment extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            
            name:  {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            htemp: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                allowNull: false,
            },  
            
            ltemp: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                allowNull: false,
            },  

            hhumi: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                allowNull: false,
            },  

            lhumi: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                allowNull: false,
            },  

            state: {
                type: Sequelize.INTEGER(11).UNSIGNED,
                allowNull: false,
            },  

            token: {
                type: Sequelize.TEXT,
                primaryKey: true,
                allowNull: false,
            },
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'EnvironmentData',
            tableName  : 'thdata',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {}
}
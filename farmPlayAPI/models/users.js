const Sequelize = require('sequelize');

module.exports = class users extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            
            user_id:        {
                type: Sequelize.STRING(100),
                primaryKey: true,
                //autoIncrement: true // Automatically gets converted to SERIAL for postgres
            },

            user_pw:        {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            user_name:      {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            user_phone:         {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            user_adress:    {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            user_adress_detail: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            token:          {
                type: Sequelize.TEXT,
                allowNull: true,
            },

            farm_code:      {
                type: Sequelize.INTEGER(11).UNSIGNED,
                allowNull: false,
            },

            password:       {
                type: Sequelize.STRING(255),
                allowNull: false,
            },

            token_id:       {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'USER',
            tableName  : 'users',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {}
}
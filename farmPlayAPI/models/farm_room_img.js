const Sequelize = require('sequelize');

module.exports = class room_img extends Sequelize.Model{
    static init(sequelize) {
        return super.init({

            roomImgCode:        {
                type: Sequelize.INTEGER(11).UNSIGNED,
                primaryKey: true,
                autoIncrement: true // Automatically gets converted to SERIAL for postgres
            },

            roomImgFarmCode:    {
                type: Sequelize.INTEGER(11).UNSIGNED,
                allowNull: false,
            },

            roomImgUrl:         {
                type: Sequelize.TEXT,
                allowNull: false,
            },
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'FarmImg',
            tableName  : 'farm_room_img',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {}
}
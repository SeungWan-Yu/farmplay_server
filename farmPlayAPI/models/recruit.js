const Sequelize = require('sequelize');

module.exports = class recruit extends Sequelize.Model{
    static init(sequelize) {
        return super.init({

            recuritCode:         {
                type: Sequelize.INTEGER(11).UNSIGNED,
                primaryKey: true,
                autoIncrement: true // Automatically gets converted to SERIAL for postgres
            },

            recuritFarmCode:     {
                type: Sequelize.INTEGER(11).UNSIGNED,
                allowNull: false,
            },

            recuritState:        {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            recuritUserId:       {
                type: Sequelize.DATE,
                allowNull: false,
            },

            recuritStart:        {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            recuritEnd:          {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            recuritJobStart:     {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            recuritJobEnd  :     {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            recuritJobKind  :    {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            recuritMealProvide:  {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            recuritMealVeget:    {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            recuritMealMemo:     {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            recuritChkFampler:   {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            recuritChkPeriod:    {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            recuritChkMinor:     {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            recuritChkMinorMemo: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            recuritChkMax:       {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            recuritChkSummary:   {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
        },{
            sequelize,
            timestamps : false,
            underscored: false,
            modelName  : 'Recruit',
            tableName  : 'recruit',
            paranoid   : false,
            charset    : 'utf8',
            collate    : 'utf8_general_ci',
        });
    }
    static associate(db) {}
}
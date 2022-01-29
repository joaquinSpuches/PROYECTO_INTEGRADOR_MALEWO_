//const { DataTypes } = require("sequelize/types");
//const { sequelize, Sequelize } = require(".");

module.exports = (sequelize,dataTypes)=>{
    const Category = sequelize.define('Categories', {
        name: {
            allowNull: false,
            type: dataTypes.STRING
        },
        description: {
            allowNull: false,
            type: dataTypes.TEXT
        },
    },{
        timestamps: false
    });

    Category.associate = (models) => {
        Category.hasMany(models.Products, {
            as: 'products',
            foreignKey: 'categoryId'
        })
    }

    return Category
}
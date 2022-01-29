//const { DataTypes } = require("sequelize/types");
//const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Products', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        img: {
            type: DataTypes.STRING,
            defaultValue: '0c0d6b0b4983ed5e9a759b99d96256a2.png'
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {});

    Product.associate = (models) => {
        Product.belongsTo(models.Categories, {
            as: 'category',
            foreignKey: 'categoryId'
        })

        Product.belongsToMany(models.Orders, {
            through: models.ProductsOrders,
        })
    }

    return Product;
}
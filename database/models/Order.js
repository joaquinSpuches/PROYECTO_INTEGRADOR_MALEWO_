//const { DataTypes } = require("sequelize/types");
//const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Orders', {
        total: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {})

    Order.associate = (models) => {
        Order.belongsTo(models.Users, {
            as: 'user',
            foreignKey: 'userId'
        })
        Order.belongsToMany(models.Products, {
            through: models.ProductsOrders,
        })
    }

    return Order
}
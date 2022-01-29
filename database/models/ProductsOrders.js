module.exports = (sequelize, DataTypes) => {
    const ProductsOrders = sequelize.define('ProductsOrders', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return ProductsOrders;
}
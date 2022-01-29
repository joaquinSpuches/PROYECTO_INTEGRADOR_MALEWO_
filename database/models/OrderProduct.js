const { sequelize } = require(".");

module.exports = (sequelize, dataTypes)=>{
    const OrderProduct = sequelize.define('OrderProducts',
        {},{
            timestamps: false
        })

    return OrderProduct
}
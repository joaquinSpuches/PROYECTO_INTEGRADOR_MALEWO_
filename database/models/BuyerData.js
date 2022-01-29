//const { DataTypes } = require("sequelize/types");
//const { sequelize, Sequelize } = require(".");


module.exports = (sequelize, DataTypes) => {
    const BuyerData = sequelize.define('BuyerData', {
        nameSurname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cardNumber: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        expirationMonth: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        expirationYear: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        securityCode: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        DNI: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    BuyerData.associate = (models) => {
        BuyerData.belongsTo(models.Users, {
            as: 'users',
            foreignKey: 'userId'
        })
    }

    return BuyerData
}

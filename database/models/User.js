module.exports = (sequelize, dataTypes) =>{
    const User = sequelize.define('Users', {
        name: {
            allowNull: false,
            type: dataTypes.STRING,
            unique: true
        },
        email: {
            allowNull: false,
            type: dataTypes.STRING,
            unique: true
        },
        phone: {
            allowNull: false,
            type: dataTypes.STRING      
        },
        img: {
            allowNull: false,
            type: dataTypes.STRING
        },
        password: {
            allowNull: false,
            type: dataTypes.STRING
        },
        isAdmin: {
            allowNull: false,
            type: dataTypes.INTEGER
        }    
    });

    User.associate = (models) => {
        User.hasMany(models.BuyerData, {
            as: 'buyerData',
            foreignKey: 'userId'
        })

        User.hasMany(models.Orders, {
            as: 'order',
            foreignKey: 'userId'
        })
    }

    return User
}
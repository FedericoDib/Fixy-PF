const {DataTypes} = require('sequelize');


module.exports = (sequelize) => {
    sequelize.define('budget',{
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUID,
            primaryKey: true
        },
        requestId:{
            type:DataTypes.UUID,
            allowNull:false
        },
        professionalId:{
            type:DataTypes.STRING,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        price:{
            type:DataTypes.FLOAT,
            allowNull:false
        }

    });
};
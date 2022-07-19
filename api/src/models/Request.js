const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('request',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        clientId:{
            type: DataTypes.UUID,
            allowNull:false
        },
        // professionalId:{
        //     type: DataTypes.UUID,
        //     allowNull:false
        // },
        professionals:{
            type: DataTypes.ARRAY(DataTypes.JSON)
        },
        affair:{
            type: DataTypes.STRING,
            allowNull:false
        },
        date:{
            type: DataTypes.STRING
        },
        description:{
            type: DataTypes.STRING,
            allowNull:false
        },
        status:{
            type: DataTypes.ENUM('declined','pending','accepted','finished'),
            defaultValue: 'pending',  
        },
        budgetDescription:{
            type: DataTypes.STRING,
            allowNull: false  
        },
        budgetPrice:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        budget:{
            type: DataTypes.ARRAY(DataTypes.JSON)
        }

    })
}

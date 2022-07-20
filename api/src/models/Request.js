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
            type: DataTypes.STRING,
            allowNull:false
        },
        associatedProfessionals:{
            type: DataTypes.ARRAY(DataTypes.STRING)
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
        budget:{
            type: DataTypes.ARRAY(DataTypes.JSON)
        }

    })
}

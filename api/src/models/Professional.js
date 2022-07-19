const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('professional',{
        googleId:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        status:{
            type: DataTypes.BOOLEAN,
            defaultValue:false
        },
        firstLogin:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        perfilPic:{
            type: DataTypes.STRING,
            defaultValue:'-',
            allowNull:false
        },
        enrollment:{
            type: DataTypes.STRING,
            defaultValue:'-',
            allowNull:false    
        },
        profession:{
            type: DataTypes.ENUM('electricista','plomero','gasista','cerrajero','limpieza'),
            defaultValue:'electricista',
            allowNull:false
        },
        province:{
            type: DataTypes.STRING,
            defaultValue:'-',
            allowNull:false
        },
        city:{
            type: DataTypes.STRING,
            defaultValue:'-',
            allowNull:false
        },
        address:{
            type: DataTypes.STRING,
            defaultValue:'-',
            allowNull:false
        },
        availableTimes:{
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue:['-'],
            allowNull:false
        },
        reviews:{
            type: DataTypes.ARRAY(DataTypes.JSON),
            defaultValue:[{}],
            allowNull:false
        },
        actualRequests:{
            type: DataTypes.ARRAY(DataTypes.JSON),
            defaultValue:[{}],
            allowNull:false
        }


    })
};
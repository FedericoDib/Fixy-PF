const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('demoClient',{
        id: {
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true
        },
        googleId:{
            type: DataTypes.STRING,
            allowNull:true
        },
        name:{
            type: DataTypes.STRING,
            allowNull:true
        },
        password:{
            type:DataTypes.STRING,
            allowNull:true
        }
    })
}
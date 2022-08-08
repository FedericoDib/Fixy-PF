const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "admin",
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: [],
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};

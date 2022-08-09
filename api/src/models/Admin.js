const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "admin",
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: 11,
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
      accessToken: {
        type: DataTypes.STRING,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};

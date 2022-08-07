const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "client",
    {
      googleId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: true,
      },
      expoToken: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      isRegistered: {
        type: DataTypes.BOOLEAN,
      },
      firstLogin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        defaultValue: "-",
        allowNull: false,
      },
      perfilPic: {
        type: DataTypes.STRING,
        defaultValue: "-",
      },
      province: {
        type: DataTypes.STRING,
        defaultValue: "-",
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        defaultValue: "-",
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        defaultValue: "-",
        allowNull: false,
      },
      reviews: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: [],
      },
      reviewsPending: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      latitude: {
        type: DataTypes.FLOAT,
        defaultValue: "-",
      },
      longitude: {
        type: DataTypes.FLOAT,
        defaultValue: "-",
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};

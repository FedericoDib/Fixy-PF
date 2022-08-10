const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "request",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      affair: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING(5000),
        allowNull: false,
      },
      availableTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      requestPic: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: [],
      },
      budget: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        defaultValue: [],
      },
      category: {
        type: DataTypes.STRING,
        defaultValue: "Unknown",
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};

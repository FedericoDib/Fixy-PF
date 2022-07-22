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
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      budget: {
        type: DataTypes.ARRAY(DataTypes.JSON),
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};

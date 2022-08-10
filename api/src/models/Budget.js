const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "budget",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING(5000),
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      estimatedBudget: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      turn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      validationCode: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};

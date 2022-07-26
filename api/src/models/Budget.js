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
        type: DataTypes.STRING,
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
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};

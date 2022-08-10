const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "notification",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "not_seen",
      },
      user: {
        type: DataTypes.STRING,
        allowNull:false
      }
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};

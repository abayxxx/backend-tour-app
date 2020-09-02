"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Trip.belongsTo(models.Country, {
        as: "country",
        foreignKey: "countryId",
      });
      Trip.hasMany(models.Transaction, {
        as: "transaction",
      });
    }
  }

  Trip.init(
    {
      title: DataTypes.STRING,
      accomodation: DataTypes.STRING,
      transportation: DataTypes.STRING,
      eat: DataTypes.STRING,
      day: DataTypes.INTEGER,
      night: DataTypes.INTEGER,
      dateTrip: DataTypes.STRING,
      price: DataTypes.INTEGER,
      quota: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      countryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Trip",
    }
  );
  return Trip;
};

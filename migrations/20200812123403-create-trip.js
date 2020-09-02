"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Trips", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      accomodation: {
        type: Sequelize.STRING,
      },
      transportation: {
        type: Sequelize.STRING,
      },
      eat: {
        type: Sequelize.STRING,
      },
      day: {
        type: Sequelize.INTEGER,
      },
      night: {
        type: Sequelize.INTEGER,
      },
      dateTrip: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      quota: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.STRING,
      },
      countryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Countries",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Trips");
  },
};

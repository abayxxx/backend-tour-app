const { Trip, Country } = require("../models");

//Get All Trips
exports.getAllTrip = async (req, res) => {
  try {
    const trip = await Trip.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "countryId", "CountryId"],
      },
      include: {
        model: Country,
        as: "country",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    //Send Response
    res.send({
      message: "Response Success",
      data: {
        trip,
      },
    });

    //Throw Error
  } catch (err) {
    console.log(err);
  }
};

//Get Trip by ID
exports.getOneTrip = async (req, res) => {
  try {
    //Get ID from Params
    const { id } = req.params;

    const trip = await Trip.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "countryId", "CountryId"],
      },
      include: {
        model: Country,
        as: "country",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    //Send Response
    res.send({
      message: "Response Success",
      data: {
        trip,
      },
    });
    //Throw Error
  } catch (err) {
    console.log(err);
  }
};

//Add Data Trip
exports.addTrip = async (req, res) => {
  try {
    const { countryId } = req.body;

    //Check Cpuntry ID

    const trip = await Trip.create(req.body);

    //Send Response
    res.status(200).send({
      message: "Response Success",
      data: {
        trip,
      },
    });
    //Throw ERROR
  } catch (err) {
    console.log(err);
  }
};

//Delete Trip
exports.deleteTrip = async (req, res) => {
  try {
    //Get ID from Params
    const { id } = req.params;

    const trip = await Trip.destroy({
      where: {
        id,
      },
    });

    if (!trip) {
      return res.status(400).send({
        error: {
          message: `Cannot delete, trip with Id ${id} not found `,
        },
      });
    }

    //Send Response
    res.status(200).send({
      message: "Success Delete Trip",
    });
    //Throw Error
  } catch (err) {
    console.log(err);
  }
};

//Update
exports.updateTrip = async (req, res) => {
  try {
    //Get ID from Params
    const { id } = req.params;

    //Check ID tripp
    const checkTrip = await Trip.findOne({
      where: {
        id,
      },
    });

    const trip = await Trip.update(
      { ...req.body },
      {
        where: {
          id,
        },
      }
    );

    if (!checkTrip) {
      return res.status(400).send({
        error: {
          message: `Cannot update, trip with Id ${id} not found `,
        },
      });
    }

    //Send Response
    res.status(200).send({
      message: "Success Update Trip",
    });
    //Throw Error
  } catch (err) {
    console.log(err);
  }
};

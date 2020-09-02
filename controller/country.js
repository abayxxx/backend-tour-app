const { Country } = require("../models");

//Get All Country
exports.getCountry = async (req, res) => {
  try {
    const country = await Country.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    //Send Response
    res.send({
      message: "Response Success",
      data: {
        country,
      },
    });

    //Throw Error
  } catch (err) {
    console.log(err);
  }
};

//Get Country By ID
exports.getOneCountry = async (req, res) => {
  try {
    //Get ID From Params
    const { id } = req.params;
    const country = await Country.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!country) {
      return res.status(200).send({
        error: {
          message: `Country with id ${id} Not Found !!`,
        },
      });
    }

    //Send Response
    res.status(200).send({
      message: "Response Success",
      data: {
        country,
      },
    });
    //Throw Error
  } catch (err) {
    console.log(err);
  }
};

//Add Country
exports.addCountry = async (req, res) => {
  try {
    const { name } = req.body;

    const checkCountry = await Country.findOne({
      where: {
        name,
      },
    });

    if (checkCountry) {
      return res.status(404).send({
        error: {
          message: "Country already exist!!",
        },
      });
    }

    const country = await Country.create(req.body);

    //Send Response
    res.send({
      message: "Success input country",
      data: {
        country,
      },
    });

    //Throw Error
  } catch (err) {
    console.log(err);
  }
};

//Delete Country
exports.deleteCountry = async (req, res) => {
  try {
    //Get ID from Params
    const { id } = req.params;

    const country = await Country.destroy({
      where: {
        id,
      },
    });

    if (!country) {
      return res.status(400).send({
        error: {
          message: `Cannot delete, Country with Id ${id} Not Found !!`,
        },
      });
    }

    //Send Response
    res.status(200).send({
      message: "Success Delete Country !!",
    });

    //Throw Error
  } catch (err) {
    console.log(err);
  }
};

//Update Country
exports.updateCountry = async (req, res) => {
  try {
    //Get ID from Params
    const { name } = req.body;
    const { id } = req.params;

    //Check ID country
    const checkCountry = await Country.findOne({
      where: {
        id,
      },
    });

    const country = await Country.update(
      { name: name },
      {
        where: {
          id,
        },
      }
    );

    if (!checkCountry) {
      return res.status(400).send({
        error: {
          message: `Cannot update, Country with Id ${id} Not Found !!`,
        },
      });
    }

    //Send Response
    res.status(200).send({
      message: "Success Update Country !!",
    });

    //Throw Error
  } catch (err) {
    console.log(err);
  }
};

const { Transaction, User, Trip, Country } = require("../models");

exports.addTransaction = async (req, res) => {
  try {
    const { attachment } = req.body;

    //Check payment proof send or not
    if (!attachment) {
      return res.status(401).send({
        error: {
          message: "Please insert your payment proof first !!",
        },
      });
    }
    const transaction = await Transaction.create(req.body);

    res.status(200).send({
      message: "Success add transaction",
      data: {
        transaction,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

//Get ALL Transaction
exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findAll({
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "tripId",
          "userId",
          "TripId",
          "UserId",
        ],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: Trip,
          as: "trip",
          include: {
            model: Country,
            as: "country",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "countryId", "CountryId"],
          },
        },
      ],
    });

    res.status(200).send({
      message: "Response Success",
      data: {
        transaction,
      },
    });
  } catch (er) {
    console.log(er);
  }
};

//Get Pending Transaction by id user
exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findAll({
      where: {
        userId: id,
      },
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "tripId",
          "userId",
          "TripId",
          "UserId",
        ],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: Trip,
          as: "trip",
          include: {
            model: Country,
            as: "country",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "countryId", "CountryId"],
          },
        },
      ],
    });

    console.log(transaction);

    if (!transaction) {
      return res.status(400).send({
        error: {
          message: "Cannot find transaction !! ",
        },
      });
    }

    res.status(200).send({
      message: "Response Success",
      data: {
        transaction,
      },
    });
  } catch (er) {
    console.log(er);
  }
};

//Update Transaction
exports.updateTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    //Check Id TRANSACTION
    const checkTransaction = await Transaction.findOne({
      where: {
        id,
      },
    });

    const transaction = await Transaction.update(
      { status: status },
      {
        where: {
          id,
        },
      }
    );

    if (!checkTransaction) {
      return res.status(400).send({
        error: {
          message: "Cannot find transaction !! ",
        },
      });
    }

    res.status(200).send({
      message: "Succes Update Transaction",
    });
  } catch (er) {
    console.log(er);
  }
};

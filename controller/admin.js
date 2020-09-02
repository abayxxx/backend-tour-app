const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("@hapi/joi");

const { Admin } = require("../models");

//Login admin
exports.loginAdmin = async (req, res) => {
  try {
    //Get Request Body
    const { email, password } = req.body;

    //Validate Request Body
    const schema = joi.object({
      email: joi.string().email().min(10).required(),
      password: joi.string().min(8).required(),
    });

    //Get Error
    const { error } = schema.validate(req.body);

    //Check If error
    if (error) {
      return res.status(401).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    //Get user from email for check if user have a database
    const admin = await Admin.findOne({
      where: {
        email,
      },
    });

    //Check if user doesn't exist or invalid email
    if (!admin) {
      return res.status(402).send({
        error: {
          message: "Email or password is invalid !!",
        },
      });
    }

    //Compare password user in request with password user in database
    // const validPass = await bcrypt.compare(password, admin.password);

    // //Check if user doesn't exist or invalid email
    // if (!validPass)
    //   return res.status(403).send({
    //     error: {
    //       message: "Email or password is invalid !!",
    //     },
    //   });

    //Make a JWT Token
    const token = jwt.sign(
      {
        id: admin.id,
      },
      process.env.JSON_KEY_ADMIN
    );

    //Send Response when user is validated
    res.status(200).send({
      message: "Login Success",
      data: {
        id: admin.id,
        email: admin.email,
        token,
      },
    });

    //Throw Error
  } catch (err) {
    console.log(err);
  }
};

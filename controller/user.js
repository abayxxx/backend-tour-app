const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("@hapi/joi");

const { User } = require("../models");

//Register User
exports.registerUser = async (req, res) => {
  try {
    //Get Request Body
    const { fullName, email, password, phone, address } = req.body;

    //Validate Data in Request Body
    const schema = joi.object({
      fullName: joi.string().min(3).required(),
      email: joi.string().email().min(10).required(),
      password: joi.string().min(8).required(),
      phone: joi.number(),
      address: joi.string(),
    });

    //Get Error
    const { error } = schema.validate(req.body);

    //Check If Error
    if (error) {
      return res.status(403).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    //Get Email for Checking if email already exist or not
    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    //Checking Email
    if (checkEmail) {
      return res.status(400).send({
        error: {
          message: "Email already exist !!",
        },
      });
    }

    //Encrypt Password with Bcrypt
    const hashedPass = await bcrypt.hash(password, 10);

    //Insert User Register to Database
    const user = await User.create({
      fullName,
      email,
      password: hashedPass,
      phone,
      address,
    });

    //Make a JWT Token
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JSON_KEY
    );

    //Send Response when User Success Registered
    res.status(200).send({
      message: "Success Registered !!",
      data: {
        email: user.email,
        token,
      },
    });
    //Throw Err
  } catch (err) {
    console.log(err);
  }
};

//Login user
exports.loginUser = async (req, res) => {
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
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    //Get user from email for check if user have a database
    const user = await User.findOne({
      where: {
        email,
      },
    });

    //Check if user doesn't exist or invalid email
    if (!user) {
      return res.status(400).send({
        error: {
          message: "Email or password is invalid !!",
        },
      });
    }

    //Compare password user in request with password user in database
    const validPass = await bcrypt.compare(password, user.password);

    //Check if user doesn't exist or invalid email
    if (!validPass)
      return res.status(400).send({
        error: {
          message: "Email or password is invalid !!",
        },
      });

    //Make a JWT Token
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JSON_KEY
    );

    //Send Response when user is validated
    res.status(200).send({
      message: "Login Success",
      data: {
        id: user.id,
        email: user.email,
        token,
      },
    });

    //Throw Error
  } catch (err) {
    console.log(err);
  }
};

//Get User By Id
exports.getUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      message: "Response Success",
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

//Get All User
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      message: "Response Success",
      data: {
        users,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

//Delete User by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.destroy({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(400).send({
        error: {
          message: `Cannot delete, user with ID ${id} Not Found !! `,
        },
      });
    }

    res.status(200).send({
      message: "Success Delete User",
    });
  } catch (err) {
    console.log(err);
  }
};

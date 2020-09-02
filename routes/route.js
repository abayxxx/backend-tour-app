const express = require("express");
const router = express.Router();

//Middleware
const { authenticated, authAdmin } = require("../middleware/auth");

//Admin
const { loginAdmin } = require("../controller/admin");

//Country
const {
  getCountry,
  getOneCountry,
  addCountry,
  deleteCountry,
  updateCountry,
} = require("../controller/country");

//Trip
const {
  getAllTrip,
  getOneTrip,
  addTrip,
  deleteTrip,
  updateTrip,
} = require("../controller/trip");

//USER
const {
  registerUser,
  loginUser,
  getUserId,
  getAllUser,
  deleteUser,
} = require("../controller/user");

//TRANSACTION
const {
  getTransaction,
  addTransaction,
  getTransactionById,
  updateTransactionById,
} = require("../controller/transaction");

//IMAGE
const { uploadImage } = require("../controller/uploadImage");

//ENDPOINT COUNTRY
router.get("/country", getCountry);
router.get("/country/:id", getOneCountry);
router.post("/country", authenticated, addCountry);
router.delete("/country/:id", deleteCountry);
router.patch("/country/:id", authenticated, updateCountry);

//ENDPOINT TRIP
router.get("/trip", getAllTrip);
router.get("/trip/:id", getOneTrip);
router.post("/trip", authenticated, addTrip);
router.delete("/trip/:id", authAdmin, deleteTrip);
router.patch("/trip/:id", authAdmin, updateTrip);

//ENDPOINT USER
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:id", getUserId);
router.get("/user", getAllUser);
router.delete("/user/:id", deleteUser);

//ENDPOINT TRANSACTION
router.get("/transaction", getTransaction);
router.get("/transaction/:id", getTransactionById);
router.post("/transaction", authenticated, addTransaction);
router.patch("/transaction/:id", authAdmin, updateTransactionById);

//ENDPOINT IMAGE
router.post("/upload-image", uploadImage);

//ENDPOINT ADMIN
router.post("/admin", loginAdmin);

//EXPORTS MODULE
module.exports = router;

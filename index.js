//init express
const express = require("express");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const app = express();

// default options
app.use(fileUpload());

//CORS
const cors = require("cors");
app.use(cors());

// app.post("/api/v1/upload", function (req, res) {
//   if (req.files === null) {
//     return res.status(400).send("No files were uploaded.");
//   }

//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   let file = req.files.trip;

//   //Make a random string for image name
//   const makeid = (length) => {
//     let result = "";
//     let characters =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     let charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
//   };

//   const name = makeid(20) + file.name;

//   const dir = `C:/Users/Lenovo/dev/reactDW/my-app/public/uploads/${name}`;
//   // Use the mv() method to place the file somewhere on your server
//   file.mv(dir, (err) => {
//     if (err) return res.status(500).send(err);

//     res.json({ fileName: file.name, filePath: `/uploads/${name}` });
//   });
// });

//init body-parser
const bodyParser = require("body-parser");

//cors

app.use(bodyParser.json());

//import router
const router = require("./routes/route");
app.use("/api/v1", router);

app.listen(5000, () => console.log("Listening on port 5000..."));

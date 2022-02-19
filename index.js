const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
var cors = require("cors");
const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const { MongoClient, ServerApiVersion } = require("mongodb");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

const dotenv = require("dotenv");
// const connectDB = require("./config/database");
dotenv.config();

// app.get("/", (req, res) => {
//   res.json("it's working");
// });

const userRoute = require("./routes/user");
const jobsRoute = require("./routes/jobs");

app.use("/api", userRoute);
app.use("/api", jobsRoute);

// mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then((data) => console.log(`Mongodb is connected  `));

//Handle Uncaught error

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise`);
  process.exit(1);
});

// console.log(process.env.MONGODB_URI);

app.get("/", (req, res) => {
  console.log("Helloo");
  res.json("kalu");
});

// Middleware for Error
app.use(errorMiddleware);

const server = app.listen(port, () => {
  console.log(`This server is running on ${port}`);
});

// Unhandled promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise`);
  server.close(() => {
    process.exit(1);
  });
});

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
const User = require("./model/usersModel");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("./utils/errorHandler");




if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const domainsFromEnv = process.env.CORS_DOMAINS || ""

const whitelist = domainsFromEnv.split(",").map(item => item.trim())
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

const dotenv = require("dotenv");
// const connectDB = require("./config/database");
dotenv.config();

const userRoute = require("./routes/user");
const jobsRoute = require("./routes/jobs");
const usersModel = require("./model/usersModel");
const catchAsyncErrors = require("./middleware/catchAsyncErrors");

app.use("/api", userRoute);
app.use("/api", jobsRoute);

// mongodb
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}
)
.then(res=>console.log("MongDb connected") );



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

// app.get(
//   "/get/me",
//   catchAsyncErrors(async (req, res, next) => {
//     console.log(access_token, " this is access token");
//     const access_token = req.cookies;
//     if (!access_token) {
//       return next(
//         new ErrorHandler("Please Login to access this resource", 401)
//       );
//     }

//     const decodedData = jwt.verify(access_token, process.env.JWT_SECRET);

//     req.user = await User.findById(decodedData.id);
//     // console.log(req.user, "way");
//     const user = await User.findById(req.user.id);
//     console.log("heloa", user);

//     res.status(200).json({
//       success: true,
//       user,
//     });
//   })
// );

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

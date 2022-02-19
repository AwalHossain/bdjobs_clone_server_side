const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../model/usersModel");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
// const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
var cors = require("cors");

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = await req.cookies;

  console.log(token, "bod niyy");
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodeData);
  req.user = await User.findById(decodeData.id);
  next();
});

exports.authrizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

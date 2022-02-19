const router = require("express").Router();
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../model/usersModel");
const Employer = require("../model/employerModel");
const sendToken = require("../utils/jwtToken");
const { isAuthenticatedUser, authrizeRoles } = require("../middleware/auth");
const sendEmail = require("../middleware/sendEmail");
const crypto = require("crypto");
// const jobSeeker = require("");

// Job Seeker Registration & Login
router.post(
  "/registerUser",
  catchAsyncErrors(async (req, res, next) => {
    console.log(req.body);
    // const { name, email, password, firstName } = req.body;
    const user = await User.create(req.body);
    sendToken(user, 201, res);
  })
);

// Login user
router.post(
  "/login",
  catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both
    console.log(email, password, "haldsl");
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid  password", 401));
    }

    sendToken(user, 200, res);
  })
);

//// Get user details
router.get(
  "/jobSeeker/me",
  catchAsyncErrors(async (req, res, next) => {
    console.log(req.user, "way");
    const user = await User.findById(req.user.id);
    console.log("heloa", user);

    res.status(200).json({
      success: true,
      user,
    });
  })
);

// Get User by id
router.get(
  "/jobSeeker/:id",
  catchAsyncErrors(async (req, res, next) => {
    console.log(req.user, "way");
    const user = await User.findById(req.params.id);
    console.log("heloa", user);

    res.status(200).json({
      success: true,
      user,
    });
  })
);
// Get User by Email
router.post(
  "/jobSeeker/email",
  catchAsyncErrors(async (req, res, next) => {
    console.log(req.body, "way");
    const { email } = req.body;
    console.log(email);
    const user = await User.find({ email });
    console.log("heloa", user);

    res.status(200).json({
      success: true,
      user,
    });
  })
);

// employer Registration & login
// router.get(
//   "/jobSeeker/me",
//   isAuthenticatedUser,
//   catchAsyncErrors(async (req, res, next) => {
//     console.log(req.user, "way");
//     const user = await jobSeeker.findById(req.user.id);
//     console.log("heloa", user);

//     res.status(200).json({
//       success: true,
//       user,
//     });
//   })
// );

router.post(
  "/register/employer",
  catchAsyncErrors(async (req, res, next) => {
    console.log("hello");
    const { name, email, password, firstName } = req.body;
    const user = await Employer.create(req.body);
    sendToken(user, 201, res);
  })
);

// Login employer
router.post(
  "/employer/login",
  catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both
    console.log(email, password, "haldsl");
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await Employer.findOne({ email }).select("+password");
    console.log(user);
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid  password", 401));
    }

    sendToken(user, 200, res);
  })
);

// Get User by id
router.get(
  "/employer/:id",
  catchAsyncErrors(async (req, res, next) => {
    console.log(req.user);
    const user = await Employer.findById(req.params.id);
    console.log("heloa", user);

    res.status(200).json({
      success: true,
      user,
    });
  })
);
// Get Employer by Email
router.post(
  "/employer/email",
  catchAsyncErrors(async (req, res, next) => {
    console.log(req.body, "way");
    const { email } = req.body;
    console.log(email);
    const user = await Employer.find({ email });
    console.log("heloa", user);

    res.status(200).json({
      success: true,
      user,
    });
  })
);

// logOut user

router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  })
);

// Forgot Password

module.exports = router;

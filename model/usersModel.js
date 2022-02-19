const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const usersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter you email"],
      unique: true,
      validate: [validator.isEmail, "please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Enter your password"],
      minlength: [6, "password should be six character long"],
      select: false,
    },
    phone: {
      type: "String",
    },
    firstName: {
      type: String,
    },
    lastName: {},
    fatherName: {},
    motherName: {},
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
    },
    religion: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },
    passportNumber: {
      type: String,
    },
    nationalId: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    skillType: {
      type: String,
    },
    role: {
      type: String,
      default: "jobSeeker",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

//Jwt token

usersSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare password

usersSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//Reset Password

usersSchema.methods.getResetPasswordToken = function () {
  //Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");
  //hasing and add to the userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 100;

  return resetToken;
};

module.exports = mongoose.model("usersModel", usersSchema);

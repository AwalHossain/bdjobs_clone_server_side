const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
    },
    jobCategory: {
      type: String,
    },
    jobVacancy: {
      type: String,
    },
    jobResponsibilities: {
      type: Array,
    },
    jobKeySellingPoints: { type: Array },
    employmentStatus: { type: String },
    employmentType: { type: String },
    educationalRequirements: {
      type: Array,
    },
    experienceRequirements: {
      type: Array,
    },
    jobLocation: {
      type: String,
    },
    Salary: {
      type: String,
    },
    applicantGender: {
      type: String,
    },
    applicantAge: {
      type: String,
    },
    publishedOn: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobs", jobSchema);

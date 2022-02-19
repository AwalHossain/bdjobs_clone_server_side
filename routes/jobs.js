const router = require("express").Router();
// const ApiFeatures = require("../utils/apifeatures");
const ApiFeatures = require("../utils/apifeature");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Jobs = require("../model/jobModel");

// Create Jobs

router.post(
  "/create/jobs",
  catchAsyncErrors(async (req, res, next) => {
    console.log("hello from jobs");
    const createJobs = await Jobs.create(req.body);

    res.status(200).json({
      success: true,
      createJobs,
    });
  })
);

// find job by id

router.get(
  "/jobs/:id",
  catchAsyncErrors(async (req, res, next) => {
    const jobs = await Jobs.findById(req.params.id);

    res.status(200).json({
      success: true,
      jobs,
    });
  })
);

router.get(
  "/jobs",
  catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 10;
    const apiFeature = new ApiFeatures(Jobs.find(), req.query)
      .search()
      .filter();

    let allJobs = await apiFeature.query;
    let filteredProductsCount = allJobs.lengt;
    apiFeature.pagination(10);

    allJobs = await apiFeature.query;

    res.status(200).json({
      success: true,
      allJobs,
      resultPerPage,
      filteredProductsCount,
    });
  })
);

// job Search by keyword

module.exports = router;

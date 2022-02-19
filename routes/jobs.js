const router = require("express").Router();

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

module.exports = router;

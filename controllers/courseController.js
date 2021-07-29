const APIFeatures = require("./../utils/apiFeatures");
const Course = require("./../models/courseModel");
const AppError = require("./../utils/appError");
const catshAsync = require("./../utils/catshAsync");

exports.getAllCourses = catshAsync(async (req, res, next) => {
  const features = new APIFeatures(Course.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();

  const courses = await features.query;

  res.status(200).json({
    status: "success",
    results: courses.length,
    data: {
      courses,
    },
  });
});

exports.createCourse = catshAsync(async (req, res, next) => {
  const newCourse = await Course.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      course: newCourse,
    },
  });
});

exports.getCourse = catshAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError("There is no Course.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      course,
    },
  });
});

exports.updateCourse = catshAsync(async (req, res, next) => {
  const freshCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runvalidator: true,
  });

  if (!freshCourse) {
    return next(new AppError("There is no Course.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      Course: freshCourse,
    },
  });
});

exports.deleteCourse = catshAsync(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course) {
    return next(new AppError("There is no Course.", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

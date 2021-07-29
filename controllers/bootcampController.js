const APIFeatures = require("./../utils/apiFeatures");
const Bootcamp = require("./../models/bootcampModel");
const AppError = require("./../utils/appError");
const catshAsync = require("./../utils/catshAsync");

exports.getAllBootcamps = catshAsync(async (req, res, next) => {
  const features = new APIFeatures(Bootcamp.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();

  const bootcamps = await features.query;

  res.status(200).json({
    status: "success",
    results: bootcamps.length,
    data: {
      bootcamps,
    },
  });
});

exports.createBootcamp = catshAsync(async (req, res, next) => {
  const newBootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      bootcamp: newBootcamp,
    },
  });
});

exports.getBootcamp = catshAsync(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(new AppError("There is no bootcamp.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      bootcamp,
    },
  });
});

exports.updateBootcamp = catshAsync(async (req, res, next) => {
  const freshBootcamp = await Bootcamp.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runvalidator: true,
    }
  );

  if (!freshBootcamp) {
    return next(new AppError("There is no bootcamp.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      bootcamp: freshBootcamp,
    },
  });
});

exports.deleteBootcamp = catshAsync(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(new AppError("There is no bootcamp.", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

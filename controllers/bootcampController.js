const Bootcamp = require("./../models/bootcampModel");
const catshAsync = require("./../utils/catshAsync");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");

exports.getAllBootcamps = catshAsync(async (req, res, next) => {
  const features = new APIFeauters(Bootcamp.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginations();

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

  res.sttaus(201).json({
    status: "success",
    data: {
      bootcamp: newBootcamp,
    },
  });
});

exports.getBootcamp = catshAsync(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(new AppError("Ther no bootcamp with that ID.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      bootcamp,
    },
  });
});

exports.updatebootcamp = catshAsync(async (req, res, next) => {
  const freshBootcamp = await Bootcamp.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!bootcamp) {
    return next(new AppError("Ther no bootcamp with that ID.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      bootcamp: freshBootcamp,
    },
  });
});

exports.delete = catshAsync(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    return next(new AppError("Ther no bootcamp with that ID.", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

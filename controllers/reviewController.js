const APIFeatures = require("./../utils/apiFeatures");
const Review = require("./../models/reviewModel");
const AppError = require("./../utils/appError");
const catshAsync = require("./../utils/catshAsync");

exports.getAllReviews = catshAsync(async (req, res, next) => {
  const features = new APIFeatures(Review.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();

  const reviews = await features.query;

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catshAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});

exports.getReview = catshAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError("There is no Review.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.updateReview = catshAsync(async (req, res, next) => {
  const freshReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runvalidator: true,
  });

  if (!freshReview) {
    return next(new AppError("There is no Review.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      review: freshReview,
    },
  });
});

exports.deleteReview = catshAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) {
    return next(new AppError("There is no Review.", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

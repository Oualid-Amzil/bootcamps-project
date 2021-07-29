const APIFeatures = require("./../utils/apiFeatures");
const User = require("./../models/userModel");
const AppError = require("./../utils/appError");
const catshAsync = require("./../utils/catshAsync");

const filterObj = (obj, ...allowedFields) => {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getAllUsers = catshAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();

  const users = await features.query;

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = catshAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

exports.getUser = catshAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("There is no User.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catshAsync(async (req, res, next) => {
  const freshUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runvalidator: true,
  });

  if (!freshUser) {
    return next(new AppError("There is no User.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user: freshUser,
    },
  });
});

exports.deleteUser = catshAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError("There is no User.", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateMe = catshAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for updating password. If you want to update your password go to: /updateMyPassword",
        400
      )
    );
  }

  const filteredBody = filterObj(req.body, "name", "email");

  const updateUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updateUser,
    },
  });
});

exports.deleteMe = catshAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

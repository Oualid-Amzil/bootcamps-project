const AppError = require("./../utils/appError");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errorsMessage = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input value. ${errorsMessage.join(". ")}`;
  return new AppError(message, 400);
};

const handleDuplicatedErrorDB = (err) => {
  const fieldName = Object.values(err.keyValue);
  const message = `Duplicated input value. "${fieldName[0]}". Please try another one.`;
  return new AppError(message, 400);
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.massage,
    });
  } else {
    console.log(err);

    res.status(200).json({
      status: 500,
      message: "Something went very wrong.",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = err;
    if (err.name === "CastError") error = handleCastErrorDB(err);
    if (err.name === "validationError") error = handleValidationErrorDB(err);
    if (err.code === 11000) error = handleDuplicatedErrorDB(err);

    sendErrorProd(error, res);
  }
};

const AppError = require("../utils/appError");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const handleCastErrorDB = (err) => {
  const message = `Invalide ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicatedErrorDB = (err) => {
  const fieldName = Object.values(err.keyValue);
  const message = `Duplicate field value entered: "${fieldName[0]}", Please try another One.`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input value. ${errors.join(". ")}`;

  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid Token. Please log in again", 401);

const handleJWTExpiresError = () =>
  new AppError("Token has expired. Please log in again.", 401);

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
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
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicatedErrorDB(err);
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);

    if (err.name === "JsonWebTokenError") err = handleJWTError();
    if (err.name === "JsonExpiresError") err = handleJWTExpiresError();

    sendErrorProd(err, res);
  }
};

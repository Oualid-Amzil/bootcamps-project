const express = require("express");
const morgan = require("morgan");
const globaleErrorHandler = require("./controllers/errorController");
const bootcampRouter = require("./routers/bootcampRouter");
const courseRouter = require("./routers/courseRouter");
const reviewRouter = require("./routers/reviewRouter");
const userRouter = require("./routers/userRouter");
const AppError = require("./utils/appError");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "There too many requests from this IP, please try again in an hour.",
});

app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

app.use("/api/v1/bootcamps", bootcampRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  return next(
    new AppError(`Cant't find this route: ${req.URL} on this server.`, 404)
  );
});

app.use(globaleErrorHandler);

module.exports = app;

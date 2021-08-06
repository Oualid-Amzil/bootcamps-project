const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const bootcampsRouter = require("./routers/bootcampRouter");

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/bootcamps", bootcampsRouter);

module.exports = app;

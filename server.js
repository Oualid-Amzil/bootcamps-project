const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: `${__dirname}/../config.env` });

// process.on("uncaughtException", (err) => {
//   console.log("UNCAUGHT EXCEPTION! Shutting down...");
//   console.log(err.name, err.message);
//   process.exit(1);
// });

const DB = process.env.DATABASE_LINK.replace(
  "<PASSWORD>",
  process.env.PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((con) => console.log("DB successfuly connected..."));

const app = require("./app");

port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  );
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLER REJECTION! Shutting down ...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

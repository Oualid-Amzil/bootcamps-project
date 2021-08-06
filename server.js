const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: `./../${__dirname}/config.env` });

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((con) => console.log("DB successfuly connected..."));

const app = require("./app");

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port} ...`
  );
});

const mongoose = require("mongoose");

const bootcampSchema = new mongoose.Schema({
  user: String,
  name: String,
  description: String,
  website: String,
  phone: String,
  address: String,
  careers: [String],
  housing: Boolean,
  jobAssisstance: Boolean,
  jobGuarantee: Boolean,
  acceptGi: Boolean,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Bootcamp = mongoose.model("Bootcamp", bootcampSchema);

module.exports = Bootcamp;

const mongoose = require("mongoose");
const validator = require("validator");

const bootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "You must provide a name."],
    trim: true,
    unique: true,
    maxlength: [50, "Name can not be more than 50 characters."],
  },
  slug: String,
  description: {
    type: String,
    require: [true, "You must provide a description."],
    maxlength: [500, "Description can not be more than 500 characters"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please provide a valid email."],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please provide a valide URL with HTTP or HTTPs",
    ],
  },
  phone: {
    type: String,
    maxlength: [20, "Phone number can not be longer than 20 characters."],
  },
  address: {
    type: String,
    required: [true, "You must provide an address."],
  },
  location: {
    type: {
      type: String,
      enum: ["point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      index: "2dsphere",
    },
    formatteAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  carrers: {
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1."],
    max: [10, "Rating can not be more than 10"],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: String,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Bootcamp = mongoose.model("Bootcamp", bootcampSchema);

module.exports = Bootcamp;

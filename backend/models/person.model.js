const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const personSchema = new Schema(
  {
    forename: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 2,
    },
    familyname: {
      type: String,
      required: true,
      unique: false,
      trim: true,
      minlength: 2,
    },
    dic: {
      type: Number,
      required: true,
      unique: false,
      trim: true,
    },
    din: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 2,
    },
  },
  {
    timestamps: true,
  }
);

const Person = mongoose.model("Person", personSchema);

module.exports = Person;

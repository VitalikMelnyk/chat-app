const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;

const userSchema = new Schema({
  socketId: {
    type: String
  },
  firstName: {
    type: String,
    // required: true
  },
  secondName: {
    type: String,
    // required: true
  },
  gender: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true,
    unique: true
  },
  password: {
    type: String,
    // required: true
  },
  birthdayDate: {
    type: String,
    // required: true
  },
  city: {
    type: String,
    // required: true
  },
  telephoneNumber: {
    type: String,
    // required: true
  },
  country: {
    type: Object,
    // required: true
  },
  address: {
    type: String,
    // required: true
  },
  zipCode: {
    type: String,
    // required: true
  }
});

module.exports = {
  userSchema
};

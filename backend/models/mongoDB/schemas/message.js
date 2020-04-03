const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  messages: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = { messageSchema };

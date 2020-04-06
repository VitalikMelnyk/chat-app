const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: {
    type: String
  },
  users: [{ type: Schema.Types.ObjectId, ref: "user" }]
});

module.exports = { roomSchema };

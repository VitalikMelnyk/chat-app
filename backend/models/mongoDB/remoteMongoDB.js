const { userSchema, messageSchema, roomSchema } = require("./schemas");
const { remoteMongoDBConnection } = require("./connection");

const User = remoteMongoDBConnection.model("user", userSchema, "user");
const Message = remoteMongoDBConnection.model(
  "message",
  messageSchema,
  "message"
);
const Room = remoteMongoDBConnection.model("room", roomSchema, "room");
module.exports = {
  User,
  Message,
  Room,
};

const { userSchema, messageSchema, roomSchema } = require("./schemas");
const { localMongoDBConnection } = require("./connection");

const User = localMongoDBConnection.model("user", userSchema, "user");
const Message = localMongoDBConnection.model(
  "message",
  messageSchema,
  "message"
);
const Room = localMongoDBConnection.model("room", roomSchema, "room");

module.exports = {
  User,
  Message,
  Room,
};

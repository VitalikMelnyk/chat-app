const { userSchema, messageSchema, roomSchema } = require("./schemas");
const { localMongoDBConnection } = require("./connection");

const User = localMongoDBConnection.model("", userSchema, "user");
const Messages = localMongoDBConnection.model("", messageSchema, "messsages");
const Room = localMongoDBConnection.model("", roomSchema, "room");

module.exports = {
  User,
  Messages,
  Room
};

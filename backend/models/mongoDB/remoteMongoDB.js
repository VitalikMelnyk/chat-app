const { userSchema, messageSchema, roomSchema } = require("./schemas");
const { remoteMongoDBConnection } = require("./connection");

const User = remoteMongoDBConnection.model("", userSchema, "user");
const Messages = remoteMongoDBConnection.model("", messageSchema, "messsages");
const Room = remoteMongoDBConnection.model("", roomSchema, "room");
module.exports = {
  User,
  Messages,
  Room
};

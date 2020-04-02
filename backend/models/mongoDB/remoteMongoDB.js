const { userSchema, messageSchema } = require("./schemas");
const { remoteMongoDBConnection } = require("./connection");

const User = remoteMongoDBConnection.model("", userSchema, "user");
const Messages = remoteMongoDBConnection.model("", messageSchema, "messsages");
module.exports = {
  User,
  Messages
};

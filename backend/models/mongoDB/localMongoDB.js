const { userSchema, messageSchema } = require("./schemas");
const { localMongoDBConnection } = require("./connection");

const User = localMongoDBConnection.model("", userSchema, "user");
const Messages = localMongoDBConnection.model("", messageSchema, "messsages");

module.exports = {
  User,
  Messages
};

const { userSchema } = require("./schema");
const { remoteMongoDBConnection } = require("./connection");

const User = remoteMongoDBConnection.model("", userSchema, "user");

module.exports = {
  User
};

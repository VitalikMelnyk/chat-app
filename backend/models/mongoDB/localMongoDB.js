const { userSchema } = require("./schema");
const { localMongoDBConnection } = require("./connection");

const User = localMongoDBConnection.model("", userSchema, "user");

module.exports = {
  User
};

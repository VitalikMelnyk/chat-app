const mongoose = require("mongoose");
const {
  LOCAL_CONNECTION_URL,
  REMOTE_CONNECTION_URL
} = require("../../helpers/constants");

const localMongoDBConnection = mongoose.createConnection(
  LOCAL_CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 3000
  },
  err => {
    if (err) {
      console.log(
        "Unable to connect to the database. Please make sure that you have mongo db installed. Also, please make sure that you changed MY_HOST  constant inside constants.js file if it necessary. Error:",
        err
      );
    } else {
      console.log("Connected to Local Server successfully!");
    }
  }
);
const remoteMongoDBConnection = mongoose.createConnection(
  REMOTE_CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 3000
  },
  err => {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...", err);
    } else {
      console.log("Connected to Remote Server successfully!");
    }
  }
);

module.exports = { localMongoDBConnection, remoteMongoDBConnection };

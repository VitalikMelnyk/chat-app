// GENERAL CONSTANTS
const saltRounds = 10;
const port = process.env.PORT || 3002;

// REMOTE CLUSTER MONGODB CONSTANTS
const REMOTE_DATABASE_LOGIN = "Vitalii";
const REMOTE_DATABASE_PASSWORD = "Melnyk_17";
const REMOTE_DATABASE_NAME = "melnyk";
const REMOTE_CONNECTION_URL = `mongodb+srv://${REMOTE_DATABASE_LOGIN}:${REMOTE_DATABASE_PASSWORD}@melnyk-wtgg5.mongodb.net/${REMOTE_DATABASE_NAME}?retryWrites=true&w=majority`;

// LOCAL MONGODB CONSTANTS
const LOCAL_HOST = "mongodb://localhost";
const LOCAL_DATABASE = "users";
const LOCAL_CONNECTION_URL = `${LOCAL_HOST}/${LOCAL_DATABASE}`;

// REMOTE REDIS CLOUD
const REMOTE_REDIS_ENDPOINT =
  "redis-10495.c98.us-east-1-4.ec2.cloud.redislabs.com";

// CONSTANTS FOR TOKENS
const accessTokenSecret = "youraccesstokensecret";
const refreshTokenSecret = "yourrefreshtokensecrethere";
const refreshTokens = [];

module.exports = {
  REMOTE_CONNECTION_URL,
  LOCAL_CONNECTION_URL,
  REMOTE_REDIS_ENDPOINT,
  saltRounds,
  port,
  accessTokenSecret,
  refreshTokenSecret,
  refreshTokens,
};

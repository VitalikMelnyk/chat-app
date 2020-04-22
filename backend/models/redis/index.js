const redis = require("redis");
const REMOTE_REDIS_ENDPOINT =
  "redis-17371.c99.us-east-1-4.ec2.cloud.redislabs.com";

const REMOTE_REDIS_PORT = 17371;
const REMOTE_REDIS_AUTH = "MfM8d4Q61rAbcgWXjzPWJGzTFeys7XBw";
// const redisClient = redis.createClient({ host: "127.0.0.1", port: 6379 });
const redisClient = redis.createClient({
  host: REMOTE_REDIS_ENDPOINT,
  port: REMOTE_REDIS_PORT,
  // password: "gxybXLWMuhhjlZX6zoTOEDjHJViqsacQ",
});

redisClient.auth(
  process.env.REDISCLOUD_URL || REMOTE_REDIS_AUTH,
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log(res);
    }
  }
);

// redisClient.set("Football", "Messi");
redisClient.get("5e8469d769c20f4538a9920d", function (err, response) {
  if (err) {
    throw err;
  } else {
    console.log(response);
  }
});
// redisClient.on("connect", () => {
//   console.log("Redis client connected");
// });

// redisClient.on("error", (err) => {
//   console.log("Something went wrong " + err);
// });

module.exports = {
  redisClient,
};

const redis = require("redis");
const redisClient = redis.createClient({ host: "127.0.0.1", port: 6379 });

redisClient.on("connect", function() {
  console.log("Redis client connected");
});

redisClient.on("error", function(err) {
  console.log("Something went wrong " + err);
});

module.exports = {
  redisClient
};

const redis = require("redis");
const url = require('url');
const redisURL = url.parse(process.env.REDISCLOUD_URL);
const redisClient = redis.createClient(redisURL.port, redisURL.hostname, {
  no_ready_check: true,
});
redisClient.auth(redisURL.auth.split(":")[1]);
// const REMOTE_REDIS_ENDPOINT =
//   "redis-12204.c89.us-east-1-3.ec2.cloud.redislabs.com";
// const REMOTE_REDIS_PORT = 12204;
// const REMOTE_REDIS_AUTH = "8qmM0vDZM46eOiWqgqOc9Hee78R82Tf4";
// // const redisClient = redis.createClient({ host: "127.0.0.1", port: 6379 });
// const redisClient = redis.createClient({
//   host: REMOTE_REDIS_ENDPOINT,
//   port: REMOTE_REDIS_PORT,
//   // password: "gxybXLWMuhhjlZX6zoTOEDjHJViqsacQ",
// });

// redisClient.auth(
//   process.env.REDISCLOUD_URL || REMOTE_REDIS_AUTH,
//   (err, res) => {
//     if (err) {
//       throw err;
//     } else {
//       console.log(res);
//     }
//   }
// );

// redisClient.on("connect", () => {
//   console.log("Redis client connected");
// });

// redisClient.on("error", (err) => {
//   console.log("Something went wrong " + err);
// });

module.exports = {
  redisClient,
};

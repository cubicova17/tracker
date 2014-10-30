var redis = require("redis"), client = redis.createClient(19215, 'pub-redis-19215.us-east-1-1.1.ec2.garantiadata.com', {});
client.on("error", function (err) {
    logger.error("Error " + err);
});
client.auth("GCS5hGbeHuEjqWUZ")
module.exports = client;

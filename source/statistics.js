var _ = require('underscore');
var moment = require('moment');

var config = require('../config');
var logger = require('./utils/logger');
var redis = require("redis"), client = redis.createClient(19215, 'pub-redis-19215.us-east-1-1.1.ec2.garantiadata.com', {});
client.on("error", function (err) {
    logger.error("Error " + err);
});

function statistics(app) {
	app.route('/api/stats').get(function (req, res) {
      client.hgetall("websites", function (err, obj) {
        var counter = {};

        for(website in obj){
          client.get(website, function(err, reply) {
             counter[website] = reply;
          });

        }
        setTimeout(function() {
          res.json(counter);
        }, 1000);


      });
	});
}

module.exports = statistics;

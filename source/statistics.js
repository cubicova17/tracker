var _ = require('underscore');
var moment = require('moment');

var config = require('../config');
var logger = require('./utils/logger');
var client = require('./utils/redis');

function statistics(app) {
	app.route('/api/stats').get(function (req, res) {
      client.hgetall("websites", function (err, obj) {
        var counter = {};

        Object.keys(obj).forEach(function(key) {
           client.get(key, function(err, reply) {
             counter[key] = reply;
           });
        });

        setTimeout(function() {
          logger.info(counter);
          res.json(counter);
        }, 1000);


      });
	});
}

module.exports = statistics;

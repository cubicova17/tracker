var _ = require('underscore');
var moment = require('moment');

var config = require('../config');
var logger = require('./utils/logger');
var client = require('./utils/redis');

function statistics(app) {
	app.route('/api/stats').get(function (req, res) {
      client.hgetall("websites", function (err, obj) {
         res.json(obj);
      });
	});
}

module.exports = statistics;

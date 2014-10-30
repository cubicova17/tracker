var _ = require('underscore');
var moment = require('moment');

var config = require('../config');
var logger = require('./utils/logger');

var redis = require("redis"), client = redis.createClient();
client.on("error", function (err) {
    logger.error("Error " + err);
});

function tracker(app) {
	var validate = function (req, res, next) {
    if (!req.query.partner) {
			return res.send(200);
		}
		next();
	};

	app.route('/api/track').get(validate, function (req, res, next) {
    var website = req.query.partner;
    client.incr(website);
    client.incr(website + moment().utc().toDate().toString().substring(0, 10));
    client.hsetnx("websites", website, true);
    return res.send(200);
	});
}

module.exports = tracker;

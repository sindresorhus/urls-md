'use strict';
var getUrls = require('get-urls');
var articleTitle = require('article-title');
var eachAsync = require('each-async');
var request = require('request');

module.exports = function (str, cb) {
	var ret = [];

	eachAsync(getUrls(str), function (url, i, next) {
		request(url, function (err, res, body) {
			if (err || res.statusCode !== 200) {
				return next(err || res.statusCode);
			}

			if (/(^image\/)/i.test(res.headers['content-type'])) {
				ret[i] = '![](' + url + ')';
				return next();
			}

			var title = articleTitle(body);

			if (!title) {
				return next('Couldn\'t get title for ' + url);
			}

			ret[i] = '[' + title + '](' + url + ')';
			next();
		});
	}, function (err) {
		cb(err, ret);
	});
};

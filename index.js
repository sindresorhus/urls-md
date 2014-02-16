'use strict';
var getUrls = require('get-urls');
var articleTitle = require('article-title');
var eachAsync = require('each-async');
var request = require('request');
var chalk = require('chalk');

module.exports = function (str, cb) {
	var ret = [];
	var urls = getUrls(str);

	if (urls.length === 0) {
		return console.error('No URLs found');
	}

	eachAsync(getUrls(str), function (url, i, next) {
		request(url, function (err, res, body) {
			if (err) {
				if (err.code === 'ENOTFOUND') {
					return console.error('Couldn\'t resolve ' + chalk.blue(url));
				} else {
					return next(err);
				}
			}

			if (res.statusCode !== 200) {
				return next(res.statusCode);
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

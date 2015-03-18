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
		console.error('No URLs found');
		return;
	}

	eachAsync(getUrls(str), function (url, i, next) {
		request(url, function (err, res, body) {
			if (err && err.code === 'ENOTFOUND') {
				console.error('Couldn\'t resolve ' + chalk.blue(url));
				return;
			}

			if (err) {
				next(err);
				return;
			}

			if (res.statusCode !== 200) {
				next(res.statusCode);
				return;
			}

			if (/(^image\/)/i.test(res.headers['content-type'])) {
				ret[i] = '![](' + url + ')';
				next();
				return;
			}

			var title = articleTitle(body);

			if (!title) {
				next('Couldn\'t get title for ' + url);
				return;
			}

			ret[i] = '[' + title + '](' + url + ')';
			next();
		});
	}, function (err) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, ret);
	});
};

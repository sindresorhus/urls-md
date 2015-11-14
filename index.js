'use strict';
var getUrls = require('get-urls');
var articleTitle = require('article-title');
var eachAsync = require('each-async');
var got = require('got');
var chalk = require('chalk');
var pify = require('pify');

function urlsMd(str, cb) {
	var ret = [];
	var urls = getUrls(str);

	if (urls.length === 0) {
		console.error('No URLs found');
		return;
	}

	eachAsync(getUrls(str), function (url, i, next) {
		got(url, function (err, data, res) {
			if (err && err.code === 'ENOTFOUND') {
				console.error('Couldn\'t resolve ' + chalk.blue(url));
				return;
			}

			if (err) {
				next(err);
				return;
			}

			if (/(^image\/)/i.test(res.headers['content-type'])) {
				ret[i] = '![](' + url + ')';
				next();
				return;
			}

			var title = articleTitle(data);

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
}

module.exports = pify(urlsMd);

'use strict';
const getUrls = require('get-urls');
const articleTitle = require('article-title');
const got = require('got');

module.exports = str => {
	const urls = getUrls(str);

	if (urls.length === 0) {
		return Promise.reject(new Error('No URLs found'));
	}

	return Promise.all(urls.map(url => got(url)
		.then(res => {
			if (/(^image\/)/i.test(res.headers['content-type'])) {
				return `![](${url})`;
			}

			const title = articleTitle(res.body) || url;
			return `[${title}](${url})`;
		})
		.catch(err => {
			if (err.code === 'ENOTFOUND') {
				throw new Error(`Couldn't resolve ${url}`);
			}

			throw err;
		}))
	);
};

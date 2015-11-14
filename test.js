/* eslint-env mocha */
'use strict';
var assert = require('assert');
var fs = require('fs');
var urlsMd = require('./');

it('should extract links, get title, and convert to markdown links', function (cb) {
	this.timeout(10000);

	urlsMd(fs.readFileSync('fixture.txt', 'utf8'), function (err, data) {
		if (err) {
			console.error(err);
			assert(false);
		}

		assert.deepEqual(data, [
			'[Yo Polymer – A Whirlwind Tour Of Web Component Tooling](http://updates.html5rocks.com/2014/01/Yo-Polymer-A-Whirlwind-Tour-Of-Web-Component-Tooling)',
			'[Angular Fullstack 1.2.0 available now](http://tylerhenkel.com/angular-fullstack-1-2-0-available-now)',
			'![](https://github.global.ssl.fastly.net/images/modules/logos_page/GitHub-Mark.png)'
		]);

		cb();
	});
});

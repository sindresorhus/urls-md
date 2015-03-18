#!/usr/bin/env node
'use strict';
var fs = require('fs');
var stdin = require('get-stdin');
var meow = require('meow');
var urlsMd = require('./');

var cli = meow({
	help: [
		'Usage',
		'  $ urls-md <file>',
		'  $ cat <file> | urls-md'
	].join('\n')
});

function init(str) {
	urlsMd(str, function (err, data) {
		if (err) {
			console.error(err.message);
			process.exit(1);
		}

		console.log(data.join('\n\n'));
	});
}

if (process.stdin.isTTY) {
	if (!cli.input[0]) {
		console.error('Input file required');
		process.exit(1);
	}

	init(fs.readFileSync(cli.input[0], 'utf8'));
} else {
	stdin(init);
}

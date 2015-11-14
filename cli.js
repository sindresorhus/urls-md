#!/usr/bin/env node
'use strict';
var fs = require('fs');
var getStdin = require('get-stdin');
var meow = require('meow');
var urlsMd = require('./');

var cli = meow([
	'Usage',
	'  $ urls-md <file>',
	'  $ cat <file> | urls-md'
]);

function init(str) {
	urlsMd(str).then(function (data) {
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
	getStdin().then(init);
}

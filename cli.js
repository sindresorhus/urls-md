#!/usr/bin/env node
'use strict';
var fs = require('fs');
var urlsMd = require('./index');
var input = process.argv[2];

function stdin(cb) {
	var ret = '';
	process.stdin.setEncoding('utf8');
	process.stdin.on('data', function (data) { ret += data });
	process.stdin.on('end', function () { cb(ret) }).resume();
}

function help() {
	console.log('urls-md <input-file>');
	console.log('or');
	console.log('cat <input-file> | urls-md');
}

function convert(str) {
	urlsMd(str, function (err, data) {
		if (err) {
			throw err;
		}

		console.log(data.join('\n\n'));
	});
}

if (process.argv.indexOf('-h') !== -1 || process.argv.indexOf('--help') !== -1) {
	help();
	return;
}

if (process.argv.indexOf('-v') !== -1 || process.argv.indexOf('--version') !== -1) {
	console.log(require('./package').version);
	return;
}

if (process.stdin.isTTY) {
	if (!input) {
		return help();
	}

	convert(fs.readFileSync(input, 'utf8'));
} else {
	stdin(convert);
}

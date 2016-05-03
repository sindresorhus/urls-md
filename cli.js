#!/usr/bin/env node
'use strict';
const fs = require('fs');
const getStdin = require('get-stdin');
const meow = require('meow');
const urlsMd = require('./');

const cli = meow(`
	Usage
	  $ urls-md <file>
	  $ cat <file> | urls-md
`);

const init = str => urlsMd(str).then(x => console.log(x.join('\n\n')));

if (process.stdin.isTTY) {
	if (!cli.input[0]) {
		console.error('Input file required');
		process.exit(1);
	}

	init(fs.readFileSync(cli.input[0], 'utf8'));
} else {
	getStdin().then(init);
}

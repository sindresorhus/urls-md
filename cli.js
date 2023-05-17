#!/usr/bin/env node
import process from 'node:process';
import fs from 'node:fs';
import getStdin from 'get-stdin';
import meow from 'meow';
import urlsMd from './index.js';

const cli = meow(`
	Usage
	  $ urls-md <file>
	  $ cat <file> | urls-md
`, {
	importMeta: import.meta,
});

const init = async string => {
	const urls = await urlsMd(string);
	console.log(urls.join('\n\n'));
};

if (process.stdin.isTTY) {
	if (!cli.input[0]) {
		console.error('Input file required');
		process.exit(1);
	}

	await init(fs.readFileSync(cli.input[0], 'utf8'));
} else {
	const stdin = await getStdin();
	await init(stdin);
}

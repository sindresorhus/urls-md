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

const run = async text => {
	const urls = await urlsMd(text);
	console.log(urls.join('\n\n'));
};

const text = process.stdin.isTTY
	? (cli.input[0]
		? fs.readFileSync(cli.input[0], 'utf8')
		: (() => {
			console.error('Input file required');
			process.exit(1);
		})())
	: await getStdin();

await run(text);

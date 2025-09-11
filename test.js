import fs from 'node:fs';
import test from 'ava';
import urlsMd from './index.js';

test('main', async t => {
	t.deepEqual(await urlsMd(fs.readFileSync('fixture.txt', 'utf8')), [
		'[Goodbye, Node.js Buffer](https://sindresorhus.com/blog/goodbye-nodejs-buffer)',
		'[Small Focused Modules](https://sindresorhus.com/blog/small-focused-modules)',
		'![](https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1024px-Octicons-mark-github.svg.png)',
	]);
});

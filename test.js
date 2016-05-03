import fs from 'fs';
import test from 'ava';
import m from './';

test(async t => {
	t.deepEqual(await m(fs.readFileSync('fixture.txt', 'utf8')), [
		'[Yo Polymer – A Whirlwind Tour Of Web Component Tooling](http://updates.html5rocks.com/2014/01/Yo-Polymer-A-Whirlwind-Tour-Of-Web-Component-Tooling)',
		'[Angular Fullstack 1.2.0 available now](http://tylerhenkel.com/angular-fullstack-1-2-0-available-now)',
		'![](https://github.global.ssl.fastly.net/images/modules/logos_page/GitHub-Mark.png)'
	]);
});

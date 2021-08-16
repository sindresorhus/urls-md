# urls-md

> Convert URLs to Markdown links and images

[Extracts URLs from text](https://github.com/sindresorhus/get-urls) → [Gets their article title](https://github.com/sindresorhus/article-title) → Creates Markdown links and images

Useful for when you have a linkdump and want them in Markdown.

###### From

```
Lorem ipsum dolor sit amet
http://updates.html5rocks.com/2014/01/Yo-Polymer-A-Whirlwind-Tour-Of-Web-Component-Tooling
Magnis dis parturient montes.
Lorem http://codelittle.com/tag/yeoman/
https://github.global.ssl.fastly.net/images/modules/logos_page/GitHub-Mark.png
```

###### To

```
[Yo Polymer – A Whirlwind Tour Of Web Component Tooling](http://updates.html5rocks.com/2014/01/Yo-Polymer-A-Whirlwind-Tour-Of-Web-Component-Tooling)

[How To Use Yeoman](http://codelittle.com/tag/yeoman/)

![](https://github.global.ssl.fastly.net/images/modules/logos_page/GitHub-Mark.png)
```

## Install

```
$ npm install urls-md
```

## Usage

```js
import urslMd from 'urls-md';

const urls = await urlsMd('Lorem ipsum http://codelittle.com/tag/yeoman/');

console.log(urls);
//=>  ['[How To Use Yeoman](http://codelittle.com/tag/yeoman/)']
```

## API

### urlsMd(input)

#### input

Type: `string`

Text to extract Markdown links and images from.

## CLI

```
$ npm install --global urls-md
```

```
$ urls-md --help

  Usage
    urls-md <file>
    cat <file> | urls-md
```

You can also easily run through multiple files using shell scripting. In this example using ZSH syntax:

```
# loops through all .txt files in the current directory and outputs the converted files with .md extension
for f (*.txt) { urls-md $f > $f.md }
```

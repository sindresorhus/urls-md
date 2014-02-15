# urls-md [![Build Status](https://travis-ci.org/sindresorhus/urls-md.png?branch=master)](https://travis-ci.org/sindresorhus/urls-md)

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


## CLI

#### Install

```
npm install --global urls-md
```

#### Usage

```
$ urls-md --help

urls-md <input-file>
or
cat <input-file> | urls-md
```

You can also easily run through multiple files using shell scripting. In this example using ZSH syntax:

```zsh
# loops through all .txt files in the current directory and outputs the converted files with .md extension
for f (*.txt) { urls-md $f > $f.md }
```


## API

#### Install

```
npm install --save urls-md
```

#### Usage

```js
urlsMd('Lorem ipsum http://codelittle.com/tag/yeoman/');
//=> ['How To Use Yeoman']
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)

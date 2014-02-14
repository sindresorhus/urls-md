# urls-md [![Build Status](https://travis-ci.org/sindresorhus/urls-md.png?branch=master)](https://travis-ci.org/sindresorhus/urls-md)

> Convert URLs to Markdown links  

[Extracts URLs from text](https://github.com/sindresorhus/get-urls) → [Gets their article title](https://github.com/sindresorhus/article-title) → Creates Markdown links

Useful for when you have a linkdump and want them as Markdown links.


###### From

```
Lorem ipsum dolor sit amet
http://updates.html5rocks.com/2014/01/Yo-Polymer-A-Whirlwind-Tour-Of-Web-Component-Tooling
Magnis dis parturient montes.
Lorem http://codelittle.com/tag/yeoman/
```

###### To

```
[Yo Polymer – A Whirlwind Tour Of Web Component Tooling](http://updates.html5rocks.com/2014/01/Yo-Polymer-A-Whirlwind-Tour-Of-Web-Component-Tooling)

[How To Use Yeoman](http://codelittle.com/tag/yeoman/)
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

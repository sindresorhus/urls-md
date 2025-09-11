/**
Convert URLs in text to Markdown links and images.

@param text - Text containing URLs to convert.
@returns Array of Markdown formatted links and images.

@example
```
import urlsMd from 'urls-md';

const urls = await urlsMd('Lorem ipsum http://codelittle.com/tag/yeoman/');

console.log(urls);
//=> ['[How To Use Yeoman](http://codelittle.com/tag/yeoman/)']
```
*/
export default function urlsMd(text: string): Promise<string[]>;

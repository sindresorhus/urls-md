import getUrls from 'get-urls';
import articleTitle from 'article-title';
import {withTimeout, withHttpError} from 'fetch-extras';

const enhancedFetch = withTimeout(withHttpError(fetch), 30_000);

export default async function urlsMd(text) {
	const urls = [...getUrls(text)];

	if (urls.length === 0) {
		throw new Error('No URLs found');
	}

	return Promise.all(urls.map(async url => {
		try {
			const response = await enhancedFetch(url, {
				headers: {
					'User-Agent': 'urls-md (https://github.com/sindresorhus/urls-md)',
				},
			});

			const contentType = response.headers.get('content-type');
			if (contentType?.toLowerCase().startsWith('image/')) {
				return `![](${url})`;
			}

			const html = await response.text();
			const title = articleTitle(html) ?? url;
			return `[${title}](${url})`;
		} catch (error) {
			if (error.cause?.code === 'ENOTFOUND' || error.message?.includes('ENOTFOUND')) {
				throw new Error(`Could not resolve ${url}`);
			}

			throw error;
		}
	}));
}

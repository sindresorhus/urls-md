import getUrls from 'get-urls';
import articleTitle from 'article-title';
import got from 'got';

export default async function urlsMd(string) {
	const urls = getUrls(string);

	if (urls.length === 0) {
		throw new Error('No URLs found');
	}

	return Promise.all(
		[...urls].map(async url => {
			let response;
			try {
				response = await got(url);
			} catch (error) {
				if (error.code === 'ENOTFOUND') {
					throw new Error(`Could not resolve ${url}`);
				}

				throw error;
			}

			if (response.headers['content-type'].toLowerCase().startsWith('image/')) {
				return `![](${url})`;
			}

			const title = articleTitle(response.body) ?? url;
			return `[${title}](${url})`;
		}),
	);
}

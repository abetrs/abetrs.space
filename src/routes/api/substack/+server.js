// Server-side proxy for Substack feeds to avoid CORS in the browser.
// Returns JSON: { type: 'json', data } or { type: 'rss', data: '<xml>...</xml>' }
export async function GET() {
	const target = 'https://abetheunicorn.substack.com';
	const headers = { 'content-type': 'application/json' };

	try {
		// First try JSON-ish endpoint
		try {
			const res = await fetch(target + '/?format=json');
			if (res.ok) {
				const data = await res.json();
				return new Response(JSON.stringify({ type: 'json', data }), {
					status: 200,
					headers: {
						...headers,
						'cache-control': 'public, max-age=300'
					}
				});
			}
		} catch (e) {
			// continue to RSS fetch
			console.warn('Substack JSON proxy failed', e);
		}

		// Fallback to RSS feed
		const rssRes = await fetch(target + '/feed');
		if (rssRes.ok) {
			const xml = await rssRes.text();
			return new Response(JSON.stringify({ type: 'rss', data: xml }), {
				status: 200,
				headers: {
					...headers,
					'cache-control': 'public, max-age=300'
				}
			});
		}

		return new Response(JSON.stringify({ type: 'error', message: 'Upstream fetch failed' }), {
			status: 502,
			headers
		});
	} catch (err) {
		return new Response(JSON.stringify({ type: 'error', message: String(err) }), {
			status: 500,
			headers
		});
	}
}

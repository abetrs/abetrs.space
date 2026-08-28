<script>
	import { onMount } from 'svelte';

	/**
	 * A single Datawrapper embed.
	 *
	 * Datawrapper charts post their rendered height back to the parent window as
	 * `{ 'datawrapper-height': { <chartId>: <px> } }` once they've laid out. We
	 * listen for that and resize the iframe, which is how the official embed
	 * snippet works — no third-party script needed.
	 *
	 * @type {{ id: string, height?: number, title?: string }}
	 */
	let { id, height = 420, title = 'Datawrapper chart' } = $props();

	let currentHeight = $state(height);
	let frame = $state(null);

	const src = `https://datawrapper.dwcdn.net/${id}/`;

	onMount(() => {
		function onMessage(event) {
			let payload = event.data;
			if (typeof payload === 'string') {
				try {
					payload = JSON.parse(payload);
				} catch {
					return;
				}
			}
			const heights = payload && payload['datawrapper-height'];
			if (!heights) return;

			// Prefer an exact chart-id match; fall back to matching the frame that
			// sent the message, since older charts key by their internal iframe id.
			if (typeof heights[id] === 'number') {
				currentHeight = heights[id];
				return;
			}
			if (frame && event.source === frame.contentWindow) {
				const first = Object.values(heights)[0];
				if (typeof first === 'number') currentHeight = first;
			}
		}

		window.addEventListener('message', onMessage);
		return () => window.removeEventListener('message', onMessage);
	});
</script>

<div class="dw-embed">
	<iframe
		bind:this={frame}
		{title}
		{src}
		height={currentHeight}
		style="height: {currentHeight}px"
		scrolling="no"
		frameborder="0"
		loading="lazy"
		data-external="1"
	></iframe>
	<a
		class="dw-source font-garamond"
		href="https://www.datawrapper.de/_/{id}/"
		target="_blank"
		rel="noopener noreferrer"
	>
		Open in Datawrapper
		<svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
			<path
				d="M2 12L12 2M12 2H5M12 2v7"
				stroke="currentColor"
				stroke-width="1.6"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</a>
</div>

<style>
	.dw-embed {
		display: flex;
		flex-direction: column;
		gap: 10px;
		background: rgba(255, 255, 255, 0.82);
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 12px;
		padding: 18px 18px 12px;
		transition: box-shadow 0.22s ease;
	}
	.dw-embed:hover {
		box-shadow: 0 8px 28px rgba(0, 0, 0, 0.09);
	}

	iframe {
		width: 100%;
		min-width: 100%;
		border: none;
		display: block;
	}

	.dw-source {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		align-self: flex-end;
		font-size: 12px;
		letter-spacing: 0.03em;
		color: rgba(0, 0, 0, 0.38);
		text-decoration: none;
		transition:
			color 0.15s ease,
			gap 0.15s ease;
	}
	.dw-source:hover {
		color: rgba(0, 0, 0, 0.72);
		gap: 8px;
	}

	:global(html[data-theme='night']) .dw-embed {
		background: rgba(255, 255, 255, 0.9);
		border-color: rgba(255, 255, 255, 0.14);
	}
</style>

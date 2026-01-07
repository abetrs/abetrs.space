<script>
	import BlogPost from '$lib/components/BlogPost.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// Container reference for scroll detection
	let pageContainer = $state(null);
	let showBackToTop = $state(false);
	let isAtBottom = $state(false);
	let scrollThreshold = 150;
	let accumulatedScroll = $state(0);

	// Blog posts state (will be populated by remote fetch). Keep empty array as default/fallback.
	let blogPosts = $state([]);

	// Helper: strip HTML tags from a string and trim
	function stripHtml(input) {
		if (!input) return '';
		try {
			// Simple removal of tags
			return input
				.replace(/<[^>]*>/g, '')
				.replace(/\s+/g, ' ')
				.trim();
		} catch (e) {
			return input;
		}
	}

	// Try JSON endpoint first, then fallback to RSS feed parsing
	async function fetchRecentPosts() {
		const blogs = [
			{ blog: 'underground', name: 'The Underground' },
			{ blog: 'cricwar', name: 'CricWAR' }
		];
		const maxTotal = 3;
		let allPosts = [];

		// Fetch from both blogs via proxy
		for (const blogConfig of blogs) {
			try {
				const res = await fetch(`/api/substack?blog=${blogConfig.blog}`);
				if (!res.ok) continue;

				const payload = await res.json();

				if (payload.type === 'rss' && payload.data) {
					const xml = payload.data;
					const parser = new DOMParser();
					const doc = parser.parseFromString(xml, 'text/xml');

					// Check for XML parsing errors
					if (doc.getElementsByTagName('parsererror').length > 0) {
						console.warn(`Failed to parse RSS for ${blogConfig.name}`);
						continue;
					}

					const items = Array.from(doc.querySelectorAll('item'));
					for (const item of items) {
						const title = item.querySelector('title')?.textContent || '';
						const description =
							item.querySelector('description')?.textContent ||
							item.querySelector('content\\:encoded')?.textContent ||
							'';
						let cover = null;
						const imgMatch = (description || '').match(/<img[^>]+src=["']?([^"'>\s]+)["']?/i);
						if (imgMatch) cover = imgMatch[1];
						if (!cover) {
							const enclosure = item.querySelector('enclosure');
							if (enclosure && enclosure.getAttribute('url')) cover = enclosure.getAttribute('url');
						}

						const link = item.querySelector('link')?.textContent || null;
						const pubDate = item.querySelector('pubDate')?.textContent || null;

						// Parse date for sorting
						const publishedDate = pubDate ? new Date(pubDate) : new Date(0);

						allPosts.push({
							title,
							excerpt: stripHtml(description).slice(0, 300),
							coverImage: cover,
							publishedDate: pubDate,
							publishedDateObj: publishedDate,
							readTime: null,
							url: link,
							source: blogConfig.name
						});
					}
				}
			} catch (e) {
				console.warn(`Failed to fetch posts from ${blogConfig.name}:`, e);
			}
		}

		// Sort by date (most recent first) and take top 3
		if (allPosts.length > 0) {
			allPosts.sort((a, b) => b.publishedDateObj - a.publishedDateObj);
			blogPosts = allPosts.slice(0, maxTotal).map((p, i) => ({
				title: p.title || 'Untitled',
				excerpt: p.excerpt || 'No preview available.',
				coverImage: p.coverImage || null,
				publishedDate: p.publishedDate || null,
				readTime: p.readTime || 5,
				url: p.url || 'https://abetheunicorn.substack.com',
				source: p.source
			}));
		}
	}

	function handleScroll() {
		if (!pageContainer || typeof window === 'undefined') return;

		const { scrollTop } = document.documentElement;
		const containerRect = pageContainer.getBoundingClientRect();
		const containerBottom = containerRect.bottom;
		const windowHeight = window.innerHeight;

		// Check if we've scrolled to the bottom of the component
		const isComponentAtBottom = containerBottom <= windowHeight + 10;

		if (isComponentAtBottom && !isAtBottom) {
			isAtBottom = true;
			accumulatedScroll = 0;
		} else if (!isComponentAtBottom && isAtBottom) {
			isAtBottom = false;
			accumulatedScroll = 0;
			showBackToTop = false;
		}

		// Show back to top after some additional scroll
		if (isAtBottom) {
			const deltaY = scrollTop - (window.lastScrollY || 0);
			if (deltaY > 0) {
				accumulatedScroll += deltaY;
				if (accumulatedScroll >= scrollThreshold) {
					showBackToTop = true;
				}
			}
		}

		window.lastScrollY = scrollTop;
	}

	function handleWheel(e) {
		// When at the bottom, browsers may stop firing scroll events but wheel events continue.
		if (typeof window === 'undefined' || !pageContainer) return;
		if (!isAtBottom) return;
		const delta = e.deltaY || 0;
		if (delta > 0) {
			accumulatedScroll += Math.abs(delta);
			if (accumulatedScroll >= scrollThreshold) {
				showBackToTop = true;
			}
		}
	}

	function scrollToTop() {
		if (typeof window !== 'undefined') {
			document.body.style.transition = 'opacity 400ms ease-in-out';
			document.body.style.opacity = '0.7';

			setTimeout(() => {
				goto('/').then(() => {
					window.scrollTo({ top: 0, behavior: 'smooth' });
					setTimeout(() => {
						document.body.style.opacity = '1';
						setTimeout(() => {
							document.body.style.transition = '';
						}, 100);
					}, 100);
				});
			}, 200);
		}
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll, { passive: true });
			// Also listen to wheel events to detect continued scroll intent at boundaries
			window.addEventListener('wheel', handleWheel, { passive: true });

			// Fetch recent posts from Substack (client-side only)
			fetchRecentPosts().catch((e) => console.warn('fetchRecentPosts error', e));

			return () => {
				window.removeEventListener('scroll', handleScroll);
				window.removeEventListener('wheel', handleWheel);
			};
		}
	});
</script>

<div bind:this={pageContainer} class="w-full max-w-[1200px]">
	<div class="text-center">
		<h1 class="font-condensed mb-8 text-[48px] font-bold tracking-[-2px] text-black">Blog(s)</h1>
		<div class="font-condensed text-[24px] leading-relaxed text-black">
			<p class="mb-8">
				I have two blogs where I explore two of my biggest passions. The first is a journal-like
				music and culture blog where I review my favorite pieces and share my music journey with the
				world. The second is an analytic exploration of cricket, uncovering evidence-based insights
				about the sport in a layman-friendly way.
			</p>

			<div class="space-y-8 text-left">
				<div class="rounded-lg border-l-4 border-black bg-white p-6 shadow-sm">
					<h3 class="mb-2 text-[28px] font-semibold">The Underground</h3>
					<p class="mb-4 text-[18px] text-gray-700">Reflections on music, culture and more</p>
					<a
						href="https://abetheunicorn.substack.com/"
						class="text-[18px] text-black underline hover:no-underline"
					>
						Read on Substack →
					</a>
				</div>

				<div class="rounded-lg border-l-4 border-black bg-white p-6 shadow-sm">
					<h3 class="mb-2 text-[28px] font-semibold">CricWAR</h3>
					<p class="mb-4 text-[18px] text-gray-700">
						Bringing 21st Century cricket tactics to the people
					</p>
					<a
						href="https://cricwar.substack.com/"
						class="text-[18px] text-black underline hover:no-underline"
					>
						Read on Substack →
					</a>
				</div>

				<div class="space-y-6">
					<h3 class="text-[28px] font-semibold">Recent Posts</h3>
					<div class="mt-6 flex flex-col gap-8">
						{#each blogPosts as post, index}
							<BlogPost
								title={post.title}
								excerpt={post.excerpt}
								publishedDate={post.publishedDate}
								readTime={post.readTime}
								url={post.url}
								coverImage={post.coverImage}
								{index}
							/>
						{/each}
					</div>
				</div>

				<!-- Additional content to ensure scrolling is possible -->
				<div class="mt-16 space-y-8 text-center">
					<div class="font-mono text-sm text-gray-500">
						End of portfolio - Continue scrolling to return to the beginning
					</div>
					<!-- Spacer to enable scroll-to-top -->
					<div class="h-32"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Back to top indicator (for last page) -->
{#if showBackToTop}
	<div class="fixed bottom-8 left-1/2 z-50 -translate-x-1/2">
		<button
			class="rounded-full bg-black/90 px-6 py-3 text-white shadow-lg backdrop-blur-sm transition-colors duration-200 hover:bg-black"
			onclick={scrollToTop}
		>
			<div class="flex items-center space-x-3">
				<!-- Up arrow -->
				<svg
					class="h-5 w-5 animate-bounce text-white"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M5 10l7-7m0 0l7 7m-7-7v18"
					></path>
				</svg>

				<!-- Text -->
				<div class="font-mono text-sm">
					<div class="text-white/80">Continue scrolling to</div>
					<div class="font-medium text-white">Return to Bio</div>
				</div>
			</div>
		</button>
	</div>
{/if}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

	.font-mono {
		font-family: 'Roboto Mono', 'Courier New', monospace;
	}
</style>

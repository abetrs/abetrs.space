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

	// Static blog posts data using Svelte 5 runes
	let blogPosts = $state([
		{
			title: 'The Internet, AI, and The Truman Show',
			excerpt:
				'Exploring how AI and internet culture shape our perception of reality, drawing parallels to The Truman Show. Reflections on privacy, technology, and societal impacts in a hyper-connected world.',
			publishedDate: '2025-08-05',
			readTime: 8,
			url: 'https://abetheunicorn.substack.com/p/the-internet-ai-and-the-truman-show'
		},
		{
			title: 'DEVLOG - What do you even work on?',
			excerpt:
				'Explores summer side-projects like a music taste app, blog, and cricket stats, while reflecting on coding productivity and project completion challenges.',
			publishedDate: '2025-07-25',
			readTime: 7,
			url: 'https://abetheunicorn.substack.com/p/devlog-what-do-you-even-work-on'
		},
		{
			title: 'Returning to Making',
			excerpt:
				'Explores managing multiple hobbies like music, coding, and filmmaking, and shares strategies for consistently finishing creative projects.',
			publishedDate: '2025-07-18',
			readTime: 9,
			url: 'https://abetheunicorn.substack.com/p/returning-to-making'
		}
	]);

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
			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}
	});
</script>

<div bind:this={pageContainer} class="w-full max-w-[800px]">
	<div class="text-center">
		<h1 class="font-condensed mb-8 text-[48px] font-bold tracking-[-2px] text-black">Blog</h1>
		<div class="font-condensed text-[24px] leading-relaxed text-black">
			<p class="mb-8">
				Thoughts and insights on technology, design, and the intersection of innovation with
				real-world problem solving. Follow my journey through tech, culture, and creative
				exploration.
			</p>

			<div class="space-y-8 text-left">
				<div class="rounded-lg border-l-4 border-black bg-white p-6 shadow-sm">
					<h3 class="mb-2 text-[28px] font-semibold">Memo</h3>
					<p class="mb-4 text-[18px] text-gray-700">
						Regular posts about creativity, design, development insights, and personal
						reflections on the creative process.
					</p>
					<a
						href="https://abetheunicorn.substack.com/"
						class="text-[18px] text-black underline hover:no-underline"
					>
						Read on Substack →
					</a>
				</div>

				<div class="space-y-6">
					<h3 class="text-[28px] font-semibold">Recent Posts</h3>
					{#each blogPosts as post, index}
						<BlogPost
							title={post.title}
							excerpt={post.excerpt}
							publishedDate={post.publishedDate}
							readTime={post.readTime}
							url={post.url}
							{index}
						/>
					{/each}
				</div>

				<!-- Additional content to ensure scrolling is possible -->
				<div class="mt-16 space-y-8 text-center">
					<div class="text-sm text-gray-500 font-mono">
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
	<div class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
		<button 
			class="bg-black/90 text-white px-6 py-3 rounded-full shadow-lg backdrop-blur-sm hover:bg-black transition-colors duration-200"
			onclick={scrollToTop}
		>
			<div class="flex items-center space-x-3">
				<!-- Up arrow -->
				<svg 
					class="w-5 h-5 text-white animate-bounce" 
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
				<div class="text-sm font-mono">
					<div class="text-white/80">Continue scrolling to</div>
					<div class="text-white font-medium">Return to Bio</div>
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
<script>
	import ScrollToNextIndicator from '$lib/components/ScrollToNextIndicator.svelte';
	import { onMount } from 'svelte';
	import { useScrollToNext } from '$lib/composables/useScrollToNext.js';
	import { getNextPagePath } from '$lib/stores/navigation.svelte.js';
	import { page } from '$app/stores';

	// Container reference for scroll detection
	let pageContainer = $state(null);

	// Scroll-to-next functionality
	const scrollToNext = useScrollToNext();
	
	// Get next page name for indicator
	let nextPagePath = $derived($page.url ? getNextPagePath($page.url.pathname) : null);
	let nextPageName = $derived(() => {
		if (nextPagePath === '/hobbies') return 'Hobbies';
		if (nextPagePath === '/blog') return 'Blog';
		return 'Next Page';
	});

	// Initialize scroll functionality
	onMount(() => {
		scrollToNext.initScrollListener();
		return () => {
			scrollToNext.destroyScrollListener();
		};
	});

	// Set the container reference for scroll detection
	$effect(() => {
		if (pageContainer) {
			scrollToNext.containerRef.value = pageContainer;
		}
	});
</script>

<!-- Content Area -->
<div bind:this={pageContainer} class="w-full max-w-[800px]">
	<div class="text-center">
		<h1 class="font-condensed mb-8 text-[48px] font-bold tracking-[-2px] text-black">
			College
		</h1>
		<div class="font-condensed text-[24px] leading-relaxed text-black">
			<p class="mb-8">
				My academic journey at William & Mary, exploring Computer Science while actively
				engaging in campus life and extracurricular activities.
			</p>

			<!-- Placeholder content for college -->
			<div class="space-y-8 text-left">
				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h3 class="mb-4 text-[28px] font-semibold">William & Mary</h3>
					<p class="mb-2 text-[20px] text-gray-700">Bachelor of Science in Computer Science</p>
					<p class="mb-4 text-[18px] text-gray-600">Class of 2026</p>
					<p class="text-[18px] text-gray-700">
						Focused on software engineering, data structures, algorithms, and digital
						innovation. Coursework includes Advanced Programming, Database Systems, and Computer
						Graphics.
					</p>
				</div>

				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h3 class="mb-4 text-[28px] font-semibold">Campus Involvement</h3>
					<ul class="space-y-3 text-[18px] text-gray-700">
						<li class="flex items-start">
							<span class="mr-3 text-black">•</span>
							<span><strong>Cricket Club:</strong> Active member and team player</span>
						</li>
						<li class="flex items-start">
							<span class="mr-3 text-black">•</span>
							<span
								><strong>The Flat Hat:</strong> Contributing writer for the student newspaper</span
							>
						</li>
						<li class="flex items-start">
							<span class="mr-3 text-black">•</span>
							<span
								><strong>International Mini Mart:</strong> Cultural engagement and community building</span
							>
						</li>
					</ul>
				</div>
			</div>

			<!-- Additional content to ensure scrolling is possible -->
			<div class="mt-16 space-y-8 text-center">
				<div class="text-sm text-gray-500 font-mono">
					Continue scrolling to explore my hobbies and interests
				</div>
				<!-- Spacer to enable scroll-to-next -->
				<div class="h-32"></div>
			</div>
		</div>
	</div>
</div>

<!-- Scroll-to-next indicator -->
{#if nextPagePath}
	<ScrollToNextIndicator nextPageName={nextPageName()} />
{/if}

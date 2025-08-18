<script>
	import TypewriterText from '$lib/components/TypewriterText.svelte';
	import ScrollToNextIndicator from '$lib/components/ScrollToNextIndicator.svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { useScrollToNext } from '$lib/composables/useScrollToNext.js';
	import { getNextPagePath } from '$lib/stores/navigation.svelte.js';
	import { page } from '$app/stores';
	import frontpageProfile from '$lib/assets/frontpageimage.jpg';

	// Svelte 5 state for profile visibility
	let profileVisible = $state(false);
	let profileRef = $state(null);
	let mounted = $state(false);
	let observer = $state(null);
	let startTypewriter = $state(false);
	let typewriterCompleted = $state(false);
	let pageContainer = $state(null);

	// Scroll-to-next functionality
	const scrollToNext = useScrollToNext();
	
	// Get next page name for indicator
	let nextPagePath = $derived($page.url ? getNextPagePath($page.url.pathname) : null);
	let nextPageName = $derived(() => {
		if (nextPagePath === '/internships') return 'Internships';
		if (nextPagePath === '/projects') return 'Projects';
		if (nextPagePath === '/college') return 'College';
		if (nextPagePath === '/hobbies') return 'Hobbies';
		if (nextPagePath === '/blog') return 'Blog';
		return 'Next Page';
	});

	// Use onMount for browser-only code
	onMount(() => {
		mounted = true;
		
		// Initialize scroll-to-next functionality
		scrollToNext.initScrollListener();
		
		// Start typewriter effect
		setTimeout(() => {
			startTypewriter = true;
		}, 500);
		
		// Add a small delay to ensure DOM is ready
		setTimeout(() => {
			if (browser && profileRef) {
				observer = new IntersectionObserver(
					([entry]) => {
						profileVisible = entry.isIntersecting;
					},
					{ threshold: 0.3 }
				);

				observer.observe(profileRef);
			}
		}, 100);

		// Cleanup function
		return () => {
			if (observer) {
				observer.disconnect();
				observer = null;
			}
			scrollToNext.destroyScrollListener();
		};
	});

	// Set the container reference for scroll detection
	$effect(() => {
		if (pageContainer) {
			scrollToNext.containerRef.value = pageContainer;
		}
	});

	// Handle typewriter completion
	function handleTypewriterComplete() {
		typewriterCompleted = true;
	}

	const aboutText =
		"I'm Abhayprad Jha, a Computer Science and Economics student at William & Mary (Class of 2026), blending my passion for building products with a fascination for modelling the world around me. I come from a global background, having grown across 5 different countries. My experience learning from different perspectives has fostered a habit ot interdisciplinary thinking and innovation. With internships at Deloitte, TCS and Black Pearl Global Investments, I've honed skills in full-stack development, data analysis, and digital transformation. My goal is to craft user-centered digital experiences that solve real-world challenges.";
</script>

<!-- Oval Profile Image Placeholder replaced with actual image -->
<div
	bind:this={profileRef}
	class="mb-8 flex h-[300px] w-[501px] items-center justify-center overflow-hidden rounded-full bg-gray-300 transition-all duration-700 hover:shadow-lg"
>
	<img src={frontpageProfile} alt="Abhayprad Jha profile photo" class="h-full w-full object-cover" />
</div>

<!-- About Me Section -->
<div class="w-full max-w-[771px]">
	<div class="text-justify">
		<h2 class="font-condensed mb-4 text-[32px] font-bold tracking-[-1.92px] text-black">About Me</h2>
		<div class="text-[24px] leading-relaxed text-black">
			{#if startTypewriter}
				<TypewriterText 
					text={aboutText}
					speed={25}
					delay={200}
					cursor={true}
					onComplete={handleTypewriterComplete}
				/>
			{:else if typewriterCompleted}
				<p>{aboutText}</p>
			{:else}
				<p class="opacity-0">{aboutText}</p>
			{/if}
		</div>
	</div>
</div>

<!-- Additional content to ensure scrolling is possible -->
<div bind:this={pageContainer} class="mt-16 space-y-8 text-center">
	<div class="text-sm text-gray-500 font-mono">
		Scroll down to explore more about my journey
	</div>
	<!-- Spacer to enable scroll-to-next -->
	<div class="h-64"></div>
</div>

<!-- Scroll-to-next indicator -->
{#if nextPagePath}
	<ScrollToNextIndicator nextPageName={nextPageName()} />
{/if}

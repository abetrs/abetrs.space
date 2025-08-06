<script>
	import { getScrollTransitionState } from '$lib/stores/navigation.svelte.js';
	import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getNextPagePath } from '$lib/stores/navigation.svelte.js';

	// Props
	let { nextPageName = 'Next Page' } = $props();

	// Reactive state from navigation store
	let scrollState = $derived(getScrollTransitionState());
	let showIndicator = $derived(scrollState.active);
	let progress = $derived(Math.min(scrollState.scrollDelta / 150, 1)); // Back to 150px threshold

	// Handle click to immediately trigger navigation
	function handleClick() {
		const currentPath = $page.url.pathname;
		const targetPath = getNextPagePath(currentPath);
		
		if (targetPath) {
			// Smooth transition
			document.body.style.transition = 'opacity 400ms ease-in-out';
			document.body.style.opacity = '0.7';

			setTimeout(() => {
				goto(targetPath).then(() => {
					// Reset scroll position
					if (typeof window !== 'undefined') {
						window.scrollTo({ top: 0, behavior: 'smooth' });
					}

					// Restore opacity
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
</script>

<!-- Scroll-to-next indicator -->
{#if showIndicator}
	<div 
		class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 cursor-pointer transition-transform hover:scale-105"
		transition:fly={{ y: 50, duration: 300 }}
		onclick={handleClick}
		role="button"
		tabindex="0"
		onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
	>
		<div class="bg-black/90 text-white px-6 py-3 rounded-full shadow-lg backdrop-blur-sm hover:bg-black/95 transition-all duration-200">
			<div class="flex items-center space-x-3">
				<!-- Progress indicator -->
				<div class="w-8 h-8 rounded-full border-2 border-white/30 relative overflow-hidden">
					<div 
						class="absolute bottom-0 left-0 w-full bg-white transition-all duration-200"
						style="height: {progress * 100}%"
					></div>
				</div>
				
				<!-- Text -->
				<div class="text-sm font-mono">
					<div class="text-white/80">Click or continue scrolling to</div>
					<div class="text-white font-medium">{nextPageName}</div>
				</div>
				
				<!-- Arrow -->
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
						d="M19 14l-7 7m0 0l-7-7m7 7V3"
					></path>
				</svg>
			</div>
		</div>
	</div>
{/if}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
	
	.font-mono {
		font-family: 'Roboto Mono', 'Courier New', monospace;
	}
</style>
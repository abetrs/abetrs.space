<script>
	import { onMount } from 'svelte';

	// Svelte 5 runes for reactive state
	let isMobile = $state(false);

	function checkScreenSize() {
		if (typeof window !== 'undefined') {
			isMobile = window.innerWidth < 1024; // lg breakpoint
		}
	}

	// Effect for handling screen size changes
	$effect(() => {
		if (typeof window !== 'undefined') {
			checkScreenSize();
			window.addEventListener('resize', checkScreenSize);

			return () => {
				window.removeEventListener('resize', checkScreenSize);
			};
		}
	});

	// Initialize on mount
	onMount(() => {
		checkScreenSize();
	});
</script>

<!-- TopBar component - reusable across pages -->

<div class="sticky top-0 z-50 h-[100px] w-full rounded-[5px] bg-gray-50 px-4 pt-4">
	<!-- Left side - Name in Arial Narrow Italics -->
	<div class="absolute top-1/2 left-8 -translate-y-1/2 transform">
		<h1 class="font-condensed text-[68px] text-black italic" style="letter-spacing: -6%;">
			{isMobile ? 'AJ' : 'Abhayprad Jha'}
		</h1>
	</div>

	<!-- Right side - Barcode -->
	<div class="absolute top-1/2 right-8 -translate-y-1/2 transform">
		<div class="font-barcode text-center text-[52px] text-black">{'Abhayprad Jha'}</div>
	</div>
</div>

<style>
	/* Import barcode font */
	@import url('https://fonts.googleapis.com/css2?family=Libre+Barcode+128&display=swap');

	/* Use Roboto Condensed as Arial Narrow substitute */
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

	.font-condensed {
		font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif;
	}

	.font-barcode {
		font-family: 'Libre Barcode 128', monospace;
	}
</style>

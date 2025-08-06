<script>
	import { themeStore } from '$lib/stores/theme.svelte.js';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	// Props
	let { position = 'top-right' } = $props();

	// Local state for animation
	let isToggling = $state(false);

	// Initialize theme store effects when component mounts
	onMount(() => {
		const cleanup1 = themeStore.initializeTheme();
		
		return () => {
			if (cleanup1) cleanup1();
		};
	});

	// Set up effect to apply theme changes
	$effect(() => {
		themeStore.applyTheme();
	});

	// Position classes
	let positionClasses = $derived(() => {
		switch (position) {
			case 'top-left':
				return 'fixed top-4 left-4';
			case 'top-right':
				return 'fixed top-4 right-4';
			case 'bottom-right':
				return 'fixed bottom-4 right-4';
			default:
				return 'fixed top-4 right-4';
		}
	});

	async function handleToggle() {
		isToggling = true;
		themeStore.toggleTheme();

		// Reset animation state
		setTimeout(() => {
			isToggling = false;
		}, 300);
	}

	function handleKeyDown(event) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleToggle();
		}
	}
</script>

<button
	class="{positionClasses} z-[70] rounded-lg border border-gray-300 bg-white p-2 shadow-md transition-all duration-200 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700
		{isToggling ? 'scale-95' : 'scale-100'}"
	onclick={handleToggle}
	onkeydown={handleKeyDown}
	aria-label="Toggle theme between light and dark mode"
	title="Toggle theme"
>
	{#if themeStore.active === 'light'}
		<svg
			class="h-5 w-5 text-gray-700 dark:text-gray-300"
			fill="currentColor"
			viewBox="0 0 20 20"
			transition:fade={{ duration: 200 }}
		>
			<path
				fill-rule="evenodd"
				d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
				clip-rule="evenodd"
			/>
		</svg>
	{:else}
		<svg
			class="h-5 w-5 text-gray-700 dark:text-gray-300"
			fill="currentColor"
			viewBox="0 0 20 20"
			transition:fade={{ duration: 200 }}
		>
			<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
		</svg>
	{/if}
</button>

<style>
	/* Ensure smooth transitions for theme changes */
	:global(html) {
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	:global(.dark) {
		color-scheme: dark;
	}
</style>

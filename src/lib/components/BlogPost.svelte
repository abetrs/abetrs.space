<script>
	import { fade, fly } from 'svelte/transition';

	// Props with default values
	let { title, excerpt, publishedDate, readTime = 5, url = null, index = 0 } = $props();

	// Svelte 5 reactive state
	let isHovered = $state(false);
	let isRead = $state(false);

	// Derived values
	let formattedDate = $derived(() => {
		if (!publishedDate) return 'Recent';
		const date = new Date(publishedDate);
		return date.toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	});

	let animationDelay = $derived(index * 150);

	function handleClick() {
		if (url) {
			isRead = true;
			window.open(url, '_blank', 'noopener,noreferrer');
		}
	}

	function handleKeyDown(event) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	}
</script>

<div
	class="cursor-pointer rounded-lg border-l-4 border-black bg-white p-6 shadow-sm transition-all duration-300
		{isHovered ? '-translate-y-1 transform shadow-md' : ''}
		{isRead ? 'opacity-80' : ''}"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	onclick={handleClick}
	onkeydown={handleKeyDown}
	tabindex="0"
	role="button"
	aria-label="Read blog post: {title}"
	transition:fly={{ y: 30, delay: animationDelay, duration: 500 }}
>
	<div class="mb-3 flex items-start justify-between">
		<div class="font-condensed text-[16px] text-gray-600">
			{formattedDate}
		</div>
		<div class="font-mono text-[14px] text-gray-500">
			{readTime} min read
		</div>
	</div>

	<h3
		class="font-condensed mb-3 text-[24px] font-semibold text-black transition-colors hover:text-gray-800"
	>
		{title}
	</h3>

	<p class="font-condensed mb-4 text-[18px] leading-relaxed text-gray-700">
		{excerpt}
	</p>

	<div class="flex items-center justify-between">
		<span class="font-condensed text-[16px] text-black underline transition-all hover:no-underline">
			Read more →
		</span>

		{#if isHovered}
			<svg
				class="h-4 w-4 text-gray-600 transition-transform duration-200"
				style="transform: translateX(4px)"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				transition:fade={{ duration: 200 }}
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
				></path>
			</svg>
		{/if}
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

	.font-condensed {
		font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif;
	}

	.font-mono {
		font-family: 'Roboto Mono', 'Courier New', monospace;
	}
</style>

<script>
	import { fade, scale } from 'svelte/transition';

	// Props using Svelte 5 destructuring syntax
	let { title, description, tech = [], demoUrl = null, githubUrl = null, index = 0 } = $props();

	// Svelte 5 runes for reactive state
	let isHovered = $state(false);
	let isVisible = $state(false);
	let cardRef = $state(null);

	// Derived values using Svelte 5 $derived
	let animationDelay = $derived(index * 100);
	let hasLinks = $derived(demoUrl || githubUrl);
	let cardClasses = $derived(`
		bg-white border border-gray-300 rounded-lg transition-all duration-300 hover:shadow-lg
		${isHovered ? 'transform hover:-translate-y-1' : ''}
	`);

	// Effect for intersection observer (modern lazy loading)
	$effect(() => {
		if (cardRef && typeof window !== 'undefined') {
			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) {
						isVisible = true;
						observer.disconnect();
					}
				},
				{ threshold: 0.1 }
			);

			observer.observe(cardRef);

			return () => observer.disconnect();
		}
	});

	function handleMouseEnter() {
		isHovered = true;
	}

	function handleMouseLeave() {
		isHovered = false;
	}

	function openLink(url) {
		if (url) {
			window.open(url, '_blank', 'noopener,noreferrer');
		}
	}
</script>

{#if isVisible}
	<div
		bind:this={cardRef}
		class={cardClasses}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		transition:fade={{ delay: animationDelay, duration: 600 }}
		role="article"
		aria-label="Project: {title}"
	>
		<div class="p-6">
			<h3 class="font-condensed mb-4 text-[28px] font-semibold text-black">
				{title}
			</h3>

			<p class="font-condensed mb-4 text-[18px] leading-relaxed text-gray-700">
				{description}
			</p>

			{#if tech.length > 0}
				<div class="mb-4 flex flex-wrap gap-2">
					{#each tech as techItem}
						<span
							class="rounded-full bg-gray-100 px-3 py-1 font-mono text-[14px] text-gray-800"
							transition:scale={{ delay: 50 }}
						>
							{techItem}
						</span>
					{/each}
				</div>
			{/if}

			{#if hasLinks}
				<div class="flex gap-3 pt-2">
					{#if demoUrl}
						<button
							class="font-condensed rounded-lg bg-black px-4 py-2 text-[16px] text-white transition-colors duration-200 hover:bg-gray-800"
							onclick={() => openLink(demoUrl)}
						>
							Live Demo →
						</button>
					{/if}

					{#if githubUrl}
						<button
							class="font-condensed rounded-lg border border-gray-300 px-4 py-2 text-[16px] text-black transition-colors duration-200 hover:bg-gray-50"
							onclick={() => openLink(githubUrl)}
						>
							GitHub
						</button>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{:else}
	<div bind:this={cardRef} class="h-[250px]"></div>
{/if}

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

<script>
	import { fade, scale } from 'svelte/transition';

	// Props using Svelte 5 destructuring syntax
	let {
		title,
		description,
		tech = [],
		demoUrl = null,
		githubUrl = null,
		index = 0,
		projectId = null,
		hasStory = false
	} = $props();

	// Svelte 5 runes for reactive state
	let isHovered = $state(false);
	let isVisible = $state(false);
	let cardRef = $state(null);

	// Derived values using Svelte 5 $derived
	let animationDelay = $derived(index * 100);
	let hasLinks = $derived(demoUrl || githubUrl);
	let hasAnyActions = $derived(demoUrl || githubUrl || (projectId && hasStory));
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

	function scrollToStory() {
		if (projectId) {
			const element = document.getElementById(`story-${projectId}`);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
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

			{#if hasAnyActions}
				<div class="flex flex-wrap gap-2 pt-2">
					{#if demoUrl}
						<button
							class="font-condensed flex-shrink-0 rounded-lg bg-black px-3 py-2 text-[14px] text-white transition-colors duration-200 hover:bg-gray-800"
							onclick={() => openLink(demoUrl)}
						>
							Live Demo →
						</button>
					{/if}

					{#if githubUrl}
						<button
							class="font-condensed flex flex-shrink-0 items-center gap-2 rounded-lg bg-black px-3 py-2 text-[14px] text-white transition-colors duration-200 hover:bg-gray-800"
							onclick={() => openLink(githubUrl)}
						>
							<!-- GitHub icon SVG -->
							<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
								<path
									d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
								/>
							</svg>
							GitHub
						</button>
					{/if}

					{#if projectId && hasStory}
						<button
							class="font-condensed flex-shrink-0 rounded-lg bg-black px-3 py-2 text-[14px] text-white transition-colors duration-200 hover:bg-gray-800"
							onclick={scrollToStory}
						>
							Learn More ↓
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

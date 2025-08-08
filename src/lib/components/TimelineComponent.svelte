<script>
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	// Props using Svelte 5 destructuring
	let { 
		experiences = [],
		title = "Experience Timeline" 
	} = $props();

	// Svelte 5 reactive state
	let isVisible = $state(true); // Start as visible
	let activeIndex = $state(null);
	let timelineRef = $state(null);
	let visibleCards = $state(new Set());

	// Derived values  
	let sortedExperiences = $derived(
		[...experiences].sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
	);

	// Effect for intersection observer (for animations)
	$effect(() => {
		if (timelineRef && typeof window !== 'undefined') {
			const observer = new IntersectionObserver(
				([entry]) => {
					isVisible = entry.isIntersecting;
				},
				{ threshold: 0.2 }
			);

			observer.observe(timelineRef);
			return () => observer.disconnect();
		}
	});

	// Effect for individual card animations
	onMount(() => {
		if (typeof window !== 'undefined') {
			const cardObserver = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							const cardIndex = parseInt(entry.target.dataset.cardIndex);
							visibleCards = new Set([...visibleCards, cardIndex]);
						}
					});
				},
				{ 
					threshold: 0.1,
					rootMargin: '50px 0px -50px 0px'
				}
			);

			// Observe all cards after a short delay to ensure DOM is ready
			setTimeout(() => {
				const cards = document.querySelectorAll('[data-card-index]');
				cards.forEach(card => cardObserver.observe(card));
			}, 100);

			return () => cardObserver.disconnect();
		}
	});

	function formatDate(dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			month: 'short', 
			year: 'numeric' 
		});
	}

	function calculateDuration(startDate, endDate = new Date()) {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const months = Math.round((end - start) / (1000 * 60 * 60 * 24 * 30));
		
		if (months < 12) return `${months} months`;
		const years = Math.floor(months / 12);
		const remainingMonths = months % 12;
		
		if (remainingMonths === 0) return `${years} year${years > 1 ? 's' : ''}`;
		return `${years}y ${remainingMonths}m`;
	}
</script>

<div bind:this={timelineRef} class="w-full">
	<h3 class="text-[32px] font-bold text-black mb-8 tracking-[-1.5px] font-condensed">
		{title}
	</h3>

	<div class="relative">
		<!-- Timeline Line -->
		<div 
			class="absolute left-6 top-0 w-0.5 bg-gray-300"
			style="height: calc(100% - 2rem);"
		></div>

		<!-- Timeline Items -->
		<div class="space-y-8">
			{#each sortedExperiences as experience, index}
				<div 
					class="relative flex items-start group cursor-pointer"
					data-card-index={index}
					onclick={() => activeIndex = activeIndex === index ? null : index}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							activeIndex = activeIndex === index ? null : index;
						}
					}}
					role="button"
					tabindex="0"
					aria-label="View details for {experience.company}"
				>
					<!-- Timeline Dot -->
					<div 
						class="relative z-10 w-3 h-3 bg-black rounded-full mt-2 transition-all duration-300 group-hover:scale-150"
						class:animate-fade-in={visibleCards.has(index)}
						style="animation-delay: {index * 200}ms;"
					></div>

					{#if visibleCards.has(index)}
						<!-- Content Card -->
						<div 
							class="ml-6 flex-1 bg-white p-6 rounded-lg shadow-sm border-l-4 border-black transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 animate-slide-in-fade"
							style="animation-delay: {index * 200 + 100}ms;"
							in:fly={{ y: 30, duration: 600, delay: index * 200, easing: quintOut }}
						>
							<div class="flex justify-between items-start mb-2">
								<h4 class="text-[24px] font-semibold text-black font-condensed">
									{experience.company}
								</h4>
								<div class="text-sm text-gray-500 font-mono">
									{formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate)}
								</div>
							</div>

							<div class="flex justify-between items-center mb-3">
								<p class="text-[18px] text-gray-700 font-condensed">
									{experience.position}
								</p>
								<span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-mono">
									{calculateDuration(experience.startDate, experience.endDate)}
								</span>
							</div>

							<p class="text-[16px] text-gray-600 mb-4 font-condensed">
								{experience.description}
							</p>

							{#if experience.skills && experience.skills.length > 0}
								<div class="flex flex-wrap gap-2 mb-4">
									{#each experience.skills as skill}
										<span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-mono">
											{skill}
										</span>
									{/each}
								</div>
							{/if}

							{#if activeIndex === index}
								<div 
									class="border-t pt-4 mt-4"
									transition:fly={{ y: 20, duration: 300 }}
								>
									{#if experience.achievements}
										<h5 class="font-semibold text-gray-800 mb-2 font-condensed">Key Achievements:</h5>
										<ul class="space-y-1 text-gray-600 text-sm">
											{#each experience.achievements as achievement}
												<li class="flex items-start">
													<span class="text-black mr-2">•</span>
													<span class="font-condensed">{achievement}</span>
												</li>
											{/each}
										</ul>
									{/if}

									{#if experience.projects}
										<h5 class="font-semibold text-gray-800 mb-2 mt-4 font-condensed">Notable Projects:</h5>
										<ul class="space-y-1 text-gray-600 text-sm">
											{#each experience.projects as project}
												<li class="flex items-start">
													<span class="text-black mr-2">•</span>
													<span class="font-condensed">{project}</span>
												</li>
											{/each}
										</ul>
									{/if}
								</div>
							{:else}
								<div class="text-sm text-gray-500 font-condensed">
									Click to view more details →
								</div>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
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

	/* Fade-in animation for timeline dots */
	.animate-fade-in {
		animation: fadeIn 0.6s ease-out forwards;
		opacity: 0;
	}

	/* Slide-in and fade animation for cards */
	.animate-slide-in-fade {
		animation: slideInFadeBounce 0.8s ease-out forwards;
		opacity: 0;
		transform: translateY(30px);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.5);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes slideInFadeBounce {
		0% {
			opacity: 0;
			transform: translateY(30px) translateX(0px);
		}
		50% {
			opacity: 0.7;
			transform: translateY(0px) translateX(15px);
		}
		70% {
			opacity: 0.9;
			transform: translateY(0px) translateX(-5px);
		}
		100% {
			opacity: 1;
			transform: translateY(0px) translateX(0px);
		}
	}

	/* Make cards initially invisible until animation triggers */
	[data-card-index] > div:last-child {
		opacity: 0;
		transform: translateY(30px);
		transition: none;
	}

	/* When visible, allow normal transitions */
	[data-card-index] > div:last-child.animate-slide-in-fade {
		transition: all 0.3s ease;
	}
</style>

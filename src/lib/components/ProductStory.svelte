<script>
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	// Props using Svelte 5 destructuring syntax
	let { 
		projectId, 
		title, 
		challenge, 
		solution, 
		impact, 
		metrics = [],
		lessons = [],
		index = 0 
	} = $props();

	// Svelte 5 runes for reactive state
	let isVisible = $state(true);
	let storyRef = $state(null);

	// Derived values
	let animationDelay = $derived(index * 100);

	// Effect for intersection observer
	$effect(() => {
		if (storyRef && typeof window !== 'undefined') {
			const observer = new IntersectionObserver(
				([entry]) => {
					isVisible = entry.isIntersecting;
				},
				{ threshold: 0.2 }
			);

			observer.observe(storyRef);
			return () => observer.disconnect();
		}
	});
</script>

<div 
	bind:this={storyRef} 
	id="story-{projectId}"
	class="w-full mb-16 scroll-mt-8"
	in:fly={{ y: 50, delay: animationDelay, duration: 600, easing: quintOut }}
>
	<div class="bg-white border border-gray-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
		<!-- Story Header -->
		<div class="mb-6 pb-4 border-b border-gray-100">
			<h3 class="font-condensed text-[32px] font-bold text-black mb-2">
				{title}
			</h3>
			<span class="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full font-medium">
				Product Management Case Study
			</span>
		</div>

		<!-- Story Content -->
		<div class="space-y-6">
			<!-- Challenge Section - Pure Red -->
			<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
				<h4 class="font-condensed text-[20px] font-semibold text-red-700 mb-2">
					Challenge
				</h4>
				<p class="font-condensed text-[16px] leading-relaxed text-gray-700">
					{@html challenge}
				</p>
			</div>

			<!-- Solution Section - Red with hint of purple -->
			<div class="bg-rose-50 border-l-4 border-rose-600 p-4 rounded-r">
				<h4 class="font-condensed text-[20px] font-semibold text-rose-700 mb-2">
					Solution & Approach
				</h4>
				<p class="font-condensed text-[16px] leading-relaxed text-gray-700">
					{@html solution}
				</p>
			</div>

			<!-- Impact Section - Balanced red-purple -->
			<div class="bg-pink-50 border-l-4 border-pink-600 p-4 rounded-r">
				<h4 class="font-condensed text-[20px] font-semibold text-pink-700 mb-2">
					Impact & Results
				</h4>
				<p class="font-condensed text-[16px] leading-relaxed text-gray-700 mb-3">
					{@html impact}
				</p>
				
				{#if metrics.length > 0}
					<div class="mt-3">
						<h5 class="font-condensed text-[16px] font-medium text-pink-700 mb-2">Key Metrics:</h5>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
							{#each metrics as metric}
								<div class="flex items-center">
									<span class="w-2 h-2 bg-pink-600 rounded-full mr-2"></span>
									<span class="font-condensed text-[14px] text-gray-700">{@html metric}</span>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>

			<!-- Lessons Learned Section - Red-purple with more purple -->
			<div class="bg-fuchsia-50 border-l-4 border-fuchsia-500 p-4 rounded-r">
				<h4 class="font-condensed text-[20px] font-semibold text-fuchsia-700 mb-2">
					Lessons Learned
				</h4>
				<ul class="space-y-1">
					{#each lessons as lesson}
						<li class="flex items-start">
							<span class="w-2 h-2 bg-fuchsia-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
							<span class="font-condensed text-[14px] leading-relaxed text-gray-700">{@html lesson}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

	.font-condensed {
		font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif;
	}
</style>

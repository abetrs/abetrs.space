<script>
	import { scale, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	// Props with Svelte 5 destructuring
	let { 
		skills = [],
		title = "Skills",
		animated = true 
	} = $props();

	// Svelte 5 runes for state management
	let isVisible = $state(true); // Start as visible
	let hoveredSkill = $state(null);
	let selectedCategory = $state('all');
	let containerRef = $state(null);
	let visibleSkills = $state(new Set());

	// Derived values using simpler approach
	let categories = $derived([
		'all', 
		...Array.from(new Set(skills.map(skill => skill.category)))
	]);

	let filteredSkills = $derived(
		selectedCategory === 'all' ? skills : skills.filter(skill => skill.category === selectedCategory)
	);

	// Group skills by level directly in the template for now to debug
	function getSkillsByLevel(skills) {
		const grouped = {};
		if (skills && Array.isArray(skills)) {
			for (const skill of skills) {
				if (skill && skill.level) {
					if (!grouped[skill.level]) {
						grouped[skill.level] = [];
					}
					grouped[skill.level].push(skill);
				}
			}
		}
		return grouped;
	}

	// Effect for intersection observer (for animations)
	$effect(() => {
		if (containerRef && typeof window !== 'undefined') {
			const observer = new IntersectionObserver(
				([entry]) => {
					isVisible = entry.isIntersecting;
				},
				{ threshold: 0.2 }
			);

			observer.observe(containerRef);
			return () => observer.disconnect();
		}
	});

	// Effect for individual skill animations
	onMount(() => {
		if (typeof window !== 'undefined' && animated) {
			const skillObserver = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							const skillIndex = entry.target.dataset.skillIndex;
							if (skillIndex) {
								visibleSkills = new Set([...visibleSkills, skillIndex]);
							}
						}
					});
				},
				{ 
					threshold: 0.1,
					rootMargin: '50px 0px -50px 0px'
				}
			);

			// Observe all skill chips after a short delay
			setTimeout(() => {
				const skillChips = document.querySelectorAll('[data-skill-index]');
				skillChips.forEach(chip => skillObserver.observe(chip));
			}, 100);

			return () => skillObserver.disconnect();
		}
	});

	// Reset visible skills when category changes
	$effect(() => {
		if (selectedCategory) {
			visibleSkills = new Set();
			// Re-trigger animations for new category
			setTimeout(() => {
				const skillChips = document.querySelectorAll('[data-skill-index]');
				skillChips.forEach(chip => {
					const skillIndex = chip.dataset.skillIndex;
					if (skillIndex) {
						visibleSkills = new Set([...visibleSkills, skillIndex]);
					}
				});
			}, 50);
		}
	});

	function getSkillColor(level) {
		const colors = {
			expert: 'bg-green-100 text-green-800 border-green-200',
			advanced: 'bg-blue-100 text-blue-800 border-blue-200',
			intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
			beginner: 'bg-gray-100 text-gray-800 border-gray-200'
		};
		return colors[level] || colors.intermediate;
	}

	function getSkillSize(level) {
		const sizes = {
			expert: 'text-lg px-4 py-2',
			advanced: 'text-base px-3 py-2',
			intermediate: 'text-sm px-3 py-1',
			beginner: 'text-xs px-2 py-1'
		};
		return sizes[level] || sizes.intermediate;
	}
</script>

<div bind:this={containerRef} class="w-full">
	<div>
		<h3 class="text-[28px] font-semibold mb-6 text-black font-condensed">
			{title}
		</h3>

		<!-- Category Filter -->
		<div class="flex flex-wrap gap-2 mb-6">
			{#each categories as category, index}
				<button
					class="px-3 py-1 rounded-full text-sm font-mono transition-all duration-200
						{selectedCategory === category 
							? 'bg-black text-white' 
							: 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
					onclick={() => selectedCategory = category}
				>
					{category === 'all' ? 'All Skills' : category.charAt(0).toUpperCase() + category.slice(1)}
				</button>
			{/each}
		</div>

			<!-- Skills Cloud -->
			<div class="space-y-6">
				{#each Object.entries(getSkillsByLevel(filteredSkills)) as [level, levelSkills], levelIndex}
					<div class="space-y-3">
						<h4 class="text-lg font-medium text-gray-600 font-condensed capitalize">
							{level} Level
						</h4>
						<div class="flex flex-wrap gap-3">
							{#each levelSkills as skill, skillIndex}
								{@const globalSkillIndex = `${level}-${skillIndex}`}
								<div
									class="border rounded-lg transition-all duration-200 cursor-pointer skill-chip
										{getSkillColor(skill.level)} {getSkillSize(skill.level)}
										{hoveredSkill === skill.name ? 'transform scale-105 shadow-md' : ''}
										{visibleSkills.has(globalSkillIndex) ? 'animate-skill-fade-in' : ''}"
									data-skill-index={globalSkillIndex}
									style="animation-delay: {(levelIndex * 100) + (skillIndex * 50)}ms;"
									onmouseenter={() => hoveredSkill = skill.name}
									onmouseleave={() => hoveredSkill = null}
									role="button"
									tabindex="0"
									aria-label="Skill: {skill.name}"
								>
									<span class="font-mono font-medium">
										{skill.name}
									</span>
									{#if skill.years && hoveredSkill === skill.name}
										<span class="ml-2 text-xs opacity-75">
											({skill.years}y)
										</span>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<!-- Skills Summary -->
			{#if filteredSkills.length > 0}
				<div class="mt-6 p-4 bg-gray-100 rounded-lg">
					<div class="text-sm text-gray-600 font-condensed">
						<strong>{filteredSkills.length}</strong> skills
						{#if selectedCategory !== 'all'}
							in <strong>{selectedCategory}</strong>
						{/if}
						• <strong>{getSkillsByLevel(filteredSkills).expert?.length || 0}</strong> expert-level
						• <strong>{getSkillsByLevel(filteredSkills).advanced?.length || 0}</strong> advanced
					</div>
				</div>
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

	/* Fade-in animation for skill chips */
	.skill-chip {
		opacity: 0;
		transform: translateY(20px) scale(0.8);
		transition: all 0.3s ease;
	}

	.animate-skill-fade-in {
		animation: skillFadeIn 0.6s ease-out forwards;
	}

	@keyframes skillFadeIn {
		from {
			opacity: 0;
			transform: translateY(20px) scale(0.8);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	/* Ensure hover effects work properly */
	.skill-chip:hover {
		transform: translateY(0) scale(1.05) !important;
	}
</style>

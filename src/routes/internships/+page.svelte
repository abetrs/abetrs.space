<script>
	import TimelineComponent from '$lib/components/TimelineComponent.svelte';
	import SkillsCloud from '$lib/components/SkillsCloud.svelte';
	import ScrollToNextIndicator from '$lib/components/ScrollToNextIndicator.svelte';
	import { onMount } from 'svelte';
	import { useScrollToNext } from '$lib/composables/useScrollToNext.js';
	import { getNextPagePath } from '$lib/stores/navigation.svelte.js';
	import { page } from '$app/stores';

	// Container reference for scroll detection
	let pageContainer = $state(null);

	// Scroll-to-next functionality
	const scrollToNext = useScrollToNext();
	
	// Get next page name for indicator
	let nextPagePath = $derived($page.url ? getNextPagePath($page.url.pathname) : null);
	let nextPageName = $derived(() => {
		if (nextPagePath === '/projects') return 'Projects';
		if (nextPagePath === '/college') return 'College';
		if (nextPagePath === '/hobbies') return 'Hobbies';
		if (nextPagePath === '/blog') return 'Blog';
		return 'Next Page';
	});

	// Initialize scroll functionality
	onMount(() => {
		scrollToNext.initScrollListener();
		return () => {
			scrollToNext.destroyScrollListener();
		};
	});

	// Set the container reference for scroll detection
	$effect(() => {
		if (pageContainer) {
			scrollToNext.containerRef.value = pageContainer;
		}
	});

	// Experience data using Svelte 5 runes - Based on actual resume
	let experiences = $state([
		{
			company: 'Black Pearl Global Investments',
			position: 'Venture Capital Intern',
			startDate: '2025-06-01',
			endDate: '2025-08-31',
			current: false,
			description: 'Scaled deal flow and shaped investment strategy for a venture capital firm, focusing on integrating AI into the VC lifecycle and developing strategic partnerships.',
			skills: ['LLM Engineering', 'Due Diligence', 'Strategic Planning', 'AI/ML', 'Investment Analysis', 'Partnership Development'],
			achievements: [
				'Scaled up deal flow by sourcing a network of 15+ strategic ecosystem partners and 30+ prospective limited partners',
				'Authored the firm\'s strategic roadmap for integrating Generative and Agentic AI into the VC lifecycle',
				'Engineered a proof-of-concept LLM-based tool to automate due diligence, reducing initial screening time by an estimated 40%',
				'Co-authored a $10M fund thesis with explicit entry & kill signals, shortening IC prep by 25% and improving go/no-go clarity'
			],
			projects: [
				'LLM-based due diligence automation tool',
				'AI integration strategic roadmap for VC operations',
				'$10M fund thesis development with decision frameworks'
			]
		},
		{
			company: 'Deloitte',
			position: 'Product Strategy Intern',
			startDate: '2025-01-01',
			endDate: '2025-01-31',
			current: false,
			description: 'Converted market research into actionable product strategies, focusing on post-pandemic demand signals and stakeholder alignment for new product opportunities.',
			skills: ['Product Strategy', 'Market Research', 'Stakeholder Management', 'Product Roadmapping', 'Strategic Analysis'],
			achievements: [
				'Converted post-pandemic demand signals into 3 product opportunity briefs with must-test assumptions',
				'Secured stakeholder alignment in one workshop and green-lighted pilots',
				'Translated research findings into actionable product strategies for SMEs and industry leaders',
				'Standardized the decision pack (market sizing, comps, risks), reducing review cycles across SME groups'
			],
			projects: [
				'Product opportunity brief development',
				'Decision pack standardization framework'
			]
		},
		{
			company: 'Tata Consultancy Services',
			position: 'UX Design Intern',
			startDate: '2024-05-01',
			endDate: '2024-08-31',
			current: false,
			description: 'Led end-to-end UX design for lithium-ion battery supply chain solutions, conducting user research and developing design systems for enterprise IT solutions.',
			skills: ['UX Design', 'User Research', 'Figma', 'Design Systems', 'Supply Chain Analysis', 'Technical Writing'],
			achievements: [
				'Conducted user and market research on the lithium-ion battery supply chain to define problem statements',
				'Led end-to-end design, documented design-system components that cut time-to-spec by 25%',
				'Turned supply-chain interviews into a Figma prototype with compliance acceptance criteria, enabling CTO sign-off',
				'Authored and presented a white paper on design rationale, successfully advocating for the proposed solution to the CTO',
				'Reduced rework by 30% in early engineering cycles through improved design handoff'
			],
			projects: [
				'Lithium-ion battery supply chain UX solution',
				'Design system component library',
				'CTO-approved Figma prototype with compliance criteria',
				'Supply chain research white paper'
			]
		}
	]);

	// Technical skills data - Based on actual resume
	let technicalSkills = $state([
		// Programming Languages
		{ name: 'Python', level: 'expert', category: 'languages', years: 4 },
		{ name: 'Java', level: 'advanced', category: 'languages', years: 3 },
		{ name: 'JavaScript', level: 'advanced', category: 'languages', years: 3 },
		{ name: 'R', level: 'advanced', category: 'languages', years: 2 },
		{ name: 'SQL', level: 'advanced', category: 'languages', years: 3 },
		{ name: 'Go', level: 'intermediate', category: 'languages', years: 1 },
		{ name: 'C', level: 'intermediate', category: 'languages', years: 2 },
		{ name: 'C++', level: 'intermediate', category: 'languages', years: 2 },
		{ name: 'C#', level: 'intermediate', category: 'languages', years: 1 },
		{ name: 'Rust', level: 'beginner', category: 'languages', years: 1 },
		
		// Frontend Development
		{ name: 'React', level: 'advanced', category: 'frontend', years: 2 },
		{ name: 'Next.js', level: 'advanced', category: 'frontend', years: 2 },
		{ name: 'Nuxt.js', level: 'intermediate', category: 'frontend', years: 1 },
		{ name: 'Svelte', level: 'advanced', category: 'frontend', years: 1 },
		{ name: 'Astro', level: 'intermediate', category: 'frontend', years: 1 },
		{ name: 'Tailwind CSS', level: 'expert', category: 'frontend', years: 2 },
		
		// Backend & Full-Stack
		{ name: 'Phoenix/Elixir', level: 'intermediate', category: 'backend', years: 1 },
		{ name: 'Firebase', level: 'intermediate', category: 'backend', years: 1 },
		
		// Databases
		{ name: 'MongoDB', level: 'advanced', category: 'database', years: 2 },
		{ name: 'PostgreSQL', level: 'advanced', category: 'database', years: 2 },
		{ name: 'SQL', level: 'expert', category: 'database', years: 3 },
		
		// Product & Design
		{ name: 'Figma', level: 'expert', category: 'design', years: 2 },
		{ name: 'Framer', level: 'advanced', category: 'design', years: 1 },
		{ name: 'Storybook', level: 'intermediate', category: 'design', years: 1 },
		{ name: 'User Research', level: 'advanced', category: 'design', years: 2 },
		{ name: 'Product Design', level: 'advanced', category: 'design', years: 2 },
		{ name: 'Design Thinking', level: 'advanced', category: 'design', years: 2 },
		
		// AI & ML
		{ name: 'LLMs', level: 'advanced', category: 'ai', years: 2 },
		{ name: 'Agentic AI', level: 'advanced', category: 'ai', years: 1 },
		{ name: 'Prompt Engineering', level: 'expert', category: 'ai', years: 2 },
		{ name: 'Claude Code', level: 'advanced', category: 'ai', years: 1 },
		{ name: 'GitHub Copilot', level: 'expert', category: 'ai', years: 2 },
		{ name: 'Gemini CLI', level: 'intermediate', category: 'ai', years: 1 },
		
		// Development Tools
		{ name: 'Git', level: 'expert', category: 'tools', years: 4 },
		{ name: 'Unix/PowerShell', level: 'advanced', category: 'tools', years: 3 },
		{ name: 'CLI', level: 'expert', category: 'tools', years: 3 },
		{ name: 'Blender', level: 'intermediate', category: 'tools', years: 1 },
		{ name: 'LaTeX', level: 'advanced', category: 'tools', years: 3 },
		
		// Product Management
		{ name: 'Agile Project Management', level: 'advanced', category: 'product', years: 2 },
		{ name: 'Statistical Analysis', level: 'advanced', category: 'product', years: 3 },
		{ name: 'Strategic Planning', level: 'advanced', category: 'product', years: 2 },
		{ name: 'Market Research', level: 'advanced', category: 'product', years: 2 },
		{ name: 'Due Diligence', level: 'advanced', category: 'product', years: 1 },
		
		// Languages
		{ name: 'English', level: 'expert', category: 'languages', years: 20 },
		{ name: 'Hindi', level: 'expert', category: 'languages', years: 20 },
		{ name: 'Maithili', level: 'expert', category: 'languages', years: 20 },
		{ name: 'French', level: 'intermediate', category: 'languages', years: 3 }
	]);
</script>

<!-- Content Area -->
<div bind:this={pageContainer} class="w-full max-w-[900px] space-y-12">
	<div class="text-center">
		<h1 class="font-condensed mb-8 text-[48px] font-bold tracking-[-2px] text-black">
			Internships
		</h1>
		<p class="font-condensed mb-12 text-[24px] leading-relaxed text-black">
			My professional journey through internships at leading companies, gaining hands-on experience in
			venture capital, product strategy, and UX design while building AI-powered solutions and leading product initiatives.
		</p>
	</div>
	
	<!-- Timeline Component -->
	<TimelineComponent 
		{experiences}
		title="Professional Experience"
	/>
	
	<!-- Skills Section -->
	<div class="mt-16">
		<SkillsCloud 
			skills={technicalSkills}
			title="Technical Skills"
			animated={true}
		/>
	</div>

	<!-- Additional content to ensure scrolling is possible -->
	<div class="mt-16 space-y-8 text-center">
		<div class="text-sm text-gray-500 font-mono">
			Continue scrolling to explore my projects
		</div>
		<!-- Spacer to enable scroll-to-next -->
		<div class="h-32"></div>
	</div>
</div>

<!-- Scroll-to-next indicator -->
{#if nextPagePath}
	<ScrollToNextIndicator nextPageName={nextPageName()} />
{/if}

<style>
	/* Use Roboto Condensed as Arial Narrow substitute */
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

	.font-condensed {
		font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif;
	}
</style>

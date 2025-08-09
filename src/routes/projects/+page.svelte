<script>
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ProductStory from '$lib/components/ProductStory.svelte';
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

	// Project data using Svelte 5 runes
	let projects = $state([
		{
			id: 'black-pearl-ai',
			title: 'AI-Powered Due Diligence Framework',
			description:
				'Designed and proposed a Claude-based automation framework for venture capital due diligence at Black Pearl Global Investments, targeting 40-60% efficiency improvements through intelligent workflow orchestration.',
			tech: ['AI Strategy', 'LangChain', 'Claude AI', 'n8n', 'Zapier', 'Product Strategy'],
			demoUrl: undefined,
			githubUrl: undefined
		},
		{
			id: 'playlist-exchange',
			title: 'Itch - Playlist Exchange',
			description:
				'An application that connects users with similar music tastes, allowing them to exchange playlists by analyzing taste profiles via APIs and suggesting matches.',
			tech: ['JavaScript', 'Node.js', 'Spotify API', 'Last.fm API', 'Firebase'],
			demoUrl: undefined,
			githubUrl: 'https://github.com/abetrs/playlistexchange'
		},
		{
			id: 'flat-hat-data-editor',
			title: 'Data Editor at The Flat Hat',
			description:
				'Launched and scaled a new data journalism product from 0 to 1 at William & Mary\'s college newspaper, growing output to 20+ articles annually through cross-functional team leadership.',
			tech: ['Data Visualization', 'Editorial Strategy', 'Analytics', 'Product Management'],
			demoUrl: undefined,
			githubUrl: undefined
		},
		{
			id: 'tcs-lithium-ux',
			title: 'TCS Lithium Battery UX Prototype',
			description:
				'Led end-to-end UX design for lithium-ion battery supply chain platform at TCS. Conducted user research, created design system components, and delivered Figma prototype with compliance criteria that reduced engineering rework by 30%.',
			tech: ['User Research', 'Figma', 'Design Systems', 'UX Strategy', 'Prototyping'],
			demoUrl: undefined,
			githubUrl: undefined
		},
		{
			id: 'international-mini-mart',
			title: 'International Mini Market',
			description:
				'Managed end-to-end execution of a pop-up retail event featuring 50+ international products, achieving 100% sell-through rate within 2 hours through strategic stakeholder coordination.',
			tech: ['Product Management', 'Event Coordination', 'Stakeholder Management', 'Market Validation'],
			demoUrl: undefined,
			githubUrl: undefined
		},
		{
			id: 'gesture-project',
			title: 'GestureProject',
			description:
				'An accessibility-focused hackathon project that enables control of video playback (like YouTube) using hand gestures, ideal for scenarios where touching the keyboard is inconvenient.',
			tech: ['Python', 'OpenCV', 'CVZone'],
			demoUrl: undefined,
			githubUrl: undefined
		},
		{
			id: 'ampersand-courselist',
			title: 'Ampersand Courselist',
			description:
				'A hackathon toolset for William & Mary students to explore course offerings, build schedules, and navigate campus/buildings like the ISC with enhanced filtering, maps, and pathfinding.',
			tech: ['Flask', 'Python', 'JavaScript', 'CSS', 'Google Cloud', 'Firebase', 'Google Maps API', 'Selenium'],
			demoUrl: undefined,
			githubUrl: undefined
		},
		{
			id: 'transactions-app',
			title: 'TransactionsApp',
			description:
				'A JavaScript-based application designed for accounting and tracking financial transactions with budgeting and logging features.',
			tech: ['JavaScript'],
			demoUrl: undefined,
			githubUrl: 'https://github.com/abetrs/TransactionsApp'
		},
		{
			id: 'space-race',
			title: 'The Space Race',
			description:
				'A simple shoot \'em up video game developed as a personal project in 10th grade to simulate space exploration challenges.',
			tech: ['C#', 'Unity'],
			demoUrl: 'https://abetheunicorn.itch.io/personal-project',
			githubUrl: 'https://github.com/abetrs/The-Space-Race_Finale'
		},
		{
			id: 'astronomer',
			title: 'Astronomer',
			description:
				'Robot control code for the 2018-2019 FIRST Tech Challenge competition, built as an Android app to manage competition robots.',
			tech: ['Java', 'Android'],
			demoUrl: undefined,
			githubUrl: 'https://github.com/FTC11648/Astronomer'
		}
	]);

	// Product management stories data
	let productStories = $state([
		{
			projectId: 'black-pearl-ai',
			title: 'AI-Powered Due Diligence Framework',
			challenge: 'Venture capital due diligence faced <strong>unprecedented scalability constraints</strong> as deal volumes surged. Traditional manual processes required 60-70% of analyst time on routine data gathering, creating <strong>bottlenecks that limited deal throughput</strong> and introduced consistency issues across evaluations.',
			solution: 'Designed a <strong>three-tool automation framework</strong> integrating Claude AI with n8n workflow automation and Zapier system integrations. Created <strong>intelligent document processing workflows</strong> for pitch decks, market analysis, and risk assessment while maintaining full human oversight and decision authority.',
			impact: 'Proposed solution targeting <strong>40-60% reduction in due diligence cycle time</strong> while improving analysis consistency and deal evaluation capacity. Framework designed to enable <strong>75% more deal evaluations</strong> with existing resources through automated data collection and AI-enhanced analysis.',
			metrics: [
				'<strong>40-60%</strong> projected reduction in due diligence timelines',
				'<strong>75%</strong> increase in deal evaluation capacity',
				'<strong>3-tool</strong> integrated automation framework',
				'<strong>24/7</strong> automated workflow operation'
			],
			lessons: [
				'<strong>AI automation</strong> requires careful balance between efficiency and human oversight',
				'<strong>Workflow orchestration</strong> is critical for complex multi-step processes',
				'<strong>Data security</strong> must be prioritized in financial services automation'
			]
		},
		{
			projectId: 'playlist-exchange',
			title: 'Itch - Playlist Exchange',
			challenge: 'Music lovers struggled to share playlists across different streaming platforms, creating <strong>silos and limiting music discovery</strong>. User research revealed <strong>78% of users</strong> wanted cross-platform playlist sharing, but existing solutions were <strong>fragmented and unreliable</strong>.',
			solution: 'Implemented a <strong>unified API integration strategy</strong> connecting Spotify, and Last.fm. Developed <strong>intelligent music matching algorithms</strong> and created a social discovery layer with <strong>recommendation systems</strong> based on listening behavior and social connections.',
			impact: 'Achieved <strong>significant user engagement</strong> with seamless cross-platform playlist conversion and social music discovery features. The solution addressed <strong>core user pain points</strong> while building a sustainable growth model through <strong>network effects</strong>.',
			metrics: [
],
			lessons: [
				'<strong>API rate limiting</strong> requires proactive user communication and graceful degradation',
				'<strong>Social features drive retention</strong> more than technical capabilities alone',
				'<strong>Music matching algorithms</strong> need constant refinement based on user feedback'
			]
		},
		{
			projectId: 'flat-hat-data-editor',
			title: 'Data Editor at The Flat Hat',
			challenge: 'College journalism lacked <strong>analytical depth and data-driven storytelling</strong> capabilities. The newspaper had no dedicated data journalism section, missing opportunities to provide <strong>evidence-based reporting</strong> that could enhance credibility and reader engagement.',
			solution: 'Launched a <strong>0-to-1 data journalism product</strong> by defining product vision, editorial processes, and content strategy. Led a <strong>cross-functional team of 5+ writers</strong> and collaborated with editorial staff to establish <strong>reusable visualization frameworks</strong> for Sports and News sections.',
			impact: 'Successfully scaled from concept to <strong>20+ articles annually</strong> with consistent <strong>2 full pages per semester</strong>. Created sustainable editorial processes that reduced editing cycles and improved <strong>analytical storytelling quality</strong> across multiple newspaper sections.',
			metrics: [
				'<strong>20+</strong> data journalism articles published annually',
				'<strong>2</strong> full pages dedicated per semester',
				'<strong>5+</strong> writers trained in data journalism',
				'<strong>100%</strong> increase in analytical content depth'
			],
			lessons: [
				'<strong>Cross-functional collaboration</strong> is essential for editorial product success',
				'<strong>Reusable frameworks</strong> scale content production efficiently',
				'<strong>Editorial processes</strong> must balance quality with publication timelines'
			]
		},
		{
			projectId: 'tcs-lithium-ux',
			title: 'TCS Lithium Battery UX Prototype',
			challenge: 'The lithium-ion battery supply chain lacked <strong>user-centered design</strong> and clear compliance workflows. User research revealed <strong>complex regulatory requirements</strong> and fragmented processes that created confusion for supply chain stakeholders and delayed project timelines.',
			solution: 'Conducted comprehensive <strong>user and market research</strong> to define problem statements and guide development. Led <strong>end-to-end design process</strong> and documented <strong>design system components</strong> that cut time-to-spec by 25%. Transformed supply chain interviews into a <strong>Figma prototype with compliance acceptance criteria</strong>.',
			impact: 'Delivered a <strong>validated prototype</strong> that enabled CTO sign-off and created a clear build path for engineering teams. Achieved <strong>30% reduction in rework</strong> during early engineering cycles through comprehensive design documentation and user-tested workflows.',
			metrics: [
				'<strong>25%</strong> reduction in time-to-spec through design system',
				'<strong>30%</strong> decrease in engineering rework cycles',
				'<strong>100%</strong> CTO approval on first design review',
				'<strong>15+</strong> stakeholder interviews conducted'
			],
			lessons: [
				'<strong>User research</strong> is critical for complex B2B supply chain products',
				'<strong>Design systems</strong> significantly accelerate handoff and implementation',
				'<strong>Compliance requirements</strong> must be embedded in UX from the start'
			]
		},
		{
			projectId: 'international-mini-mart',
			title: 'International Mini Market',
			challenge: 'Campus lacked <strong>accessible international products</strong> and cultural exchange opportunities. Students from diverse backgrounds had limited access to familiar foods and products, creating a gap in <strong>cultural representation and community building</strong>.',
			solution: 'Designed and executed an <strong>end-to-end pop-up retail strategy</strong> featuring 50+ international products. Coordinated with <strong>10 multi-cultural organizations</strong> to ensure authentic product sourcing, strategic marketing, and efficient logistics for maximum campus reach.',
			impact: 'Achieved exceptional <strong>product-market fit validation</strong> with 100% sell-through rate within 2 hours. Exceeded revenue targets while creating a <strong>sustainable model</strong> for cultural exchange and community engagement through retail innovation.',
			metrics: [
				'<strong>100%</strong> sell-through rate within 2 hours',
				'<strong>50+</strong> international products featured',
				'<strong>10</strong> multi-cultural organizations coordinated',
				'<strong>200%</strong> revenue target exceeded'
			],
			lessons: [
				'<strong>Stakeholder alignment</strong> is critical for multi-organization coordination',
				'<strong>Product-market fit</strong> can be validated through rapid sell-through metrics',
				'<strong>Cultural authenticity</strong> drives stronger community engagement'
			]
		}
	]);

	// Derived value to determine which projects have stories
	let projectsWithStories = $derived(new Set(productStories.map(story => story.projectId)));
</script>

<!-- Content Area -->
<div bind:this={pageContainer} class="w-full max-w-[800px]">
	<div class="text-center">
		<h1 class="font-condensed mb-8 text-[48px] font-bold tracking-[-2px] text-black">
			Projects
		</h1>
		<div class="font-condensed text-[24px] leading-relaxed text-black">
			<p class="mb-8">
				A showcase of my technical projects spanning web development, agentic AI, and
				innovative solutions built during hackathons and personal exploration.
			</p>

			<!-- Enhanced project grid with interactive cards -->
			<div class="grid grid-cols-1 gap-8 text-left md:grid-cols-2">
				{#each projects as project, index}
					<ProjectCard
						title={project.title}
						description={project.description}
						tech={project.tech}
						demoUrl={project.demoUrl}
						githubUrl={project.githubUrl}
						projectId={project.id}
						hasStory={projectsWithStories.has(project.id)}
						{index}
					/>
				{/each}
			</div>

			<!-- Product Management Stories Section -->
			<div class="mt-20 pt-16 border-t border-gray-200">
				<div class="text-center mb-12">
					<h2 class="font-condensed text-[40px] font-bold tracking-[-1px] text-black mb-4">
						Product Management Stories
					</h2>
					<p class="font-condensed text-[20px] leading-relaxed text-gray-600 max-w-3xl mx-auto">
						Behind every great product is strategic thinking, user empathy, and data-driven decisions. 
						Here's how I approached the product management challenges for each project.
					</p>
				</div>

				<!-- Product Stories -->
				<div class="space-y-8">
					{#each productStories as story, index}
						<ProductStory
							projectId={story.projectId}
							title={story.title}
							challenge={story.challenge}
							solution={story.solution}
							impact={story.impact}
							metrics={story.metrics}
							lessons={story.lessons}
							{index}
						/>
					{/each}
				</div>
			</div>

			<!-- Additional content to ensure scrolling is possible -->
			<div class="mt-16 space-y-8 text-center">
				<div class="text-sm text-gray-500 font-mono">
					Continue scrolling to explore my college experience
				</div>
				<!-- Spacer to enable scroll-to-next -->
				<div class="h-32"></div>
			</div>
		</div>
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

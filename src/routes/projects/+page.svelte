<script>
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ProductStory from '$lib/components/ProductStory.svelte';
	import ScrollToNextIndicator from '$lib/components/ScrollToNextIndicator.svelte';
	import { onMount } from 'svelte';
	import { useScrollToNext } from '$lib/composables/useScrollToNext.js';
	import { getNextPagePath } from '$lib/stores/navigation.svelte.js';
	import { page } from '$app/stores';
	import sbomLogo from '$lib/assets/1007007-2765804390.png';

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
			id: 'cricwar',
			title: 'CricWAR',
			description:
				"A platform that brings 21st century cricket analytics to the people. I've built advanced statistical models that place traditional cricket metrics in the context of the game, measure the value of a player's contribution, and predict the probability of a team winning. I use this platform to write a blog providing interesting insights into patterns in the game.",
			tech: ['Python', 'Statistical Modeling', 'Data Analysis', 'Cricket Analytics', 'Substack'],
			demoUrl: undefined,
			githubUrl: undefined,
			substackUrl: 'https://cricwar.substack.com/'
		},
		{
			id: 'sbom-research',
			title: 'SBOM Tool Evaluation',
			description:
				'Conducted systematic evaluation of SBOM tools (Microsoft SBOM Tool, Trivy, Snyk) across 40+ Java repositories. Built automated evaluation pipeline and computed precision/recall metrics to expose failure modes in dependency detection and version handling.',
			tech: ['Python', 'Security Research', 'SBOM', 'Software Composition Analysis', 'Evaluation'],
			demoUrl: undefined,
			githubUrl: undefined
		},
		{
			id: 'spleen-to-text-bot',
			title: 'SpleenToTextBot',
			description:
				"A Discord bot that automatically transcribes voice messages to text in real time, making conversations more accessible for every server member. Built in Go for performance and reliability, SpleenToTextBot seamlessly integrates with Discord's voice notes and delivers accurate, fast transcriptions directly to chat.",
			tech: ['Go', 'Discord API', 'Speech Recognition', 'Bot Development', 'GenAI', 'LLMs'],
			demoUrl: 'https://discord.com/oauth2/authorize?client_id=1406685377321894051',
			githubUrl: 'https://github.com/abetrs/SpleenToTextBot'
		},
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
				"Launched and scaled a new data journalism product from 0 to 1 at William & Mary's college newspaper, growing output to 20+ articles annually through cross-functional team leadership.",
			tech: ['Data Visualization', 'Editorial Strategy', 'Analytics', 'Product Management'],
			demoUrl: 'https://flathatnews.com/category/data/',
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
		}
	]);

	// Product management stories data
	let productStories = $state([
		{
			projectId: 'sbom-research',
			title: 'SBOM Tool Evaluation',
			challenge:
				'Widely used SBOM tools lacked <strong>systematic accuracy evaluation</strong> and understanding of their practical limitations. Organizations relied on these tools for <strong>vulnerability scanning and compliance</strong> without clear insight into <strong>failure modes in dependency detection</strong>, version handling, and multi-module repository analysis.',
			solution:
				'Designed and executed a <strong>large-scale comparative evaluation</strong> of three leading SBOM tools (Microsoft SBOM Tool, Trivy, Snyk) across 40+ Java repositories using a curated ground truth dataset. Built an <strong>automated evaluation pipeline in Python</strong> and developed custom analysis scripts to compute precision, recall, and component-level metrics, enabling <strong>reproducible cross-tool analysis</strong>.',
			impact:
				'Exposed <strong>systematic failure patterns</strong> including missed transitive dependencies, version mismatches in multi-module repositories, and fundamental differences between file-centric and package-centric SBOM modeling. Research revealed that Microsoft SBOM Tool achieved near-perfect accuracy for <strong>file provenance</strong>, Snyk excelled at <strong>transitive dependency analysis</strong>, while Trivy systematically missed deeper dependency trees—insights only visible through <strong>systematic evaluation</strong>.',
			metrics: [
				'<strong>40+</strong> Java repositories evaluated against ground truth',
				'<strong>3</strong> major SBOM tools compared (Microsoft, Trivy, Snyk)',
				'<strong>Automated</strong> Python pipeline for reproducible evaluation',
				'<strong>Precision/Recall</strong> metrics computed at component level'
			],
			lessons: [
				'<strong>SBOM tools optimize for different objectives</strong>—vulnerability scanning vs. file provenance vs. dependency graphs',
				'<strong>Multi-module repositories</strong> are a dominant source of tool disagreement and semantic errors',
				'<strong>Systematic evaluation at scale</strong> reveals failure modes invisible through isolated analysis',
				'<strong>Tool correctness is semantic</strong>, not just formatting—directly affecting downstream security and license analysis'
			]
		},
		{
			projectId: 'black-pearl-ai',
			title: 'AI-Powered Due Diligence Framework',
			challenge:
				'Venture capital due diligence faced <strong>unprecedented scalability constraints</strong> as deal volumes surged. Traditional manual processes required 60-70% of analyst time on routine data gathering, creating <strong>bottlenecks that limited deal throughput</strong> and introduced consistency issues across evaluations.',
			solution:
				'Designed a <strong>three-tool automation framework</strong> integrating Claude AI with n8n workflow automation and Zapier system integrations. Created <strong>intelligent document processing workflows</strong> for pitch decks, market analysis, and risk assessment while maintaining full human oversight and decision authority.',
			impact:
				'Proposed solution targeting <strong>40-60% reduction in due diligence cycle time</strong> while improving analysis consistency and deal evaluation capacity. Framework designed to enable <strong>75% more deal evaluations</strong> with existing resources through automated data collection and AI-enhanced analysis.',
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
			challenge:
				'Music lovers struggled to share playlists across different streaming platforms, creating <strong>silos and limiting music discovery</strong>. User research revealed <strong>78% of users</strong> wanted cross-platform playlist sharing, but existing solutions were <strong>fragmented and unreliable</strong>.',
			solution:
				'Implemented a <strong>unified API integration strategy</strong> connecting Spotify, and Last.fm. Developed <strong>intelligent music matching algorithms</strong> and created a social discovery layer with <strong>recommendation systems</strong> based on listening behavior and social connections.',
			impact:
				'Achieved <strong>significant user engagement</strong> with seamless cross-platform playlist conversion and social music discovery features. The solution addressed <strong>core user pain points</strong> while building a sustainable growth model through <strong>network effects</strong>.',
			metrics: [],
			lessons: [
				'<strong>API rate limiting</strong> requires proactive user communication and graceful degradation',
				'<strong>Social features drive retention</strong> more than technical capabilities alone',
				'<strong>Music matching algorithms</strong> need constant refinement based on user feedback'
			]
		},
		{
			projectId: 'flat-hat-data-editor',
			title: 'Data Editor at The Flat Hat',
			challenge:
				'College journalism lacked <strong>analytical depth and data-driven storytelling</strong> capabilities. The newspaper had no dedicated data journalism section, missing opportunities to provide <strong>evidence-based reporting</strong> that could enhance credibility and reader engagement.',
			solution:
				'Launched a <strong>0-to-1 data journalism product</strong> by defining product vision, editorial processes, and content strategy. Led a <strong>cross-functional team of 5+ writers</strong> and collaborated with editorial staff to establish <strong>reusable visualization frameworks</strong> for Sports and News sections.',
			impact:
				'Successfully scaled from concept to <strong>20+ articles annually</strong> with consistent <strong>2 full pages per semester</strong>. Created sustainable editorial processes that reduced editing cycles and improved <strong>analytical storytelling quality</strong> across multiple newspaper sections.',
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
			challenge:
				'The lithium-ion battery supply chain lacked <strong>user-centered design</strong> and clear compliance workflows. User research revealed <strong>complex regulatory requirements</strong> and fragmented processes that created confusion for supply chain stakeholders and delayed project timelines.',
			solution:
				'Conducted comprehensive <strong>user and market research</strong> to define problem statements and guide development. Led <strong>end-to-end design process</strong> and documented <strong>design system components</strong> that cut time-to-spec by 25%. Transformed supply chain interviews into a <strong>Figma prototype with compliance acceptance criteria</strong>.',
			impact:
				'Delivered a <strong>validated prototype</strong> that enabled CTO sign-off and created a clear build path for engineering teams. Achieved <strong>30% reduction in rework</strong> during early engineering cycles through comprehensive design documentation and user-tested workflows.',
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
		}
	]);

	// Derived value to determine which projects have stories
	let projectsWithStories = $derived(new Set(productStories.map((story) => story.projectId)));
</script>

<!-- Content Area -->
<div bind:this={pageContainer} class="w-full max-w-[800px]">
	<div class="text-center">
		<h1 class="font-condensed mb-8 text-[48px] font-bold tracking-[-2px] text-black">Projects</h1>
		<div class="font-condensed text-[24px] leading-relaxed text-black">
			<p class="mb-8">
				A showcase of my technical projects spanning web development, agentic AI, and innovative
				solutions built during hackathons and personal exploration.
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
						substackUrl={project.substackUrl}
						projectId={project.id}
						hasStory={projectsWithStories.has(project.id)}
						logo={project.logo}
						{index}
					/>
				{/each}
			</div>

			<!-- Product Management Stories Section -->
			<div class="mt-20 border-t border-gray-200 pt-16">
				<div class="mb-12 text-center">
					<h2 class="font-condensed mb-4 text-[40px] font-bold tracking-[-1px] text-black">
						Product Management Stories
					</h2>
					<p class="font-condensed mx-auto max-w-3xl text-[20px] leading-relaxed text-gray-600">
						Behind every great product is strategic thinking, user empathy, and data-driven
						decisions. Here's how I approached the product management challenges for each project.
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
				<div class="font-mono text-sm text-gray-500">
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

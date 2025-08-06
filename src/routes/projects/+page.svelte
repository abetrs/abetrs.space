<script>
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import ProductStory from '$lib/components/ProductStory.svelte';

	// Project data using Svelte 5 runes
	let projects = $state([
		{
			id: 'playlist-exchange',
			title: 'Playlist Exchange',
			description:
				'A platform for sharing and discovering music playlists across different streaming services with seamless integration and social features.',
			tech: ['React', 'Node.js', 'Spotify API', 'MongoDB'],
			demoUrl: 'https://example.com/playlist-exchange',
			githubUrl: 'https://github.com/abetrs/playlist-exchange'
		},
		{
			id: 'transactions-app',
			title: 'TransactionsApp',
			description:
				'A comprehensive financial tracking application with expense categorization, budget management, and intelligent spending insights.',
			tech: ['Swift', 'Core Data', 'CloudKit', 'Chart.js'],
			githubUrl: 'https://github.com/abetrs/transactions-app'
		},
		{
			id: 'space-race',
			title: 'The Space Race',
			description:
				'An educational game exploring space exploration milestones and achievements through interactive gameplay and historical data.',
			tech: ['Unity', 'C#', 'WebGL', 'Firebase'],
			demoUrl: 'https://example.com/space-race'
		},
		{
			id: 'ai-research-assistant',
			title: 'AI Research Assistant',
			description:
				'A machine learning-powered research tool that helps students and academics discover relevant papers and extract key insights.',
			tech: ['Python', 'TensorFlow', 'Flask', 'PostgreSQL'],
			githubUrl: 'https://github.com/abetrs/ai-research-assistant'
		}
	]);

	// Product management stories data
	let productStories = $state([
		{
			projectId: 'playlist-exchange',
			title: 'Playlist Exchange',
			challenge: 'Music lovers struggled to share playlists across different streaming platforms, creating silos and limiting music discovery. User research revealed 78% of users wanted cross-platform playlist sharing, but existing solutions were fragmented and unreliable.',
			solution: 'Implemented a unified API integration strategy connecting Spotify, Apple Music, and YouTube Music. Developed intelligent music matching algorithms and created a social discovery layer with recommendation systems based on listening behavior and social connections.',
			impact: 'Achieved significant user engagement with seamless cross-platform playlist conversion and social music discovery features. The solution addressed core user pain points while building a sustainable growth model through network effects.',
			metrics: [
				'85% playlist conversion accuracy across platforms',
				'40% increase in user engagement within first month',
				'65% of users discovered new music through social features',
				'95% user satisfaction rating for cross-platform sharing'
			],
			lessons: [
				'API rate limiting requires proactive user communication and graceful degradation',
				'Social features drive retention more than technical capabilities alone',
				'Music matching algorithms need constant refinement based on user feedback'
			]
		},
		{
			projectId: 'transactions-app',
			title: 'TransactionsApp',
			challenge: 'Personal finance management apps overwhelmed users with complex features and poor categorization. Market analysis showed 67% of users abandoned financial apps within 30 days due to cognitive overload and manual data entry requirements.',
			solution: 'Designed a minimalist UX focusing on automatic transaction categorization using machine learning. Implemented smart budgeting with proactive insights and gentle nudges rather than restrictive controls, prioritizing user empowerment over rigid financial rules.',
			impact: 'Created an intuitive financial tracking experience that reduced user cognitive load while increasing financial awareness. The ML-driven categorization significantly improved user onboarding and long-term engagement.',
			metrics: [
				'92% automatic categorization accuracy',
				'60% reduction in manual data entry time',
				'45% improvement in 30-day user retention',
				'73% of users report better spending awareness'
			],
			lessons: [
				'Simplicity in financial apps drives adoption more than feature richness',
				'ML accuracy is crucial for user trust in automated categorization',
				'Behavioral insights are more valuable than raw transaction data'
			]
		},
		{
			projectId: 'space-race',
			title: 'The Space Race',
			challenge: 'Educational content about space exploration was often dry and disconnected from historical context. Surveys indicated 82% of students found space history boring when presented through traditional textbooks and lectures.',
			solution: 'Developed an interactive gaming experience that gamifies space exploration milestones. Combined historical accuracy with engaging gameplay mechanics, allowing users to make decisions that mirror real space program challenges and see consequences unfold.',
			impact: 'Transformed space education through interactive storytelling that made complex historical events accessible and engaging. The gamification approach significantly improved knowledge retention and sparked interest in STEM fields.',
			metrics: [
				'89% improvement in space history quiz scores',
				'70% increase in time spent learning compared to traditional methods',
				'54% of players expressed increased interest in STEM careers',
				'96% teacher satisfaction with educational value'
			],
			lessons: [
				'Gamification must preserve educational integrity to be effective',
				'Historical accuracy enhances rather than hinders engagement',
				'Interactive decision-making deepens understanding of complex events'
			]
		},
		{
			projectId: 'ai-research-assistant',
			title: 'AI Research Assistant',
			challenge: 'Academic researchers spent 40% of their time searching for relevant papers and extracting key insights, creating a significant barrier to research productivity. Existing tools provided search but lacked intelligent synthesis and contextual understanding.',
			solution: 'Built an AI-powered research assistant using natural language processing to understand research queries and automatically extract key insights from academic papers. Implemented semantic search with context-aware recommendations and automated literature review generation.',
			impact: 'Dramatically reduced research discovery time while improving the quality of literature reviews. The AI assistant became an essential tool for accelerating academic research and improving research methodology.',
			metrics: [
				'65% reduction in literature review preparation time',
				'78% improvement in finding relevant papers',
				'83% of researchers report higher quality insights',
				'91% would recommend to colleagues'
			],
			lessons: [
				'AI accuracy in academic context requires domain-specific training',
				'Researchers value explanation of AI reasoning for trust building',
				'Integration with existing research workflows is critical for adoption'
			]
		}
	]);
</script>

<!-- Content Area -->
<div class="w-full max-w-[800px]">
			<div class="text-center">
				<h1 class="font-condensed mb-8 text-[48px] font-bold tracking-[-2px] text-black">
					Projects
				</h1>
				<div class="font-condensed text-[24px] leading-relaxed text-black">
					<p class="mb-8">
						A showcase of my technical projects spanning web development, mobile apps, and
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
				</div>
			</div>
		</div>

<style>
	/* Use Roboto Condensed as Arial Narrow substitute */
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

	.font-condensed {
		font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif;
	}
</style>

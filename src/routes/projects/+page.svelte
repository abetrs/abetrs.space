<script>
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	// Project data using Svelte 5 runes
	let projects = $state([
		{
			title: 'Playlist Exchange',
			description:
				'A platform for sharing and discovering music playlists across different streaming services with seamless integration and social features.',
			tech: ['React', 'Node.js', 'Spotify API', 'MongoDB'],
			demoUrl: 'https://example.com/playlist-exchange',
			githubUrl: 'https://github.com/abetrs/playlist-exchange'
		},
		{
			title: 'TransactionsApp',
			description:
				'A comprehensive financial tracking application with expense categorization, budget management, and intelligent spending insights.',
			tech: ['Swift', 'Core Data', 'CloudKit', 'Chart.js'],
			githubUrl: 'https://github.com/abetrs/transactions-app'
		},
		{
			title: 'The Space Race',
			description:
				'An educational game exploring space exploration milestones and achievements through interactive gameplay and historical data.',
			tech: ['Unity', 'C#', 'WebGL', 'Firebase'],
			demoUrl: 'https://example.com/space-race'
		},
		{
			title: 'AI Research Assistant',
			description:
				'A machine learning-powered research tool that helps students and academics discover relevant papers and extract key insights.',
			tech: ['Python', 'TensorFlow', 'Flask', 'PostgreSQL'],
			githubUrl: 'https://github.com/abetrs/ai-research-assistant'
		}
	]);
</script>

<div class="min-h-screen bg-gray-50">

	<!-- Main Content with responsive left margin -->
	<div class="ml-0 flex flex-col items-center justify-center px-4 py-8 lg:ml-[200px]">
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
								{index}
							/>
						{/each}
					</div>
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

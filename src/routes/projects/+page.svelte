<script>
	import TopBar from '$lib/components/TopBar.svelte';
	import LeftBar from '$lib/components/LeftBar.svelte';
</script>

<div class="min-h-screen bg-gray-50">
	<!-- Top Bar -->
	<TopBar />
	
	<!-- Left Navigation Bar -->
	<LeftBar />
	
	<!-- Main Content with responsive left margin -->
	<div class="lg:ml-[200px] ml-0 flex flex-col items-center justify-center px-4 py-8">
		<!-- Content Area -->
		<div class="max-w-[800px] w-full">
			<div class="text-center">
				<h1 class="text-[48px] font-bold text-black mb-8 tracking-[-2px] font-condensed">
					Projects
				</h1>
				<div class="text-[24px] text-black leading-relaxed font-condensed">
					<p class="mb-8">
						A showcase of my technical projects spanning web development, mobile apps, and innovative solutions built during hackathons and personal exploration.
					</p>
					
					<!-- Placeholder content for projects -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
						<div class="border border-gray-300 p-6 rounded-lg">
							<h3 class="text-[28px] font-semibold mb-4">Playlist Exchange</h3>
							<p class="text-[18px] text-gray-700 mb-4">A platform for sharing and discovering music playlists across different streaming services.</p>
							<div class="text-[16px] text-gray-600">Tech: React, Node.js, Spotify API</div>
						</div>
						
						<div class="border border-gray-300 p-6 rounded-lg">
							<h3 class="text-[28px] font-semibold mb-4">TransactionsApp</h3>
							<p class="text-[18px] text-gray-700 mb-4">A financial tracking application with expense categorization and budget management.</p>
							<div class="text-[16px] text-gray-600">Tech: Swift, Core Data</div>
						</div>
						
						<div class="border border-gray-300 p-6 rounded-lg">
							<h3 class="text-[28px] font-semibold mb-4">The Space Race</h3>
							<p class="text-[18px] text-gray-700 mb-4">An educational game exploring space exploration milestones and achievements.</p>
							<div class="text-[16px] text-gray-600">Tech: Unity, C#</div>
						</div>
						
						<div class="border border-gray-300 p-6 rounded-lg">
							<h3 class="text-[28px] font-semibold mb-4">Hackathon Projects</h3>
							<p class="text-[18px] text-gray-700 mb-4">Collection of innovative solutions built during various hackathon competitions.</p>
							<div class="text-[16px] text-gray-600">Tech: Various technologies</div>
						</div>
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

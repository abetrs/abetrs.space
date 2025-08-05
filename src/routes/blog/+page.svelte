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
					Blog
				</h1>
				<div class="text-[24px] text-black leading-relaxed font-condensed">
					<p class="mb-8">
						Thoughts and insights on technology, design, and the intersection of innovation with real-world problem solving. 
						Follow my journey through tech, academics, and creative exploration.
					</p>
					
					<!-- Placeholder content for blog -->
					<div class="space-y-8 text-left">
						<div class="bg-white p-6 rounded-lg shadow-sm border-l-4 border-black">
							<h3 class="text-[28px] font-semibold mb-2">Substack Integration</h3>
							<p class="text-[18px] text-gray-700 mb-4">
								Regular posts about technology trends, development insights, and personal reflections on the tech industry.
							</p>
							<a href="https://substack.com/@abhaypradjha" class="text-[18px] text-black underline hover:no-underline">
								Read on Substack →
							</a>
						</div>
						
						<div class="space-y-6">
							<h3 class="text-[28px] font-semibold">Recent Posts</h3>
							
							<div class="bg-white p-6 rounded-lg shadow-sm">
								<h4 class="text-[24px] font-semibold mb-2">The Future of Full-Stack Development</h4>
								<p class="text-[16px] text-gray-600 mb-3">Published 2 weeks ago</p>
								<p class="text-[18px] text-gray-700 mb-4">
									Exploring emerging trends in web development and how modern frameworks are reshaping 
									the developer experience...
								</p>
								<button class="text-[16px] text-black underline hover:no-underline">Read more →</button>
							</div>
							
							<div class="bg-white p-6 rounded-lg shadow-sm">
								<h4 class="text-[24px] font-semibold mb-2">Lessons from My Deloitte Internship</h4>
								<p class="text-[16px] text-gray-600 mb-3">Published 1 month ago</p>
								<p class="text-[18px] text-gray-700 mb-4">
									Key insights gained from working in tech consulting and how enterprise-level 
									projects differ from academic work...
								</p>
								<button class="text-[16px] text-black underline hover:no-underline">Read more →</button>
							</div>
							
							<div class="bg-white p-6 rounded-lg shadow-sm">
								<h4 class="text-[24px] font-semibold mb-2">Building User-Centered Digital Experiences</h4>
								<p class="text-[16px] text-gray-600 mb-3">Published 6 weeks ago</p>
								<p class="text-[18px] text-gray-700 mb-4">
									The importance of design thinking in development and how to create solutions 
									that truly solve real-world problems...
								</p>
								<button class="text-[16px] text-black underline hover:no-underline">Read more →</button>
							</div>
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

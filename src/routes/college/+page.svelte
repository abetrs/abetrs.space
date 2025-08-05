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
					College
				</h1>
				<div class="text-[24px] text-black leading-relaxed font-condensed">
					<p class="mb-8">
						My academic journey at William & Mary, exploring Computer Science while actively engaging in campus life and extracurricular activities.
					</p>
					
					<!-- Placeholder content for college -->
					<div class="space-y-8 text-left">
						<div class="bg-white p-6 rounded-lg shadow-sm">
							<h3 class="text-[28px] font-semibold mb-4">William & Mary</h3>
							<p class="text-[20px] text-gray-700 mb-2">Bachelor of Science in Computer Science</p>
							<p class="text-[18px] text-gray-600 mb-4">Class of 2026</p>
							<p class="text-[18px] text-gray-700">
								Focused on software engineering, data structures, algorithms, and digital innovation. 
								Coursework includes Advanced Programming, Database Systems, and Computer Graphics.
							</p>
						</div>
						
						<div class="bg-white p-6 rounded-lg shadow-sm">
							<h3 class="text-[28px] font-semibold mb-4">Campus Involvement</h3>
							<ul class="space-y-3 text-[18px] text-gray-700">
								<li class="flex items-start">
									<span class="text-black mr-3">•</span>
									<span><strong>Cricket Club:</strong> Active member and team player</span>
								</li>
								<li class="flex items-start">
									<span class="text-black mr-3">•</span>
									<span><strong>The Flat Hat:</strong> Contributing writer for the student newspaper</span>
								</li>
								<li class="flex items-start">
									<span class="text-black mr-3">•</span>
									<span><strong>International Mini Mart:</strong> Cultural engagement and community building</span>
								</li>
							</ul>
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

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
					Internships
				</h1>
				<div class="text-[24px] text-black leading-relaxed font-condensed">
					<p class="mb-8">
						My professional journey through internships at leading companies, gaining experience in tech consulting, data analysis, and full-stack development.
					</p>
					
					<!-- Placeholder content for internships -->
					<div class="space-y-8 text-left">
						<div class="border-l-4 border-black pl-6">
							<h3 class="text-[28px] font-semibold mb-2">Deloitte (2024)</h3>
							<p class="text-[20px] text-gray-700">Technology Consulting Internship</p>
						</div>
						
						<div class="border-l-4 border-black pl-6">
							<h3 class="text-[28px] font-semibold mb-2">Black Pearl Global Investments (2023)</h3>
							<p class="text-[20px] text-gray-700">Data Analysis & Investment Research</p>
						</div>
						
						<div class="border-l-4 border-black pl-6">
							<h3 class="text-[28px] font-semibold mb-2">TCS (2022)</h3>
							<p class="text-[20px] text-gray-700">Full-Stack Development Internship</p>
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

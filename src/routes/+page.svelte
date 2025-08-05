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
	<div class="lg:ml-[150px] ml-0 flex flex-col items-center justify-center px-4 py-8">
		<!-- Oval Profile Image Placeholder -->
		<div class="w-[501px] h-[300px] bg-gray-300 rounded-full flex items-center justify-center mb-8 overflow-hidden">
			<div class="text-gray-600 text-lg font-medium text-center">
				<div class="mb-2">📷</div>
				<div>Profile Image</div>
				<div class="text-sm">Placeholder</div>
			</div>
		</div>
		
		<!-- About Me Section -->
		<div class="max-w-[771px] w-full">
			<div class="text-justify font-condensed">
				<h2 class="text-[32px] font-bold text-black mb-4 tracking-[-1.92px]">
					About Me
				</h2>
				<p class="text-[32px] text-black leading-normal tracking-[-1.92px]">
					I'm Abhayprad Jha, a Computer Science student at William & Mary (Class of 2026), blending my passion for building products and design a fascination with modelling the world around me. With internships at Deloitte, TCS and Black Pearl Global Investments, I've honed skills in full-stack development, data analysis, and digital transformation. My goal is to craft user-centered digital experiences that solve real-world challenges.
				</p>
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

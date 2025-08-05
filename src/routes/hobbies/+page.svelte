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
					Hobbies
				</h1>
				<div class="text-[24px] text-black leading-relaxed font-condensed">
					<p class="mb-8">
						Beyond coding and academics, I explore creativity through music, photography, film, and 3D modeling—each offering unique perspectives on design and storytelling.
					</p>
					
					<!-- Placeholder content for hobbies -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
						<div class="bg-white p-6 rounded-lg shadow-sm">
							<h3 class="text-[28px] font-semibold mb-4">🎵 Music</h3>
							<p class="text-[18px] text-gray-700 mb-4">
								Curating playlists and exploring diverse genres. Active on Spotify and SoundCloud, 
								sharing musical discoveries and creating themed collections.
							</p>
							<div class="text-[16px] text-gray-600">Platforms: Spotify, SoundCloud</div>
						</div>
						
						<div class="bg-white p-6 rounded-lg shadow-sm">
							<h3 class="text-[28px] font-semibold mb-4">📸 Photography</h3>
							<p class="text-[18px] text-gray-700 mb-4">
								Capturing moments from travels and daily life. Building a portfolio of landscape, 
								street, and portrait photography from various trips and experiences.
							</p>
							<div class="text-[16px] text-gray-600">Focus: Travel, Street, Portrait</div>
						</div>
						
						<div class="bg-white p-6 rounded-lg shadow-sm">
							<h3 class="text-[28px] font-semibold mb-4">🎬 Film</h3>
							<p class="text-[18px] text-gray-700 mb-4">
								Passionate about cinematography and storytelling. Creating video content and 
								exploring different filming techniques and narrative structures.
							</p>
							<div class="text-[16px] text-gray-600">Interest: Cinematography, Storytelling</div>
						</div>
						
						<div class="bg-white p-6 rounded-lg shadow-sm">
							<h3 class="text-[28px] font-semibold mb-4">🎨 3D Modeling</h3>
							<p class="text-[18px] text-gray-700 mb-4">
								Creating digital art and 3D environments. Experimenting with modeling software 
								to bring creative concepts to life in virtual space.
							</p>
							<div class="text-[16px] text-gray-600">Tools: Blender, Maya</div>
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

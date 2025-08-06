<script>
	import GalleryComponent from '$lib/components/GalleryComponent.svelte';

	// Hobbies gallery data using Svelte 5 runes
	let hobbyItems = $state([
		{
			title: 'Ambient Soundscapes',
			description: 'Curated playlists featuring ambient and atmospheric music for focus and relaxation.',
			category: 'music',
			image: null,
			tags: ['ambient', 'focus', 'productivity'],
			details: 'A collection of carefully selected ambient tracks perfect for coding sessions and deep work.',
			links: [
				{ label: 'Spotify Playlist', url: 'https://open.spotify.com/playlist/example' },
				{ label: 'SoundCloud', url: 'https://soundcloud.com/abhayprad' }
			]
		},
		{
			title: 'Jazz Essentials',
			description: 'Essential jazz tracks spanning from classic bebop to modern fusion.',
			category: 'music',
			image: null,
			tags: ['jazz', 'bebop', 'fusion'],
			details: 'Exploring the evolution of jazz through legendary artists and contemporary masters.',
			links: [
				{ label: 'Listen on Spotify', url: 'https://open.spotify.com/playlist/jazz-essentials' }
			]
		},
		{
			title: 'Campus Life Photography',
			description: 'Capturing moments from daily life at William & Mary - from study sessions to cricket matches.',
			category: 'photography',
			image: null,
			tags: ['campus', 'lifestyle', 'documentary'],
			details: 'A photographic journal of college experiences, friendships, and academic journey.',
			links: []
		},
		{
			title: 'Urban Architecture',
			description: 'Exploring the geometric beauty and modern designs of urban landscapes and buildings.',
			category: 'photography',
			image: null,
			tags: ['architecture', 'urban', 'geometric'],
			details: 'Documenting the intersection of human creativity and functional design in cityscapes.',
			links: []
		},
		{
			title: 'Short Film: "Digital Disconnect"',
			description: 'A 5-minute experimental film exploring our relationship with technology and social media.',
			category: 'film',
			image: null,
			tags: ['experimental', 'social-commentary', 'tech'],
			details: 'Shot and edited independently, this film examines how digital devices impact human connection.',
			links: [
				{ label: 'Watch on Vimeo', url: 'https://vimeo.com/example-video' }
			]
		},
		{
			title: 'Documentary: "Startup Culture"',
			description: 'Behind-the-scenes look at young entrepreneurs building tech companies.',
			category: 'film',
			image: null,
			tags: ['documentary', 'entrepreneurship', 'tech'],
			details: 'A 15-minute documentary following three student entrepreneurs as they develop their startups.',
			links: []
		},
		{
			title: '3D Environment: Cyberpunk Cityscape',
			description: 'Futuristic city environment with neon lighting and atmospheric effects.',
			category: 'modeling',
			image: null,
			tags: ['cyberpunk', 'environment', 'lighting'],
			details: 'Created in Blender with custom materials and volumetric lighting effects.',
			links: [
				{ label: 'View on ArtStation', url: 'https://artstation.com/example' }
			]
		},
		{
			title: 'Character Design: Sci-Fi Robot',
			description: 'Detailed robot character with mechanical textures and procedural materials.',
			category: 'modeling',
			image: null,
			tags: ['character', 'sci-fi', 'texturing'],
			details: 'Full character pipeline from concept to final render, including rigging and animation tests.',
			links: []
		},
		{
			title: 'Tech Blog: "Full-Stack Insights"',
			description: 'Regular posts about web development, frameworks, and industry trends.',
			category: 'writing',
			image: null,
			tags: ['tech', 'web-dev', 'tutorials'],
			details: 'Sharing knowledge and experiences from internships and personal projects.',
			links: [
				{ label: 'Read on Substack', url: 'https://substack.com/@abhaypradjha' }
			]
		}
	]);
</script>

<!-- Content Area -->
<div class="w-full max-w-[800px]">
	<div class="text-center">
		<h1 class="font-condensed mb-8 text-[48px] font-bold tracking-[-2px] text-black">
			Hobbies
		</h1>
		<div class="font-condensed text-[24px] leading-relaxed text-black">
			<p class="mb-8">
				Beyond coding and academics, I explore creativity through music, photography, film, and
				3D modeling—each offering unique perspectives on design and storytelling.
			</p>

			<!-- Placeholder content for hobbies -->
			<div class="grid grid-cols-1 gap-8 text-left md:grid-cols-2">
				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h3 class="mb-4 text-[28px] font-semibold">🎵 Music</h3>
					<p class="mb-4 text-[18px] text-gray-700">
						Curating playlists and exploring diverse genres. Active on Spotify and SoundCloud,
						sharing musical discoveries and creating themed collections.
					</p>
					<div class="text-[16px] text-gray-600">Platforms: Spotify, SoundCloud</div>
				</div>

				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h3 class="mb-4 text-[28px] font-semibold">📸 Photography</h3>
					<p class="mb-4 text-[18px] text-gray-700">
						Capturing moments from travels and daily life. Building a portfolio of landscape,
						street, and portrait photography from various trips and experiences.
					</p>
					<div class="text-[16px] text-gray-600">Focus: Travel, Street, Portrait</div>
				</div>

				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h3 class="mb-4 text-[28px] font-semibold">🎬 Film</h3>
					<p class="mb-4 text-[18px] text-gray-700">
						Passionate about cinematography and storytelling. Creating video content and
						exploring different filming techniques and narrative structures.
					</p>
					<div class="text-[16px] text-gray-600">Interest: Cinematography, Storytelling</div>
				</div>

				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h3 class="mb-4 text-[28px] font-semibold">🎨 3D Modeling</h3>
					<p class="mb-4 text-[18px] text-gray-700">
						Creating digital art and 3D environments. Experimenting with modeling software to
						bring creative concepts to life in virtual space.
					</p>
					<div class="text-[16px] text-gray-600">Tools: Blender, Maya</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="min-h-screen bg-gray-50">

	<!-- Main Content with responsive left margin -->
	<div class="ml-0 flex flex-col items-center justify-start px-4 py-8 lg:ml-[200px]">
		<!-- Content Area -->
		<div class="w-full max-w-[1000px]">
			<div class="mb-12 text-center">
				<h1 class="font-condensed mb-8 text-[48px] font-bold tracking-[-2px] text-black">
					Hobbies
				</h1>
				<p class="font-condensed text-[24px] leading-relaxed text-black">
					Beyond coding and academics, I explore creativity through music, photography, film, and
					3D modeling—each offering unique perspectives on design and storytelling.
				</p>
			</div>
			
			<!-- Enhanced Gallery Component -->
			<GalleryComponent 
				items={hobbyItems}
				title="Creative Portfolio"
				columns={3}
				showModal={true}
			/>
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

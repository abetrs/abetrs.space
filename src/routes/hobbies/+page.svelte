<script>
	import GalleryComponent from '$lib/components/GalleryComponent.svelte';
	import ScrollToNextIndicator from '$lib/components/ScrollToNextIndicator.svelte';
	import { onMount } from 'svelte';
	import { useScrollToNext } from '$lib/composables/useScrollToNext.js';
	import { getNextPagePath } from '$lib/stores/navigation.svelte.js';
	import { page } from '$app/stores';

	// Container reference for scroll detection
	let pageContainer = $state(null);

	// Scroll-to-next functionality
	const scrollToNext = useScrollToNext();
	
	// Get next page name for indicator
	let nextPagePath = $derived($page.url ? getNextPagePath($page.url.pathname) : null);
	let nextPageName = $derived(() => {
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
<div bind:this={pageContainer} class="w-full max-w-[800px]">
	<div class="text-center">
		<h1 class="font-condensed mb-8 text-[48px] font-bold tracking-[-2px] text-black">
			Hobbies
		</h1>
		<div class="font-condensed text-[24px] leading-relaxed text-black">
			<p class="mb-8">
				Beyond coding and academics, I explore creativity through music, photography, film, and
				3D modeling—each offering unique perspectives on design and storytelling.
			</p>

			<!-- Enhanced Gallery Component -->
			<GalleryComponent 
				items={hobbyItems}
				title="Creative Portfolio"
				columns={3}
				showModal={true}
			/>

			<!-- Additional content to ensure scrolling is possible -->
			<div class="mt-16 space-y-8 text-center">
				<div class="text-sm text-gray-500 font-mono">
					Continue scrolling to read my blog posts
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
{/if}<style>
	/* Use Roboto Condensed as Arial Narrow substitute */
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

	.font-condensed {
		font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif;
	}
</style>

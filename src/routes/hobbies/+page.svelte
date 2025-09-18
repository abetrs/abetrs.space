<script>
	import GalleryComponent from '$lib/components/GalleryComponent.svelte';
	import ScrollToNextIndicator from '$lib/components/ScrollToNextIndicator.svelte';
	import SongMenu from '$lib/components/SongMenu.svelte';
	import AudioPlayer from '$lib/components/AudioPlayer.svelte';
	import { onMount } from 'svelte';
	import { useScrollToNext } from '$lib/composables/useScrollToNext.js';
	import { getNextPagePath } from '$lib/stores/navigation.svelte.js';
	import { page } from '$app/stores';
	// Dynamically discover audio assets from the project's audio folder using Vite's glob
	// We use eager + as: 'url' so the build provides file URLs we can pass to the audio element.
	const audioFiles = import.meta.glob('$lib/assets/audio/*.{mp3,wav,ogg}', {
		eager: true,
		as: 'url'
	});

	// Dynamically discover photography images (web-compatible formats only)
	const photographyFiles = import.meta.glob(
		'$lib/assets/photos/Photography/*.{jpg,JPG,jpeg,JPEG,png,PNG}',
		{
			eager: true,
			as: 'url'
		}
	);

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
			title: 'Placeholder: Music',
			description: 'Short placeholder description for music-related hobby.',
			category: 'music',
			image: null,
			tags: ['music'],
			details: 'Placeholder details about music hobby.',
			links: []
		},
		{
			title: 'Placeholder: Photography',
			description: 'Short placeholder description for photography.',
			category: 'photography',
			image: null,
			tags: ['photography'],
			details: 'Placeholder details about photography hobby.',
			links: []
		},
		{
			title: 'Placeholder: Film',
			description: 'Short placeholder description for film/video work.',
			category: 'film',
			image: null,
			tags: ['film'],
			details: 'Placeholder details about film hobby.',
			links: []
		},
		{
			title: 'Placeholder: 3D Modeling',
			description: 'Short placeholder description for 3D modeling.',
			category: 'modeling',
			image: null,
			tags: ['3d'],
			details: 'Placeholder details about 3D modeling hobby.',
			links: []
		}
	]);

	// Build musicTracks dynamically from discovered files. Set artist to 'ReallyAbe'.
	// Limit to 2 tracks (or fewer if fewer files exist).
	let musicTracks = $state([]);

	$effect(() => {
		// audioFiles is an object mapping paths -> urls
		const fileEntries = Object.entries(audioFiles || {});

		// Map to simple objects and sort by filename for determinism
		const tracks = fileEntries
			.map(([path, url]) => {
				// Derive a title from the filename
				const parts = path.split('/');
				const filename = parts[parts.length - 1];
				const title = filename.replace(/\.(mp3|wav|ogg)$/i, '');
				return { title, artist: 'ReallyAbe', src: url, duration: '' };
			})
			.sort((a, b) => a.title.localeCompare(b.title));

		// Use up to 2 tracks
		musicTracks = tracks.slice(0, 2);
	});

	// Selected song state shared between SongMenu and AudioPlayer
	let selectedSong = $state(null);
	let selectedIndex = $state(null);
	// audio element reference exposed by AudioPlayer (bindable)
	let audioEl = $state(null);
	// optional analyser provided by AudioPlayer
	let visualizerAnalyser = $state(null);
	let visualizerAudioCtx = $state(null);

	// Photography gallery state
	let photographyImages = $state([]);
	let currentImageIndex = $state(0);
	let isMobile = $state(false);

	// Build photography images array from discovered files
	$effect(() => {
		const fileEntries = Object.entries(photographyFiles || {});

		// Filter out any files that might not be web-compatible and sort by filename
		photographyImages = fileEntries
			.map(([path, url]) => {
				const parts = path.split('/');
				const filename = parts[parts.length - 1];
				// Only include common web image formats
				const isWebCompatible = /\.(jpe?g|png)$/i.test(filename);
				return isWebCompatible ? { url, filename } : null;
			})
			.filter(Boolean) // Remove null entries
			.sort((a, b) => a.filename.localeCompare(b.filename));
	});

	// Check screen size for responsive behavior
	$effect(() => {
		if (typeof window !== 'undefined') {
			const checkScreenSize = () => {
				isMobile = window.innerWidth < 768; // md breakpoint
			};
			checkScreenSize();
			window.addEventListener('resize', checkScreenSize);
			return () => window.removeEventListener('resize', checkScreenSize);
		}
	});
</script>

<!-- Content Area -->
<div bind:this={pageContainer} class="mx-auto w-full max-w-[600px]">
	<!-- Music Card: Now Playing + Player + Playlist -->
	<div id="music">
		<h2 class="font-condensed mb-4 text-[28px] font-semibold tracking-[-1px] text-black">Music</h2>
		<div class="mb-6 rounded-md border border-gray-200 bg-white p-4 shadow-sm">
			<div class="font-condensed mb-2 text-[14px] text-gray-600">Now Playing</div>
			<div class="flex items-center justify-between">
				<div class="font-condensed text-[18px] font-semibold">
					{#if selectedSong}{selectedSong.title} — {selectedSong.artist}{:else}No track selected{/if}
				</div>
				{#if selectedSong}
					<AudioPlayer
						on:ready={(e) => {
							console.debug('Hobbies: AudioPlayer ready event', e.detail);
							queueMicrotask(() => {
								audioEl = e.detail.audio;
								if (e.detail.analyser) {
									visualizerAnalyser = e.detail.analyser;
									visualizerAudioCtx = e.detail.audioCtx || null;
								}
								console.debug('Hobbies: assigned audioEl', { audioEl, visualizerAnalyser });
							});
						}}
						songUrl={selectedSong.src}
						title={selectedSong.title}
					/>
				{/if}
			</div>
		</div>
		<!-- Playlist beneath the player -->
		<div>
			<SongMenu
				songs={musicTracks}
				title="Tracks"
				{selectedIndex}
				on:select={(e) => {
					selectedSong = e.detail.song;
					selectedIndex = e.detail.index;
				}}
			/>
		</div>
	</div>

	<!-- Film section -->
	<div id="film" class="mt-12">
		<h3 class="font-condensed mb-4 text-[28px] font-semibold tracking-[-1px] text-black">Film</h3>
		<div class="rounded-md border border-gray-200 bg-white p-6 shadow-sm">
			<h4 class="font-condensed mb-4 text-[18px] font-semibold text-black">Ellipses</h4>
			<div class="mb-4 flex justify-center">
				<iframe
					width="480"
					height="480"
					src="https://www.youtube.com/embed/9JN5lsicZ6w?si=ATYZ6FzdovA0-Rwp"
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
					class="aspect-square h-auto max-w-full"
				></iframe>
			</div>
			<p class="font-condensed text-[16px] leading-relaxed text-black">
				A collaborative short film created in partnership with Taiga Lewis for the prestigious
				24Speed filmmaking competition. This award-winning romance was conceived, written, filmed,
				and edited within a demanding 24-hour timeframe while adhering to strict creative
				constraints. Our compelling storytelling and technical execution earned recognition with the
				Audience Choice Award for Best Film.
			</p>

			<!-- Signed in Blood -->
			<div class="mt-8">
				<h4 class="font-condensed mb-4 text-[18px] font-semibold text-black">Signed in Blood</h4>
				<div class="mb-4 flex justify-center">
					<iframe
						src="https://drive.google.com/file/d/1spDtVlX2rmnolsr9EOvl5qmBk58b6U2r/preview"
						width="480"
						height="480"
						allow="autoplay"
						title="Signed in Blood - Noir Short Film"
						class="aspect-square h-auto max-w-full"
					></iframe>
				</div>
				<p class="font-condensed text-[16px] leading-relaxed text-black">
					A noir thriller crafted for the 24Speed Film Festival at William & Mary, showcasing
					atmospheric cinematography and classic genre elements. This moody short film demonstrates
					our mastery of visual storytelling through careful lighting, composition, and shadow work.
					The sophisticated visual aesthetic and technical precision earned recognition with the
					Judges Award for Best Cinematography.
				</p>
			</div>
		</div>
	</div>

	<!-- Photography Gallery -->
	<div id="photography" class="mt-8 mb-16">
		<h3 class="font-condensed mb-4 text-[28px] font-semibold tracking-[-1px] text-black">
			Photography
		</h3>

		{#if photographyImages.length > 0}
			<!-- Desktop: Masonry Collage -->
			<div class="hidden md:block">
				<div class="columns-1 gap-4 space-y-4 sm:columns-2 lg:columns-3">
					{#each photographyImages as image, index}
						<div class="mb-4 break-inside-avoid">
							<img
								src={image.url}
								alt="Photography by Abhayprad Jha - {image.filename}"
								class="h-auto w-full rounded-md shadow-sm transition-shadow duration-300 hover:shadow-md"
								loading="lazy"
								onerror={(e) => (e.target.style.display = 'none')}
							/>
						</div>
					{/each}
				</div>
			</div>

			<!-- Mobile: Carousel -->
			<div class="block md:hidden">
				<div class="relative overflow-hidden rounded-md bg-gray-100" style="height: 60vh;">
					<div
						class="flex h-full transition-transform duration-300 ease-in-out"
						style="transform: translateX(-{currentImageIndex * 100}%)"
					>
						{#each photographyImages as image}
							<div class="flex h-full w-full flex-shrink-0 items-center justify-center">
								<img
									src={image.url}
									alt="Photography by Abhayprad Jha - {image.filename}"
									class="max-h-full max-w-full object-contain"
									loading="lazy"
									onerror={(e) => (e.target.parentElement.style.display = 'none')}
								/>
							</div>
						{/each}
					</div>

					<!-- Carousel Controls -->
					<button
						class="absolute top-1/2 left-2 -translate-y-1/2 transform rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
						onclick={() => {
							currentImageIndex =
								currentImageIndex === 0 ? photographyImages.length - 1 : currentImageIndex - 1;
						}}
						aria-label="Previous image"
					>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 19l-7-7 7-7"
							></path>
						</svg>
					</button>

					<button
						class="absolute top-1/2 right-2 -translate-y-1/2 transform rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
						onclick={() => {
							currentImageIndex =
								currentImageIndex === photographyImages.length - 1 ? 0 : currentImageIndex + 1;
						}}
						aria-label="Next image"
					>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"
							></path>
						</svg>
					</button>
				</div>

				<!-- Carousel Indicators -->
				<div class="mt-4 flex justify-center space-x-2">
					{#each photographyImages as _, index}
						<button
							class="h-2 w-2 rounded-full transition-colors {currentImageIndex === index
								? 'bg-black'
								: 'bg-gray-300 hover:bg-gray-400'}"
							onclick={() => (currentImageIndex = index)}
							aria-label="Go to image {index + 1}"
						></button>
					{/each}
				</div>
			</div>
		{:else}
			<div class="rounded-md border border-dashed border-gray-200 bg-white/50 p-6 text-gray-400">
				<div class="italic">Loading photography gallery...</div>
			</div>
		{/if}
	</div>
</div>

<!-- Scroll-to-next indicator -->
{#if nextPagePath}
	<ScrollToNextIndicator nextPageName={nextPageName()} />
{/if}

<style>
	/* Use Roboto Condensed as Arial Narrow substitute */
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

	.font-condensed {
		font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif;
	}
</style>

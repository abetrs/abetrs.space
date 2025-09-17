<script>
	import { createEventDispatcher } from 'svelte';

	// Props
	let { songs = [], title = 'Songs', selectedIndex = null } = $props();

	const dispatch = createEventDispatcher();

	function selectSong(index) {
		if (!songs || !songs[index]) return;
		// dispatch asynchronously to avoid triggering parent updates during render
		queueMicrotask(() => dispatch('select', { song: songs[index], index }));
	}
</script>

<div class="w-full">
	<h3 class="font-condensed mb-4 text-[24px] font-semibold tracking-[-1px] text-black">{title}</h3>

	<ol class="space-y-2">
		{#each songs as song, index}
			<li>
				<button
					class="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left font-mono text-[15px] font-medium text-black transition-colors duration-200 hover:bg-gray-100"
					onclick={() => selectSong(index)}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							selectSong(index);
						}
					}}
					aria-label={`Select ${song.title || 'song'}`}
				>
					<div class="flex items-center gap-3">
						<div class="text-sm text-gray-500">{index + 1}.</div>
						<div>
							<div class="font-condensed text-[16px] text-black">{song.title}</div>
							{#if song.artist}
								<div class="text-sm text-gray-500">{song.artist}</div>
							{/if}
						</div>
					</div>

					<div class="flex items-center gap-3">
						<span class="mr-2 text-sm text-gray-500">{song.duration || ''}</span>
						<svg
							class="h-5 w-5 text-gray-700 transition-transform duration-150 group-hover:scale-110"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							{#if selectedIndex === index}
								<circle cx="10" cy="10" r="5" />
							{:else}
								<path d="M4.5 3.5v13l11-6.5-11-6.5z" />
							{/if}
						</svg>
					</div>
				</button>
			</li>
		{/each}
	</ol>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

	.font-condensed {
		font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif;
	}
	.font-mono {
		font-family: 'Roboto Mono', 'Courier New', monospace;
	}
</style>

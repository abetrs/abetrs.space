<script>
	import { onMount, createEventDispatcher } from 'svelte';

	// Props
	let { songUrl = '', title = 'Track' } = $props();

	const dispatch = createEventDispatcher();

	// Reactive state using Svelte 5 runes
	let isPlaying = $state(false);
	let currentTime = $state(0);
	let duration = $state(0);
	// Local audio element reference (bound in template)
	let audioRef = $state(null);
	// Internal audio context and analyser owned by player
	let _audioCtx = $state(null);
	let _source = $state(null);
	let _analyser = $state(null);

	// Ensure SSR safety by only accessing DOM in onMount
	onMount(() => {
		let rafId = null;
		let initialized = false;

		function cleanupAll() {
			try {
				if (audioRef) {
					audioRef.removeEventListener('timeupdate', onTimeUpdate);
					audioRef.removeEventListener('loadedmetadata', onLoadedMetadata);
					audioRef.removeEventListener('ended', onEnded);
				}
				if (_source) {
					_source.disconnect();
					_source = null;
				}
				if (_analyser) {
					_analyser.disconnect();
					_analyser = null;
				}
				if (_audioCtx) {
					_audioCtx.close().catch(() => {});
					_audioCtx = null;
				}
			} catch (e) {
				console.warn('AudioPlayer cleanup failed', e);
			}
		}

		function onTimeUpdate() {
			currentTime = audioRef.currentTime || 0;
		}

		function onLoadedMetadata() {
			duration = audioRef.duration || 0;
		}

		function onEnded() {
			isPlaying = false;
			currentTime = 0;
		}

		function init() {
			// wait for the audioRef binding
			if (!audioRef) {
				rafId = requestAnimationFrame(init);
				return;
			}

			// Attach DOM listeners
			audioRef.addEventListener('timeupdate', onTimeUpdate);
			audioRef.addEventListener('loadedmetadata', onLoadedMetadata);
			audioRef.addEventListener('ended', onEnded);

			// create AudioContext and AnalyserNode and connect audio element
			try {
				const AudioContext = window.AudioContext || window.webkitAudioContext;
				if (!_audioCtx) _audioCtx = new AudioContext();
				if (!_analyser) {
					_analyser = _audioCtx.createAnalyser();
					_analyser.fftSize = 2048;
					_analyser.smoothingTimeConstant = 0.8;
				}
				// If source exists, disconnect
				try {
					if (_source) _source.disconnect();
				} catch (e) {}
				_source = _audioCtx.createMediaElementSource(audioRef);
				_source.connect(_analyser);
				_analyser.connect(_audioCtx.destination);
			} catch (e) {
				console.debug('AudioPlayer: WebAudio init failed', e);
			}

			// notify parent that audio element and analyser are ready
			// dispatch asynchronously to avoid parent updating state during mount/render
			queueMicrotask(() => {
				console.debug('AudioPlayer: dispatching ready (microtask)', { audioRef });
				dispatch('ready', { audio: audioRef, analyser: _analyser, audioCtx: _audioCtx });
			});

			// Additional safety: dispatch again shortly after to handle timing/binding races
			setTimeout(() => {
				console.debug('AudioPlayer: dispatching ready (timeout)', { audioRef });
				queueMicrotask(() =>
					dispatch('ready', { audio: audioRef, analyser: _analyser, audioCtx: _audioCtx })
				);
			}, 60);

			initialized = true;
		}

		init();

		return () => {
			if (rafId) cancelAnimationFrame(rafId);
			if (initialized) cleanupAll();
		};
	});

	function togglePlay() {
		if (!audioRef) return;
		if (isPlaying) {
			audioRef.pause();
			isPlaying = false;
		} else {
			// If source is different or not set, set it
			if (audioRef.src !== songUrl) {
				audioRef.src = songUrl;
			}
			// Try to resume audio context before playing (handles autoplay policy)
			if (_audioCtx && _audioCtx.state === 'suspended') {
				_audioCtx
					.resume()
					.then(() => {
						console.debug('AudioPlayer: audioCtx resumed');
						return audioRef.play();
					})
					.then(() => {
						isPlaying = true;
					})
					.catch((err) => {
						console.debug('AudioPlayer: play failed', err);
						isPlaying = false;
					});
			} else {
				audioRef
					.play()
					.then(() => {
						isPlaying = true;
					})
					.catch((err) => {
						console.debug('AudioPlayer: play failed', err);
						isPlaying = false;
					});
			}
		}
	}

	// Autoplay when songUrl changes
	$effect(() => {
		if (!audioRef) return;
		if (songUrl) {
			// update source and play
			if (audioRef.src !== songUrl) {
				audioRef.src = songUrl;
				audioRef.currentTime = 0;
			}
			audioRef
				.play()
				.then(() => {
					isPlaying = true;
				})
				.catch(() => {
					isPlaying = false;
				});
		} else {
			// no song
			audioRef.pause();
			isPlaying = false;
			currentTime = 0;
		}
	});

	function seekTo(percent) {
		if (!audioRef || !duration) return;
		audioRef.currentTime = percent * duration;
	}
</script>

<div class="w-full max-w-md rounded-md bg-white/80 p-3">
	<div class="flex items-center justify-between">
		<div>
			<div class="font-condensed text-[16px] font-semibold">{title}</div>
			<div class="text-sm text-gray-500">{Math.floor(currentTime)} / {Math.floor(duration)}s</div>
		</div>

		<button
			class="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
			onclick={togglePlay}
			aria-pressed={isPlaying}
			aria-label={isPlaying ? 'Pause' : 'Play'}
		>
			{#if isPlaying}
				<!-- Pause icon -->
				<svg class="h-6 w-6 text-black" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<rect x="6" y="5" width="4" height="14" rx="1"></rect>
					<rect x="14" y="5" width="4" height="14" rx="1"></rect>
				</svg>
			{:else}
				<!-- Play icon -->
				<svg class="h-6 w-6 text-black" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M5 3v18l15-9L5 3z" />
				</svg>
			{/if}
		</button>
	</div>

	<!-- Progress bar -->
	<div class="mt-3">
		<div
			class="h-2 w-full cursor-pointer rounded bg-gray-200"
			role="slider"
			tabindex="0"
			aria-label="Seek"
			aria-valuemin="0"
			aria-valuemax="100"
			aria-valuenow={Math.round(duration ? (currentTime / duration) * 100 : 0)}
			onclick={(e) => {
				const rect = e.currentTarget.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const pct = Math.min(Math.max(x / rect.width, 0), 1);
				seekTo(pct);
			}}
			onkeydown={(e) => {
				if (!audioRef || !duration) return;
				if (e.key === 'ArrowLeft') {
					seekTo(Math.max((currentTime - 5) / duration, 0));
					e.preventDefault();
				} else if (e.key === 'ArrowRight') {
					seekTo(Math.min((currentTime + 5) / duration, 1));
					e.preventDefault();
				} else if (e.key === 'Home') {
					seekTo(0);
					e.preventDefault();
				} else if (e.key === 'End') {
					seekTo(1);
					e.preventDefault();
				} else if (e.key === 'Enter' || e.key === ' ') {
					// Toggle play/pause on Enter/Space
					togglePlay();
					e.preventDefault();
				}
			}}
		>
			<div
				class="h-2 rounded bg-black"
				style="width: {duration ? (currentTime / duration) * 100 : 0}%"
			></div>
		</div>
	</div>

	<!-- Hidden audio element bound for control -->
	<audio bind:this={audioRef} class="hidden" preload="metadata"></audio>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900&display=swap');
	.font-condensed {
		font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif;
	}
</style>

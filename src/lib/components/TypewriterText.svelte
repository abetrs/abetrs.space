<script>
	// Props with defaults using Svelte 5 syntax
	let {
		text = '',
		speed = 1,
		delay = 0,
		cursor = true,
		loop = false,
		onComplete = null,
		onClickComplete = null
	} = $props();

	// Svelte 5 runes for state management
	let displayText = $state('');
	let currentIndex = $state(0);
	let isComplete = $state(false);
	let showCursor = $state(true);
	let timeoutId = $state(null);
	let cursorIntervalId = $state(null);

	// Derived state for cursor visibility
	let cursorDisplay = $derived(cursor && showCursor ? '|' : '');

	// Effect to start typing animation
	$effect(() => {
		if (text && currentIndex < text.length) {
			timeoutId = setTimeout(
				() => {
					displayText = text.slice(0, currentIndex + 1);
					currentIndex++;
				},
				currentIndex === 0 ? delay : speed
			);
		} else if (currentIndex >= text.length && !isComplete) {
			isComplete = true;
			if (onComplete) queueMicrotask(() => onComplete());

			if (loop) {
				setTimeout(() => {
					reset();
				}, 250);
			}
		}

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	});

	// Effect for cursor blinking
	$effect(() => {
		if (cursor) {
			cursorIntervalId = setInterval(() => {
				showCursor = !showCursor;
			}, 500);
		}

		return () => {
			if (cursorIntervalId) clearInterval(cursorIntervalId);
		};
	});

	function reset() {
		displayText = '';
		currentIndex = 0;
		isComplete = false;
		showCursor = true;
	}

	function complete() {
		if (!isComplete) {
			displayText = text;
			currentIndex = text.length;
			isComplete = true;
			if (onComplete) queueMicrotask(() => onComplete());
			if (onClickComplete) queueMicrotask(() => onClickComplete());
			// Clear any pending timeouts
			if (timeoutId) {
				clearTimeout(timeoutId);
				timeoutId = null;
			}
		}
	}

	// Expose functions for external use
	$effect(() => {
		return { reset, complete };
	});
</script>

<span
	class="typewriter-text cursor-pointer"
	role="button"
	tabindex="0"
	onclick={complete}
	onkeydown={(e) => (e.key === 'Enter' || e.key === ' ' ? complete() : null)}
>
	{displayText}<span class="animate-pulse text-black">{cursorDisplay}</span>
</span>

<style>
	.typewriter-text {
		/* Inherit font styling from parent instead of forcing condensed */
		font-family: inherit;
	}
</style>

<script>
	// Props with defaults using Svelte 5 syntax
	let {
		text = '',
		speed = 100,
		delay = 0,
		cursor = true,
		loop = false,
		onComplete = null
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
			if (onComplete) onComplete();

			if (loop) {
				setTimeout(() => {
					reset();
				}, 2000);
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

	// Expose reset function for external use
	$effect(() => {
		return { reset };
	});
</script>

<span class="font-condensed">
	{displayText}<span class="animate-pulse text-black">{cursorDisplay}</span>
</span>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

	.font-condensed {
		font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif;
	}
</style>

// Composable for scroll-to-next-page functionality
// Follows Svelte 5 best practices proper browser checks

import {
	getNextPagePath,
	getPreviousPagePath,
	setScrollTransitionActive,
	updateScrollPosition,
	updateScrollDelta,
	updateScrollDuration
} from '$lib/stores/navigation.svelte.js';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { get } from 'svelte/store';

export function useScrollToNext() {
	let containerRef = null;
	let isAtBottom = false;
	let isAtTop = false; // Track if at top for scroll-up functionality
	let accumulatedScroll = 0;
	let accumulatedScrollUp = 0; // Track upward scroll
	let transitionStarted = false;
	let lastScrollTime = 0;
	let bottomReachedTime = 0; // Track when user first reached bottom
	let topReachedTime = 0; // Track when user first reached top
	let continuousScrollTime = 0; // Track continuous scroll duration
	let continuousScrollUpTime = 0; // Track continuous scroll up duration

	// Constants for scroll behavior
	const SCROLL_DEBOUNCE = 16; // ~60fps
	const TRANSITION_THRESHOLD = 150; // pixels to scroll after bottom (back to original)
	const TRANSITION_DURATION = 200; // ms for smooth transition
	const REQUIRED_SCROLL_DURATION = 1000; // 1 second (much more sensitive)

	function handleScroll() {
		if (typeof window === 'undefined') return;

		const now = Date.now();
		if (now - lastScrollTime < SCROLL_DEBOUNCE) return;
		lastScrollTime = now;

		const { scrollTop } = document.documentElement;
		const currentScrollY = scrollTop;
		const windowHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight;

		// Check if we've scrolled to the bottom of the page
		const isComponentAtBottom = scrollTop + windowHeight >= documentHeight - 10; // 10px tolerance
		// Check if we've scrolled to the top of the page
		const isComponentAtTop = scrollTop <= 10; // 10px tolerance

		// Handle bottom detection for scroll-down
		if (isComponentAtBottom && !isAtBottom) {
			isAtBottom = true;
			accumulatedScroll = 0;
			transitionStarted = false;
			bottomReachedTime = now; // Record when we first reached bottom
			continuousScrollTime = 0;
			console.log('✅ Reached bottom, listening for wheel events');
			// Reset top state
			isAtTop = false;
			accumulatedScrollUp = 0;
			topReachedTime = 0;
			continuousScrollUpTime = 0;
		} else if (!isComponentAtBottom && isAtBottom) {
			// Reset if user scrolls back up from bottom
			isAtBottom = false;
			accumulatedScroll = 0;
			transitionStarted = false;
			bottomReachedTime = 0;
			continuousScrollTime = 0;
			setScrollTransitionActive(false);
			console.log('❌ Left bottom');
		}

		// Handle top detection for scroll-up
		if (isComponentAtTop && !isAtTop) {
			isAtTop = true;
			accumulatedScrollUp = 0;
			transitionStarted = false;
			topReachedTime = now; // Record when we first reached top
			continuousScrollUpTime = 0;
			console.log('✅ Reached top, listening for wheel events');
			// Reset bottom state
			isAtBottom = false;
			accumulatedScroll = 0;
			bottomReachedTime = 0;
			continuousScrollTime = 0;
		} else if (!isComponentAtTop && isAtTop) {
			// Reset if user scrolls down from top
			isAtTop = false;
			accumulatedScrollUp = 0;
			transitionStarted = false;
			topReachedTime = 0;
			continuousScrollUpTime = 0;
			setScrollTransitionActive(false);
			console.log('❌ Left top');
		}

		updateScrollPosition(currentScrollY);
	}

	function handleWheel(event) {
		if (typeof window === 'undefined') return;

		const now = Date.now();

		// Handle wheel events when at bottom (scroll down to go next)
		if (isAtBottom && !transitionStarted) {
			if (event.deltaY > 0) {
				// Scrolling down
				continuousScrollTime = now - bottomReachedTime;
				accumulatedScroll += Math.abs(event.deltaY);
				updateScrollDelta(accumulatedScroll);
				updateScrollDuration(continuousScrollTime);

				console.log('🔄 Scroll down at bottom:', { accumulatedScroll, continuousScrollTime });

				// Visual feedback
				if (accumulatedScroll > 50) {
					setScrollTransitionActive(true);
				}

				// Trigger transition
				if (
					accumulatedScroll >= TRANSITION_THRESHOLD &&
					continuousScrollTime >= REQUIRED_SCROLL_DURATION
				) {
					console.log('🚀 Triggering next page transition');
					triggerTransition('next');
				}
			} else {
				// Reset on scroll up
				accumulatedScroll = Math.max(0, accumulatedScroll - Math.abs(event.deltaY));
				updateScrollDelta(accumulatedScroll);
				if (accumulatedScroll < 25) {
					setScrollTransitionActive(false);
				}
			}
		}

		// Handle wheel events when at top (scroll up to go previous)
		if (isAtTop && !transitionStarted) {
			if (event.deltaY < 0) {
				// Scrolling up
				continuousScrollUpTime = now - topReachedTime;
				accumulatedScrollUp += Math.abs(event.deltaY);
				updateScrollDelta(accumulatedScrollUp);
				updateScrollDuration(continuousScrollUpTime);

				console.log('🔄 Scroll up at top:', { accumulatedScrollUp, continuousScrollUpTime });

				// Visual feedback
				if (accumulatedScrollUp > 50) {
					setScrollTransitionActive(true);
				}

				// Trigger transition
				if (
					accumulatedScrollUp >= TRANSITION_THRESHOLD &&
					continuousScrollUpTime >= REQUIRED_SCROLL_DURATION
				) {
					console.log('🚀 Triggering previous page transition');
					triggerTransition('previous');
				}
			} else {
				// Reset on scroll down
				accumulatedScrollUp = Math.max(0, accumulatedScrollUp - Math.abs(event.deltaY));
				updateScrollDelta(accumulatedScrollUp);
				if (accumulatedScrollUp < 25) {
					setScrollTransitionActive(false);
				}
			}
		}
	}

	function triggerTransition(direction = 'next') {
		if (transitionStarted) return;

		transitionStarted = true;
		setScrollTransitionActive(false);

		const currentPath = get(page).url.pathname;
		const targetPath =
			direction === 'next' ? getNextPagePath(currentPath) : getPreviousPagePath(currentPath);

		if (targetPath) {
			// Smooth transition with custom animation
			document.body.style.transition = `opacity ${TRANSITION_DURATION}ms ease-in-out`;
			document.body.style.opacity = '0.7';

			setTimeout(() => {
				goto(targetPath).then(() => {
					// Reset scroll position to appropriate location
					if (typeof window !== 'undefined') {
						if (direction === 'next') {
							window.scrollTo({ top: 0, behavior: 'smooth' });
						} else {
							// For previous page, scroll to bottom to show continuation
							setTimeout(() => {
								window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
							}, 100);
						}
					}

					// Restore opacity
					setTimeout(() => {
						document.body.style.opacity = '1';
						setTimeout(() => {
							document.body.style.transition = '';
						}, 100);
					}, 100);
				});
			}, TRANSITION_DURATION / 2);
		}
	}

	// Initialize scroll listener with lifecycle management
	function initScrollListener() {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll, { passive: true });
			window.addEventListener('wheel', handleWheel, { passive: true });
			updateScrollPosition(window.scrollY);
		}
	}

	function destroyScrollListener() {
		if (typeof window !== 'undefined') {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('wheel', handleWheel);
			// Clean up any ongoing transition styles
			if (document.body.style.transition) {
				document.body.style.transition = '';
				document.body.style.opacity = '';
			}
		}
	}

	return {
		containerRef: {
			get value() {
				return containerRef;
			},
			set value(ref) {
				containerRef = ref;
			}
		},
		get isAtBottom() {
			return isAtBottom;
		},
		get accumulatedScroll() {
			return accumulatedScroll;
		},
		get transitionStarted() {
			return transitionStarted;
		},
		get scrollThreshold() {
			return TRANSITION_THRESHOLD;
		},
		initScrollListener,
		destroyScrollListener
	};
}

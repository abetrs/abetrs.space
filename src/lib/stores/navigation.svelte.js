// Navigation store for smooth scroll-to-next-page functionality
// Uses Svelte 5 runes for reactive state management

// Navigation items in order
export const navItems = [
	{ name: 'Bio', path: '/' },
	{ name: 'Internships', path: '/internships' },
	{ name: 'Projects', path: '/projects' },
	{ name: 'College', path: '/college' },
	{ name: 'Hobbies', path: '/hobbies' },
	{ name: 'Blog', path: '/blog' }
];

// State for tracking scroll-to-next behavior
let scrollTransitionActive = $state(false);
let lastScrollY = $state(0);
let scrollDelta = $state(0);
let scrollDuration = $state(0); // Track scroll duration in milliseconds

export function getScrollTransitionState() {
	return {
		get active() {
			return scrollTransitionActive;
		},
		get lastScrollY() {
			return lastScrollY;
		},
		get scrollDelta() {
			return scrollDelta;
		},
		get scrollDuration() {
			return scrollDuration;
		}
	};
}

export function setScrollTransitionActive(active) {
	scrollTransitionActive = active;
}

export function updateScrollPosition(y) {
	lastScrollY = y;
}

export function updateScrollDelta(delta) {
	scrollDelta = delta;
}

export function updateScrollDuration(duration) {
	scrollDuration = duration;
}

// Get next page path based on current path
export function getNextPagePath(currentPath) {
	const currentIndex = navItems.findIndex((item) => item.path === currentPath);
	if (currentIndex >= 0 && currentIndex < navItems.length - 1) {
		return navItems[currentIndex + 1].path;
	}
	return null; // No next page (already on last page)
}

// Get previous page path based on current path
export function getPreviousPagePath(currentPath) {
	const currentIndex = navItems.findIndex((item) => item.path === currentPath);
	if (currentIndex > 0) {
		return navItems[currentIndex - 1].path;
	}
	return null; // No previous page (already on first page)
}

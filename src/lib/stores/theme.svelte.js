import { browser } from '$app/environment';

// Svelte 5 rune-based theme store
function createThemeStore() {
	let currentTheme = $state('light');
	let systemPreference = $state('light');

	// Initialize theme from localStorage (only in browser)
	if (browser) {
		const saved = localStorage.getItem('theme');
		if (saved && ['light', 'dark', 'auto'].includes(saved)) {
			currentTheme = saved;
		}
	}

	// Derived theme that respects auto setting
	let activeTheme = $derived(() => {
		if (currentTheme === 'auto') {
			return systemPreference;
		}
		return currentTheme;
	});

	function setTheme(theme) {
		currentTheme = theme;
		if (browser) {
			localStorage.setItem('theme', theme);
		}
	}

	function toggleTheme() {
		setTheme(activeTheme === 'light' ? 'dark' : 'light');
	}

	// Initialize system preference and set up listeners (to be called from component)
	function initializeTheme() {
		if (browser && typeof window !== 'undefined' && window.matchMedia) {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			systemPreference = mediaQuery.matches ? 'dark' : 'light';

			// Listen for changes
			const handleChange = (e) => {
				systemPreference = e.matches ? 'dark' : 'light';
			};

			mediaQuery.addEventListener('change', handleChange);

			return () => mediaQuery.removeEventListener('change', handleChange);
		}
	}

	// Apply theme to document (to be called from component)
	function applyTheme() {
		if (browser && typeof document !== 'undefined' && document.documentElement) {
			document.documentElement.setAttribute('data-theme', activeTheme);
			document.documentElement.classList.toggle('dark', activeTheme === 'dark');
		}
	}

	return {
		get current() {
			return currentTheme;
		},
		get active() {
			return activeTheme;
		},
		get system() {
			return systemPreference;
		},
		setTheme,
		toggleTheme,
		initializeTheme,
		applyTheme
	};
}

export const themeStore = createThemeStore();

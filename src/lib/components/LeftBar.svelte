<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { navItems } from '$lib/stores/navigation.svelte.js';

	// Svelte 5 runes for reactive state
	let isCollapsed = $state(true); // Start collapsed by default
	let isMobile = $state(false);
	let expandedDropdowns = $state(new Set()); // Track which dropdowns are expanded

	// Derived reactive value for current path
	let currentPath = $derived($page.url.pathname);

	// Define dropdown sections for specific pages
	const pageDropdowns = {
		'/internships': [
			{
				label: 'Black Pearl Global Investments',
				anchor: '#company-black-pearl-global-investments'
			},
			{ label: 'Deloitte', anchor: '#company-deloitte' },
			{ label: 'TCS', anchor: '#company-tcs' }
		],
		'/projects': [
			{ label: 'SpleenToTextBot', anchor: '#story-spleen-to-text-bot' },
			{ label: 'AI-Powered Due Diligence Framework', anchor: '#story-black-pearl-ai' },
			{ label: 'Itch - Playlist Exchange', anchor: '#story-playlist-exchange' },
			{ label: 'Data Editor at The Flat Hat', anchor: '#story-flat-hat-data-editor' },
			{ label: 'TCS Lithium Battery UX Prototype', anchor: '#story-tcs-lithium-ux' },
			{ label: 'International Mini Market', anchor: '#story-international-mini-mart' }
		],
		'/hobbies': [
			{ label: 'Music', anchor: '#music-section' },
			{ label: 'Film', anchor: '#film-section' },
			{ label: 'Photography', anchor: '#photography-section' }
		]
	};

	function handleNavigation(path) {
		goto(path);
		// Auto-collapse on mobile after navigation
		if (isMobile) {
			isCollapsed = true;
		}
	}

	function handleSectionJump(anchor) {
		// Remove # from anchor if present
		const elementId = anchor.startsWith('#') ? anchor.slice(1) : anchor;
		const element = document.getElementById(elementId);
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
				inline: 'nearest'
			});
		}
		// Auto-collapse on mobile after section jump
		if (isMobile) {
			isCollapsed = true;
		}
	}

	function toggleDropdown(path) {
		const newExpanded = new Set(expandedDropdowns);
		if (newExpanded.has(path)) {
			newExpanded.delete(path);
		} else {
			newExpanded.add(path);
		}
		expandedDropdowns = newExpanded;
	}

	function toggleSidebar() {
		isCollapsed = !isCollapsed;
	}

	function checkScreenSize() {
		if (typeof window !== 'undefined') {
			isMobile = window.innerWidth < 1024; // lg breakpoint
			// Auto-expand on desktop, auto-collapse on mobile
			if (isMobile) {
				isCollapsed = true;
			} else {
				isCollapsed = false;
			}
		}
	}

	// Effect for handling screen size changes
	$effect(() => {
		if (typeof window !== 'undefined') {
			checkScreenSize();
			window.addEventListener('resize', checkScreenSize);

			return () => {
				window.removeEventListener('resize', checkScreenSize);
			};
		}
	});

	// Initialize on mount
	onMount(() => {
		checkScreenSize();
	});
</script>

<!-- Toggle Button (visible when collapsed or on mobile) -->
{#if isCollapsed || isMobile}
	<button
		class="fixed top-[110px] left-4 z-[60] rounded-lg border border-gray-300 bg-white p-2 shadow-md transition-colors duration-200 hover:bg-gray-50"
		onclick={toggleSidebar}
		aria-label="Toggle navigation menu"
	>
		<svg class="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16M4 18h16"
			></path>
		</svg>
	</button>
{/if}

<!-- Left Sidebar Navigation -->
<nav
	class="fixed top-[100px] left-0 z-40 h-[calc(100vh-100px)] w-[200px] bg-gray-50 px-6 py-8 shadow-lg transition-transform duration-300 ease-in-out
	{isCollapsed ? '-translate-x-full' : 'translate-x-0'}"
>
	<!-- Close button (visible when expanded on mobile) -->
	{#if !isCollapsed && isMobile}
		<button
			class="absolute top-4 right-4 rounded-lg border border-gray-300 bg-white p-1 shadow-sm transition-colors duration-200 hover:bg-gray-50"
			onclick={toggleSidebar}
			aria-label="Close navigation menu"
		>
			<svg class="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				></path>
			</svg>
		</button>
	{/if}

	<ul class="mt-8 space-y-6">
		{#each navItems as item}
			<li>
				<!-- Main navigation item -->
				<button
					class="hover:bg-opacity-50 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left font-mono text-[15px] font-medium text-black transition-colors duration-200 hover:bg-gray-100
						{currentPath === item.path ? 'bg-opacity-40 bg-gray-200' : ''}"
					onclick={() => {
						// Always navigate to the page first
						handleNavigation(item.path);

						// Close all dropdowns first, then expand only the current one if it has dropdown
						setTimeout(() => {
							if (pageDropdowns[item.path]) {
								// Set only this dropdown as expanded (closes all others)
								expandedDropdowns = new Set([item.path]);
							} else {
								// Close all dropdowns if this page doesn't have one
								expandedDropdowns = new Set();
							}
						}, 100);
					}}
				>
					<span>{item.name}</span>
					<span
						class="text-[16px] text-gray-600 transition-transform duration-200 {pageDropdowns[
							item.path
						] && expandedDropdowns.has(item.path)
							? 'rotate-90'
							: ''}"
					>
						›
					</span>
				</button>

				<!-- Dropdown sections -->
				{#if pageDropdowns[item.path] && expandedDropdowns.has(item.path)}
					<div class="ml-4 space-y-1" transition:fade={{ duration: 200 }}>
						{#each pageDropdowns[item.path] as section}
							<button
								class="hover:bg-opacity-50 flex w-full items-start rounded-md px-2 py-1 text-left font-mono text-[12px] text-gray-700 transition-colors duration-200 hover:bg-gray-100"
								onclick={() => handleSectionJump(section.anchor)}
							>
								{section.label}
							</button>
						{/each}
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</nav>

<!-- Glass backdrop effect when sidebar is open on mobile -->
{#if !isCollapsed && isMobile}
	<div
		class="pointer-events-none fixed inset-0 z-20 bg-white/10 backdrop-blur-sm"
		transition:fade={{ duration: 300 }}
	></div>
{/if}

<style>
	/* Use Roboto Mono for navigation */
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

	.font-mono {
		font-family: 'Roboto Mono', 'Courier New', monospace;
	}
</style>

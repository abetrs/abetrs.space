<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import resumePdf from '$lib/assets/AbhaypradJhaResume.pdf';

	// Social and resume links with SVG icons
	const socialLinks = [
		{ 
			name: 'Blog', 
			url: 'https://abetheunicorn.substack.com',
			iconType: 'substack'
		},
		{ 
			name: 'LinkedIn', 
			url: 'https://www.linkedin.com/in/abhayprad-jha-b12390223/',
			iconType: 'linkedin'
		},
		{ 
			name: 'GitHub', 
			url: 'https://github.com/abetrs',
			iconType: 'github'
		},
		{ 
			name: 'Resume', 
			url: resumePdf,
			iconType: 'resume'
		}
	];

	// Svelte 5 runes for reactive state
	let isCollapsed = $state(true); // Start collapsed by default
	let isMobile = $state(false);

	// Function to get SVG icon for each type
	function getIcon(iconType) {
		switch (iconType) {
			case 'substack':
				return `
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
					</svg>
				`;
			case 'linkedin':
				return `
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
					</svg>
				`;
			case 'github':
				return `
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
					</svg>
				`;
			case 'resume':
				return `
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
					</svg>
				`;
			default:
				return '';
		}
	}

	function handleLinkClick(url) {
		if (url.endsWith('.pdf')) {
			// For resume, open in new tab
			window.open(url, '_blank');
		} else {
			// For external links, open in new tab
			window.open(url, '_blank', 'noopener,noreferrer');
		}
		
		// Auto-collapse on mobile after click
		if (isMobile) {
			isCollapsed = true;
		}
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
		class="fixed top-[110px] right-4 z-[60] rounded-lg border border-gray-300 bg-white p-2 shadow-md transition-colors duration-200 hover:bg-gray-50"
		onclick={toggleSidebar}
		aria-label="Toggle social links menu"
	>
		<svg class="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
			></path>
		</svg>
	</button>
{/if}

<!-- Right Sidebar Social Links -->
<nav
	class="fixed top-[100px] right-0 z-40 h-[calc(100vh-100px)] w-[200px] bg-gray-50 px-6 py-8 transition-transform duration-300 ease-in-out
	{isCollapsed ? 'translate-x-full' : 'translate-x-0'}"
>
	<!-- Close button (visible when expanded on mobile) -->
	{#if !isCollapsed && isMobile}
		<button
			class="absolute top-4 left-4 rounded-lg border border-gray-300 bg-white p-1 shadow-sm transition-colors duration-200 hover:bg-gray-50"
			onclick={toggleSidebar}
			aria-label="Close social links menu"
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
		{#each socialLinks as link}
			<li>
				<button
					class="group hover:bg-opacity-50 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left font-mono text-[15px] font-medium text-black transition-colors duration-200 hover:bg-gray-100"
					onclick={() => handleLinkClick(link.url)}
				>
					<span class="flex items-center gap-3">
						<span class="text-gray-700 group-hover:text-black transition-colors duration-200">
							{@html getIcon(link.iconType)}
						</span>
						<span>{link.name}</span>
					</span>
					<span class="text-[16px] text-gray-600 group-hover:text-black transition-colors duration-200">↗</span>
				</button>
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
	/* Use Roboto Mono for navigation - matching LeftBar */
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

	.font-mono {
		font-family: 'Roboto Mono', 'Courier New', monospace;
	}
</style>

<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	// Navigation items matching Figma design
	const navItems = [
		{ name: 'Bio', path: '/' },
		{ name: 'Internships', path: '/internships' },
		{ name: 'Projects', path: '/projects' },
		{ name: 'College', path: '/college' },
		{ name: 'Hobbies', path: '/hobbies' },
		{ name: 'Blog', path: '/blog' }
	];

	let isCollapsed = false;
	let isMobile = false;

	function handleNavigation(path) {
		goto(path);
		// Auto-collapse on mobile after navigation
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
			// Auto-collapse on mobile
			if (isMobile && !isCollapsed) {
				isCollapsed = true;
			}
		}
	}

	onMount(() => {
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		
		return () => {
			window.removeEventListener('resize', checkScreenSize);
		};
	});

	$: currentPath = $page.url.pathname;
</script>

<!-- Toggle Button (visible when collapsed or on mobile) -->
{#if isCollapsed || isMobile}
	<button
		class="fixed left-4 top-[110px] z-[60] bg-white border border-gray-300 rounded-lg p-2 shadow-md hover:bg-gray-50 transition-colors duration-200"
		on:click={toggleSidebar}
		aria-label="Toggle navigation menu"
	>
		<svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
		</svg>
	</button>
{/if}

<!-- Left Sidebar Navigation -->
<nav class="fixed left-0 top-[100px] w-[200px] h-[calc(100vh-100px)] bg-gray-50 px-6 py-8 z-50 transition-transform duration-300 ease-in-out shadow-lg
	{isCollapsed ? '-translate-x-full' : 'translate-x-0'}">
	
	<!-- Close button (visible when expanded on mobile) -->
	{#if !isCollapsed && isMobile}
		<button
			class="absolute top-4 right-4 bg-white border border-gray-300 rounded-lg p-1 shadow-sm hover:bg-gray-50 transition-colors duration-200"
			on:click={toggleSidebar}
			aria-label="Close navigation menu"
		>
			<svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
			</svg>
		</button>
	{/if}

	<ul class="space-y-6 mt-8">
		{#each navItems as item}
			<li>
				<button
					class="w-full flex items-center justify-between text-left text-[15px] font-medium text-black hover:bg-gray-100 hover:bg-opacity-50 px-3 py-2 rounded-lg transition-colors duration-200 font-mono
					{currentPath === item.path ? 'bg-gray-200 bg-opacity-40' : ''}"
					on:click={() => handleNavigation(item.path)}
				>
					<span>{item.name}</span>
					<span class="text-[16px] text-gray-600">›</span>
				</button>
			</li>
		{/each}
	</ul>
</nav>

<!-- Glass backdrop effect when sidebar is open on mobile -->
{#if !isCollapsed && isMobile}
	<div 
		class="fixed inset-0 backdrop-blur-sm bg-white/10 z-20 pointer-events-none"
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

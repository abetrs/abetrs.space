<script>
	import { scale, fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// Svelte 5 props destructuring with defaults
	let { 
		items = [], 
		title = 'Gallery', 
		columns = 2, 
		showModal = true,
		showFilter = true,
		className = ''
	} = $props();

	// Reactive state using Svelte 5 runes
	let selectedCategory = $state('all');
	let selectedItem = $state(null);
	let isVisible = $state(true); // Start visible for immediate rendering
	let containerRef = $state(null);

	// Use regular functions instead of complex $derived to avoid reactivity issues
	function getCategories(items) {
		if (!items || items.length === 0) return ['all'];
		const cats = new Set(items.map(item => item.category).filter(Boolean));
		return ['all', ...Array.from(cats)];
	}

	function getFilteredItems(items, category) {
		if (!items || items.length === 0) return [];
		if (category === 'all') return items;
		return items.filter(item => item.category === category);
	}

	// Intersection Observer for scroll animations
	$effect(() => {
		if (containerRef && browser) {
			const observer = new IntersectionObserver(
				([entry]) => {
					isVisible = entry.isIntersecting;
				},
				{ threshold: 0.2 }
			);
			observer.observe(containerRef);
			return () => observer.disconnect();
		}
	});

	// Modal controls
	function openModal(item) {
		if (showModal) {
			selectedItem = item;
		}
	}

	function closeModal() {
		selectedItem = null;
	}

	// Handle keyboard navigation
	function handleKeydown(event) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}

	// Get responsive grid classes based on columns prop
	function getGridClasses(cols) {
		const gridMap = {
			1: 'grid-cols-1',
			2: 'grid-cols-1 md:grid-cols-2',
			3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
			4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
		};
		return gridMap[cols] || gridMap[2];
	}

	// Get current data
	let categories = $derived(getCategories(items));
	let filteredItems = $derived(getFilteredItems(items, selectedCategory));
</script>

<svelte:window on:keydown={handleKeydown} />

<div bind:this={containerRef} class="w-full {className}">
	<!-- Gallery Header -->
	{#if title}
		<div class="mb-8 text-center">
			<h2 class="text-3xl font-bold tracking-tight text-gray-900 mb-2">
				{title}
			</h2>
		</div>
	{/if}

	<!-- Category Filter -->
	{#if showFilter && categories.length > 1}
		<div class="mb-8 flex flex-wrap justify-center gap-2">
			{#each categories as category, index}
				<button
					class="px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full border-2
						{selectedCategory === category 
							? 'bg-black text-white border-black' 
							: 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'}"
					onclick={() => selectedCategory = category}
					in:scale={{ delay: index * 50, duration: 300, easing: quintOut }}
				>
					{category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
				</button>
			{/each}
		</div>
	{/if}

	<!-- Gallery Grid -->
	{#if filteredItems.length > 0}
		<div class="grid {getGridClasses(columns)} gap-6">
			{#each filteredItems as item, index}
				<div
					class="group cursor-pointer"
					onclick={() => openModal(item)}
					in:fly={{ 
						y: 50, 
						delay: index * 100, 
						duration: 600, 
						easing: quintOut 
					}}
				>
					<!-- Item Card -->
					<div class="bg-white rounded-lg border border-gray-200 overflow-hidden 
						shadow-sm hover:shadow-lg transition-all duration-300 
						group-hover:border-gray-300 group-hover:scale-[1.02]">
						
						<!-- Item Image -->
						{#if item.image}
							<div class="aspect-[4/3] overflow-hidden">
								<img 
									src={item.image} 
									alt={item.title || 'Gallery item'}
									class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
									loading="lazy"
								/>
							</div>
						{:else}
							<!-- Placeholder for items without images -->
							<div class="aspect-[4/3] bg-gray-100 flex items-center justify-center">
								<div class="text-center text-gray-400">
									<div class="text-4xl mb-2">📷</div>
									<p class="text-sm">No image</p>
								</div>
							</div>
						{/if}

						<!-- Item Content -->
						<div class="p-4">
							{#if item.title}
								<h3 class="font-semibold text-gray-900 mb-2 line-clamp-2">
									{item.title}
								</h3>
							{/if}

							{#if item.description}
								<p class="text-gray-600 text-sm mb-3 line-clamp-3">
									{item.description}
								</p>
							{/if}

							<!-- Tags -->
							{#if item.tags && item.tags.length > 0}
								<div class="flex flex-wrap gap-1 mb-3">
									{#each item.tags.slice(0, 3) as tag}
										<span class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
											{tag}
										</span>
									{/each}
									{#if item.tags.length > 3}
										<span class="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-full">
											+{item.tags.length - 3}
										</span>
									{/if}
								</div>
							{/if}

							<!-- Category Badge -->
							{#if item.category && showFilter}
								<div class="flex justify-between items-center">
									<span class="px-2 py-1 text-xs bg-black text-white rounded-full">
										{item.category}
									</span>
									{#if showModal}
										<span class="text-xs text-gray-400">Click for details</span>
									{/if}
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<!-- Empty State -->
		<div class="text-center py-12" in:fade={{ duration: 300 }}>
			<div class="text-gray-400 mb-4">
				<div class="text-6xl mb-4">🔍</div>
				<p class="text-lg font-medium">No items found</p>
				<p class="text-sm">Try selecting a different category</p>
			</div>
		</div>
	{/if}
</div>

<!-- Modal -->
{#if showModal && selectedItem}
	<div 
		class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
		onclick={closeModal}
		in:fade={{ duration: 200 }}
		out:fade={{ duration: 200 }}
	>
		<div 
			class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
			onclick={(e) => e.stopPropagation()}
			in:scale={{ duration: 300, easing: quintOut }}
			out:scale={{ duration: 200, easing: quintOut }}
		>
			<!-- Modal Header -->
			<div class="flex justify-between items-center p-6 border-b border-gray-200">
				<h3 class="text-xl font-semibold text-gray-900">
					{selectedItem.title || 'Details'}
				</h3>
				<button 
					onclick={closeModal}
					class="text-gray-400 hover:text-gray-600 transition-colors"
					aria-label="Close modal"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
			</div>

			<!-- Modal Content -->
			<div class="p-6">
				<!-- Modal Image -->
				{#if selectedItem.image}
					<div class="mb-6">
						<img 
							src={selectedItem.image} 
							alt={selectedItem.title || 'Gallery item'}
							class="w-full h-auto rounded-lg"
						/>
					</div>
				{/if}

				<!-- Modal Description -->
				{#if selectedItem.description}
					<div class="mb-6">
						<p class="text-gray-700 leading-relaxed">
							{selectedItem.description}
						</p>
					</div>
				{/if}

				<!-- Modal Details -->
				{#if selectedItem.details}
					<div class="mb-6">
						<h4 class="font-semibold text-gray-900 mb-2">Details</h4>
						<p class="text-gray-600 leading-relaxed">
							{selectedItem.details}
						</p>
					</div>
				{/if}

				<!-- Modal Tags -->
				{#if selectedItem.tags && selectedItem.tags.length > 0}
					<div class="mb-6">
						<h4 class="font-semibold text-gray-900 mb-2">Tags</h4>
						<div class="flex flex-wrap gap-2">
							{#each selectedItem.tags as tag}
								<span class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
									{tag}
								</span>
							{/each}
						</div>
					</div>
				{/if}

				<!-- Modal Links -->
				{#if selectedItem.links && selectedItem.links.length > 0}
					<div class="mb-6">
						<h4 class="font-semibold text-gray-900 mb-3">Links</h4>
						<div class="space-y-2">
							{#each selectedItem.links as link}
								<a 
									href={link.url} 
									target="_blank" 
									rel="noopener noreferrer"
									class="inline-flex items-center px-4 py-2 text-sm font-medium 
										text-white bg-black rounded-lg hover:bg-gray-800 
										transition-colors mr-2"
								>
									{link.label}
									<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
									</svg>
								</a>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>

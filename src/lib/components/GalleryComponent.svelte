<script>
	import { scale, fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	// Props using Svelte 5 destructuring
	let { 
		items = [],
		title = "Gallery",
		columns = 2,
		showModal = true 
	} = $props();

	// Svelte 5 reactive state
	let isVisible = $state(false);
	let selectedItem = $state(null);
	let hoveredIndex = $state(null);
	let galleryRef = $state(null);
	let filter = $state('all');

	// Derived values
	let categories = $derived(() => {
		const cats = new Set(items.map(item => item.category));
		return ['all', ...Array.from(cats)];
	});

	let filteredItems = $derived(() => {
		if (filter === 'all') return items;
		return items.filter(item => item.category === filter);
	});

	let gridCols = $derived(() => {
		const colsMap = {
			1: 'grid-cols-1',
			2: 'grid-cols-1 md:grid-cols-2',
			3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
			4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
		};
		return colsMap[columns] || colsMap[2];
	});

	// Effect for intersection observer
	$effect(() => {
		if (galleryRef && typeof window !== 'undefined') {
			const observer = new IntersectionObserver(
				([entry]) => {
					isVisible = entry.isIntersecting;
				},
				{ threshold: 0.1 }
			);

			observer.observe(galleryRef);
			return () => observer.disconnect();
		}
	});

	// Effect for keyboard navigation
	$effect(() => {
		if (typeof window !== 'undefined') {
			function handleKeydown(event) {
				if (selectedItem && event.key === 'Escape') {
					selectedItem = null;
				}
			}

			window.addEventListener('keydown', handleKeydown);
			return () => window.removeEventListener('keydown', handleKeydown);
		}
	});

	function openModal(item) {
		if (showModal) {
			selectedItem = item;
		}
	}

	function closeModal() {
		selectedItem = null;
	}

	function getItemIcon(category) {
		const icons = {
			music: '🎵',
			photography: '📸',
			film: '🎬',
			modeling: '🎨',
			writing: '✍️',
			default: '📁'
		};
		return icons[category] || icons.default;
	}
</script>

<div bind:this={galleryRef} class="w-full">
	{#if isVisible}
		<div transition:fly={{ y: 50, duration: 600, easing: quintOut }}>
			<h3 class="text-[32px] font-bold text-black mb-6 tracking-[-1.5px] font-condensed">
				{title}
			</h3>

			<!-- Category Filter -->
			<div class="flex flex-wrap gap-2 mb-8">
				{#each categories as category, index}
					<button
						class="px-4 py-2 rounded-full text-sm font-mono transition-all duration-200 flex items-center gap-2
							{filter === category 
								? 'bg-black text-white' 
								: 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
						onclick={() => filter = category}
						transition:scale={{ delay: index * 75, duration: 300 }}
					>
						{#if category !== 'all'}
							<span>{getItemIcon(category)}</span>
						{/if}
						{category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
					</button>
				{/each}
			</div>

			<!-- Gallery Grid -->
			<div class="grid gap-6 {gridCols}">
				{#each filteredItems as item, index}
					<div
						class="group cursor-pointer"
						onmouseenter={() => hoveredIndex = index}
						onmouseleave={() => hoveredIndex = null}
						onclick={() => openModal(item)}
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								openModal(item);
							}
						}}
						role="button"
						tabindex="0"
						aria-label="View {item.title}"
						transition:scale={{ 
							delay: index * 100, 
							duration: 500,
							easing: quintOut 
						}}
					>
						<!-- Item Card -->
						<div class="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-2">
							{#if item.image}
								<div class="aspect-video bg-gray-200 overflow-hidden">
									<img 
										src={item.image} 
										alt={item.title}
										class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
										loading="lazy"
									/>
								</div>
							{:else}
								<div class="aspect-video bg-gray-200 flex items-center justify-center">
									<span class="text-6xl">{getItemIcon(item.category)}</span>
								</div>
							{/if}

							<div class="p-4">
								<div class="flex items-start justify-between mb-2">
									<h4 class="font-semibold text-gray-900 font-condensed text-lg">
										{item.title}
									</h4>
									<span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full font-mono">
										{item.category}
									</span>
								</div>

								<p class="text-gray-600 text-sm mb-3 font-condensed line-clamp-2">
									{item.description}
								</p>

								{#if item.tags && item.tags.length > 0}
									<div class="flex flex-wrap gap-1">
										{#each item.tags.slice(0, 3) as tag}
											<span class="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded font-mono">
												{tag}
											</span>
										{/each}
										{#if item.tags.length > 3}
											<span class="text-xs text-gray-400 px-2 py-1">
												+{item.tags.length - 3} more
											</span>
										{/if}
									</div>
								{/if}

								{#if hoveredIndex === index}
									<div 
										class="mt-3 text-sm text-black font-condensed"
										transition:fade={{ duration: 200 }}
									>
										Click to view details →
									</div>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Gallery Stats -->
			<div class="mt-8 p-4 bg-gray-100 rounded-lg" transition:fly={{ y: 20, delay: 800 }}>
				<div class="text-sm text-gray-600 font-condensed">
					Showing <strong>{filteredItems.length}</strong> 
					{filteredItems.length === 1 ? 'item' : 'items'}
					{#if filter !== 'all'}
						in <strong>{filter}</strong>
					{/if}
				</div>
			</div>
		</div>
	{:else}
		<div class="h-[500px] w-full"></div>
	{/if}
</div>

<!-- Modal -->
{#if selectedItem && showModal}
	<div 
		class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
		onclick={closeModal}
		onkeydown={(e) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		}}
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
		tabindex="-1"
		transition:fade={{ duration: 300 }}
	>
		<div 
			class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
			transition:scale={{ duration: 300, easing: quintOut }}
		>
			<div class="p-6">
				<div class="flex justify-between items-start mb-4">
					<h3 class="text-2xl font-bold text-gray-900 font-condensed">
						{selectedItem.title}
					</h3>
					<button 
						onclick={closeModal}
						class="text-gray-500 hover:text-gray-700 text-2xl"
						aria-label="Close modal"
					>
						×
					</button>
				</div>

				{#if selectedItem.image}
					<img 
						src={selectedItem.image} 
						alt={selectedItem.title}
						class="w-full rounded-lg mb-4"
					/>
				{/if}

				<p class="text-gray-700 mb-4 font-condensed">
					{selectedItem.description}
				</p>

				{#if selectedItem.details}
					<div class="text-gray-600 text-sm font-condensed">
						{selectedItem.details}
					</div>
				{/if}

				{#if selectedItem.links && selectedItem.links.length > 0}
					<div class="mt-4 flex gap-3">
						{#each selectedItem.links as link}
							<a 
								href={link.url} 
								target="_blank" 
								rel="noopener noreferrer"
								class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-condensed text-sm"
							>
								{link.label} →
							</a>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
	
	.font-condensed {
		font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif;
	}
	
	.font-mono {
		font-family: 'Roboto Mono', 'Courier New', monospace;
	}
	
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>

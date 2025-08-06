<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import TopBar from '$lib/components/TopBar.svelte';
	import LeftBar from '$lib/components/LeftBar.svelte';
	import RightBar from '$lib/components/RightBar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Top Bar -->
	<TopBar />

	<!-- Left Navigation Bar -->
	<LeftBar />

	<!-- Right Social Links Bar -->
	<RightBar />

	<!-- Main Content with responsive left margin -->
	<main class="ml-0 mr-0 flex flex-col items-center justify-center px-4 py-8 lg:ml-[200px] lg:mr-[200px]">
		{@render children?.()}
	</main>

	<!-- In Progress Warning Footer -->
	<footer class="w-full bg-yellow-50 border-t border-yellow-200 px-4 py-3 text-center">
		<div class="text-sm text-yellow-700">
			<span class="font-medium">⚠️ Site In Progress:</span> Information may be inaccurate or incomplete
		</div>
	</footer>
</div>

<style>
	/* Use Roboto Condensed as Arial Narrow substitute */
	@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');

	:global(.font-condensed) {
		font-family: 'Roboto Condensed', 'Arial Narrow', Arial, sans-serif;
	}
</style>

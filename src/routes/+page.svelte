<script>
	// import TypewriterText from '$lib/components/TypewriterText.svelte';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	// Svelte 5 state for profile visibility
	let profileVisible = $state(false);
	let profileRef = $state(null);
	let mounted = $state(false);
	let observer = $state(null);

	// Use onMount for browser-only code
	onMount(() => {
		mounted = true;
		
		// Add a small delay to ensure DOM is ready
		setTimeout(() => {
			if (browser && profileRef) {
				observer = new IntersectionObserver(
					([entry]) => {
						profileVisible = entry.isIntersecting;
					},
					{ threshold: 0.3 }
				);

				observer.observe(profileRef);
			}
		}, 100);

		// Cleanup function
		return () => {
			if (observer) {
				observer.disconnect();
				observer = null;
			}
		};
	});

	const aboutText =
		"I'm Abhayprad Jha, a Computer Science student at William & Mary (Class of 2026), blending my passion for building products and design a fascination with modelling the world around me. With internships at Deloitte, TCS and Black Pearl Global Investments, I've honed skills in full-stack development, data analysis, and digital transformation. My goal is to craft user-centered digital experiences that solve real-world challenges.";
</script>

<!-- Oval Profile Image Placeholder -->
<div
	bind:this={profileRef}
	class="mb-8 flex h-[300px] w-[501px] items-center justify-center overflow-hidden rounded-full bg-gray-300 transition-all duration-700 hover:shadow-lg"
>
	<div class="text-center text-lg font-medium text-gray-600">
		<div class="mb-2 text-4xl">📷</div>
		<div>Profile Image</div>
		<div class="text-sm">Placeholder</div>
	</div>
</div>

<!-- About Me Section -->
<div class="w-full max-w-[771px]">
	<div class="font-condensed text-justify">
		<h2 class="mb-4 text-[32px] font-bold tracking-[-1.92px] text-black">About Me</h2>
		<div class="text-[32px] leading-normal tracking-[-1.92px] text-black">
			<p>{aboutText}</p>
		</div>
	</div>
</div>

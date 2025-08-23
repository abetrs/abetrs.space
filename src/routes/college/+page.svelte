<script>
	import ScrollToNextIndicator from '$lib/components/ScrollToNextIndicator.svelte';
	import SkillsCloud from '$lib/components/SkillsCloud.svelte';
	// College photos
	import wmLogo from '$lib/assets/photos/College/WilliamandMary.png';
	import flatHatImg from '$lib/assets/photos/College/FlatHatData.png';
	import miniMartImg from '$lib/assets/photos/College/InternationalMiniMart.png';
	import sasaImg from '$lib/assets/photos/College/SASA.png';
	import cricketImg from '$lib/assets/photos/College/CricketClub.png';
	import { onMount } from 'svelte';
	import { useScrollToNext } from '$lib/composables/useScrollToNext.js';
	import { getNextPagePath } from '$lib/stores/navigation.svelte.js';
	import { page } from '$app/stores';

	// Container reference for scroll detection
	let pageContainer = $state(null);

	// Scroll-to-next functionality
	const scrollToNext = useScrollToNext();

	// Get next page name for indicator
	let nextPagePath = $derived($page.url ? getNextPagePath($page.url.pathname) : null);
	let nextPageName = $derived(() => {
		if (nextPagePath === '/hobbies') return 'Hobbies';
		if (nextPagePath === '/blog') return 'Blog';
		return 'Next Page';
	});

	// Initialize scroll functionality
	onMount(() => {
		scrollToNext.initScrollListener();
		return () => {
			scrollToNext.destroyScrollListener();
		};
	});

	// Set the container reference for scroll detection
	$effect(() => {
		if (pageContainer) {
			scrollToNext.containerRef.value = pageContainer;
		}
	});

	// Academic and Technical Skills - Developed through coursework and campus leadership
	let academicSkills = $state([
		// Programming Languages (from Computer Science coursework)
		{ name: 'Python', level: 'advanced', category: 'programming', years: 3 },
		{ name: 'Java', level: 'advanced', category: 'programming', years: 3 },
		{ name: 'JavaScript', level: 'intermediate', category: 'programming', years: 2 },
		{ name: 'C', level: 'intermediate', category: 'programming', years: 2 },
		{ name: 'C++', level: 'intermediate', category: 'programming', years: 2 },
		{ name: 'SQL', level: 'intermediate', category: 'programming', years: 2 },

		// Core Computer Science Concepts
		{ name: 'Data Structures', level: 'advanced', category: 'cs-core', years: 2 },
		{ name: 'Algorithms', level: 'advanced', category: 'cs-core', years: 2 },
		{ name: 'Software Development', level: 'advanced', category: 'cs-core', years: 3 },
		{ name: 'Programming Languages Theory', level: 'intermediate', category: 'cs-core', years: 1 },
		{ name: 'Applied Cybersecurity', level: 'intermediate', category: 'cs-core', years: 1 },

		// Economics & Statistical Analysis (from dual degree)
		{ name: 'Econometrics', level: 'advanced', category: 'economics', years: 2 },
		{ name: 'Statistical Analysis', level: 'advanced', category: 'economics', years: 3 },
		{ name: 'Linear Algebra', level: 'advanced', category: 'economics', years: 2 },
		{ name: 'R', level: 'advanced', category: 'economics', years: 2 },
		{ name: 'Economic Theory', level: 'advanced', category: 'economics', years: 2 },
		{ name: 'Statistical Modeling', level: 'intermediate', category: 'economics', years: 2 },

		// Data Journalism & Visualization (from The Flat Hat)
		{ name: 'Data Visualization', level: 'expert', category: 'journalism', years: 2 },
		{ name: 'Data Journalism', level: 'expert', category: 'journalism', years: 2 },
		{ name: 'Primary Data Collection', level: 'advanced', category: 'journalism', years: 2 },
		{ name: 'Editorial Process Design', level: 'advanced', category: 'journalism', years: 2 },
		{ name: 'Quantitative Analysis', level: 'advanced', category: 'journalism', years: 2 },

		// Web Development (personal projects and coursework)
		{ name: 'React', level: 'intermediate', category: 'web', years: 1 },
		{ name: 'Svelte', level: 'intermediate', category: 'web', years: 1 },
		{ name: 'HTML/CSS', level: 'advanced', category: 'web', years: 2 },
		{ name: 'Git', level: 'advanced', category: 'web', years: 3 },

		// Leadership & Management (from campus roles)
		{ name: 'Team Leadership', level: 'expert', category: 'leadership', years: 2 },
		{ name: 'Revenue Generation', level: 'advanced', category: 'leadership', years: 1 },
		{ name: 'Event Management', level: 'advanced', category: 'leadership', years: 2 },
		{ name: 'Cross-cultural Communication', level: 'advanced', category: 'leadership', years: 3 },
		{ name: 'Strategic Planning', level: 'intermediate', category: 'leadership', years: 2 },
		{ name: 'Fundraising', level: 'advanced', category: 'leadership', years: 1 },
		{ name: 'Partnership Development', level: 'intermediate', category: 'leadership', years: 2 },

		// Academic Tools & Research
		{ name: 'LaTeX', level: 'advanced', category: 'academic', years: 3 },
		{ name: 'Research Methodology', level: 'advanced', category: 'academic', years: 2 },
		{ name: 'Academic Writing', level: 'advanced', category: 'academic', years: 3 },
		{ name: 'Presentation Skills', level: 'advanced', category: 'academic', years: 3 },

		// Languages (personal background)
		{ name: 'English', level: 'expert', category: 'languages', years: 20 },
		{ name: 'Hindi', level: 'expert', category: 'languages', years: 20 },
		{ name: 'Maithili', level: 'expert', category: 'languages', years: 20 },
		{ name: 'French', level: 'intermediate', category: 'languages', years: 3 }
	]);
</script>

<!-- Content Area -->
<div bind:this={pageContainer} class="w-full max-w-[800px]">
	<div class="text-center">
		<h1 class="font-condensed mb-8 text-[48px] font-bold tracking-[-2px] text-black">College</h1>
		<div class="font-condensed text-[24px] leading-relaxed text-black">
			<p class="mb-8">
				Pursuing a dual degree in Computer Science and Economics at William & Mary, combining
				technical expertise with analytical thinking while leading campus initiatives and building
				products that impact student life.
			</p>

			<!-- Academic Information -->
			<div class="space-y-8 text-left">
				<div class="rounded-lg bg-white p-6 shadow-sm">
					<!-- William & Mary: large image floated right so text wraps -->
					<img
						src={wmLogo}
						alt="William & Mary seal"
						class="float-right mb-4 ml-6 w-56 rounded object-contain sm:w-72 md:w-80"
					/>
					<h3 class="mb-4 text-[28px] font-semibold">William & Mary</h3>
					<p class="mb-2 text-[20px] text-gray-700">Bachelor of Science in Computer Science</p>
					<p class="mb-2 text-[20px] text-gray-700">Bachelor of Arts in Economics</p>
					<p class="mb-4 text-[18px] text-gray-600">Class of 2026 • Williamsburg, Virginia</p>
					<div class="text-[18px] text-gray-700">
						<p class="mb-4">
							Exploring the intersection of technology and business through a rigorous dual-degree
							program that combines technical problem-solving with economic analysis and strategic
							thinking.
						</p>
						<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
							<div>
								<h4 class="mb-2 font-semibold">Computer Science</h4>
								<ul class="space-y-1 text-[16px]">
									<li>• Software Development</li>
									<li>• Data Structures & Algorithms</li>
									<li>• Understanding Large Language Models</li>
									<li>• Principles of Programming Languages</li>
									<li>• Applied Cybersecurity</li>
									<li>• Linear Algebra</li>
								</ul>
							</div>
							<div>
								<h4 class="mb-2 font-semibold">Economics</h4>
								<ul class="space-y-1 text-[16px]">
									<li>• Econometrics</li>
									<li>• Principles of Statistics</li>
									<li>• Methods of Statistics</li>
									<li>• Data Analysis & Visualization</li>
									<li>• Statistical Modeling</li>
									<li>• Economic Theory & Application</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<!-- Leadership & Campus Involvement -->
				<div class="rounded-lg bg-white p-6 shadow-sm">
					<h3 class="mb-4 text-[28px] font-semibold">Leadership & Campus Involvement</h3>

					<div class="space-y-6">
						<!-- Cricket Club Leadership -->
						<div class="border-l-4 border-blue-500 pl-4">
							<div class="mb-3">
								<img
									src={cricketImg}
									alt="William & Mary Cricket Club"
									class="h-auto w-40 object-contain sm:w-48"
								/>
							</div>
							<h4 class="mb-2 text-[20px] font-semibold">William & Mary Cricket Club</h4>
							<p class="mb-2 text-[16px] text-gray-600">
								Captain and President • August 2024 - Present
							</p>
							<ul class="space-y-2 text-[16px] text-gray-700">
								<li>• Leading recruitment initiatives to promote cricket at William & Mary</li>
								<li>
									• Generated $1000+ in revenue through strategic fundraising and campus
									partnerships
								</li>
								<li>
									• Implemented travel policy for team members, generating $100+ in additional
									revenue
								</li>
								<li>
									• Collaborated with College Administration to secure professional protective
									equipment for 20+ team members
								</li>
								<li>• Overseeing team strategy, training, and competitive match scheduling</li>
							</ul>
						</div>

						<!-- Data Editor at The Flat Hat -->
						<div class="border-l-4 border-green-500 pl-4">
							<div class="mb-3">
								<img
									src={flatHatImg}
									alt="The Flat Hat data journalism"
									class="h-auto w-40 object-contain sm:w-48"
								/>
							</div>
							<h4 class="mb-2 text-[20px] font-semibold">The Flat Hat (Student Newspaper)</h4>
							<p class="mb-2 text-[16px] text-gray-600">Data Editor • January 2023 - Present</p>
							<ul class="space-y-2 text-[16px] text-gray-700">
								<li>
									• Launched and scaled data journalism from 0 to 1, defining product vision and
									editorial processes
								</li>
								<li>• Grew section output to 20+ analytical articles annually</li>
								<li>
									• Led cross-functional team of 5+ writers to ship inaugural full-page feature
								</li>
								<li>
									• Expanded coverage to 2 full pages per semester through iterative improvements
								</li>
								<li>
									• Designed reusable data visualization components for Sports and News sections
								</li>
								<li>
									• Leveraged primary data collection and quantitative analysis to uncover student
									life insights
								</li>
							</ul>
						</div>

						<!-- International Mini Market -->
						<div class="border-l-4 border-purple-500 pl-4">
							<div class="mb-3">
								<img
									src={miniMartImg}
									alt="International Mini Market event"
									class="h-auto w-40 object-contain sm:w-48"
								/>
							</div>
							<h4 class="mb-2 text-[20px] font-semibold">International Mini Market</h4>
							<p class="mb-2 text-[16px] text-gray-600">Organizer • May 2023 - April 2024</p>
							<ul class="space-y-2 text-[16px] text-gray-700">
								<li>
									• Managed end-to-end execution of campus pop-up retail featuring 50+ international
									products
								</li>
								<li>
									• Coordinated with 15+ multicultural organizations for product sourcing and
									logistics
								</li>
								<li>
									• Achieved 100% sell-through rate within 2 hours, validating product-market fit
								</li>
								<li>• Increased accessibility to international goods for the campus community</li>
							</ul>
						</div>

						<!-- South Asian Student Association -->
						<div class="border-l-4 border-orange-500 pl-4">
							<div class="mb-3">
								<img
									src={sasaImg}
									alt="South Asian Student Association"
									class="h-auto w-40 object-contain sm:w-48"
								/>
							</div>
							<h4 class="mb-2 text-[20px] font-semibold">South Asian Student Association</h4>
							<p class="mb-2 text-[16px] text-gray-600">Outreach Chair • May 2023 - April 2024</p>
							<ul class="space-y-2 text-[16px] text-gray-700">
								<li>
									• Represented South Asian students and promoted cultural awareness across campus
								</li>
								<li>• Organized events highlighting the diverse cultures within South Asia</li>
								<li>• Built bridges between different cultural communities at William & Mary</li>
							</ul>
						</div>
					</div>
				</div>

				<!-- Skills Developed Through College Experience -->
				<div class="mt-16">
					<SkillsCloud
						skills={academicSkills}
						title="Skills & Competencies Developed"
						animated={true}
					/>
				</div>
			</div>

			<!-- Additional content to ensure scrolling is possible -->
			<div class="mt-16 space-y-8 text-center">
				<div class="font-mono text-sm text-gray-500">
					Continue scrolling to explore my hobbies and interests
				</div>
				<!-- Spacer to enable scroll-to-next -->
				<div class="h-32"></div>
			</div>
		</div>
	</div>
</div>

<!-- Scroll-to-next indicator -->
{#if nextPagePath}
	<ScrollToNextIndicator nextPageName={nextPageName()} />
{/if}

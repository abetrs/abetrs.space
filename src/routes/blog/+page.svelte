<script>
	import BlogPost from '$lib/components/BlogPost.svelte';

	// Blog posts data using Svelte 5 runes
	let blogPosts = $state([
		{
			title: 'The Future of Full-Stack Development',
			excerpt:
				'Exploring emerging trends in web development and how modern frameworks are reshaping the developer experience. From AI-assisted coding to edge computing, the landscape is evolving rapidly.',
			publishedDate: '2024-01-15',
			readTime: 8,
			url: 'https://substack.com/@abhaypradjha/future-fullstack'
		},
		{
			title: 'Lessons from My Deloitte Internship',
			excerpt:
				'Key insights gained from working in tech consulting and how enterprise-level projects differ from academic work. Understanding client needs and scalable solutions.',
			publishedDate: '2023-12-20',
			readTime: 6,
			url: 'https://substack.com/@abhaypradjha/deloitte-lessons'
		},
		{
			title: 'Building User-Centered Digital Experiences',
			excerpt:
				'The importance of design thinking in development and how to create solutions that truly solve real-world problems. A deep dive into UX principles for developers.',
			publishedDate: '2023-11-28',
			readTime: 10,
			url: 'https://substack.com/@abhaypradjha/user-centered-design'
		}
	]);
</script>

<!-- Content Area -->
<div class="w-full max-w-[800px]">
	<div class="text-center">
		<h1 class="font-condensed mb-8 text-[48px] font-bold tracking-[-2px] text-black">Blog</h1>
		<div class="font-condensed text-[24px] leading-relaxed text-black">
			<p class="mb-8">
				Thoughts and insights on technology, design, and the intersection of innovation with
				real-world problem solving. Follow my journey through tech, academics, and creative
				exploration.
			</p>

			<!-- Placeholder content for blog -->
			<div class="space-y-8 text-left">
				<div class="rounded-lg border-l-4 border-black bg-white p-6 shadow-sm">
					<h3 class="mb-2 text-[28px] font-semibold">Substack Integration</h3>
					<p class="mb-4 text-[18px] text-gray-700">
						Regular posts about technology trends, development insights, and personal
						reflections on the tech industry.
					</p>
					<a
						href="https://substack.com/@abhaypradjha"
						class="text-[18px] text-black underline hover:no-underline"
					>
						Read on Substack →
					</a>
				</div>

				<div class="space-y-6">
					<h3 class="text-[28px] font-semibold">Recent Posts</h3>

					{#each blogPosts as post, index}
						<BlogPost
							title={post.title}
							excerpt={post.excerpt}
							publishedDate={post.publishedDate}
							readTime={post.readTime}
							url={post.url}
							{index}
						/>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

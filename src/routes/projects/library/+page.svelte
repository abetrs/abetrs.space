<script>
	import SocialRow from '$lib/components/SocialRow.svelte';
	import gridImg from '$lib/assets/photos/Projects/library-grid.png';
	import detailImg from '$lib/assets/photos/Projects/library-detail.png';
	import darkImg from '$lib/assets/photos/Projects/library-dark.png';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/#projects">← Projects</a>

	<h1 class="story-title font-bodoni">Library</h1>
	<p class="story-meta font-garamond">Static Web App · Vanilla JS · Open Library API</p>

	<div class="story-lede font-garamond">
		<p>
			I read off two lists that never met. A Markdown file of what I meant to get to, and ten years
			of Goodreads I could not query or shape. Neither one told me how much philosophy I had read
			against how much history.
		</p>
		<p>
			Every tool that offered to fix it wanted an account and a server. So I built one that needs
			neither.
		</p>
	</div>

	<figure class="story-figure">
		<img
			src={gridImg}
			alt="The Library reading dashboard, a grid of book covers fetched from Open Library."
			loading="lazy"
		/>
	</figure>

	<div class="story-body">
		<section class="story-section">
			<h2 class="section-heading font-bodoni">Built</h2>
			<ul class="story-list font-garamond">
				<li>
					<strong>Static.</strong> HTML, CSS and vanilla JavaScript. No build step, no dependencies,
					no backend. Runs by opening a file. State lives in localStorage.
				</li>
				<li>
					<strong>Two ways in.</strong> Paste a Markdown list, or drop a Goodreads CSV export. Re-importing
					merges only what is new, deduping on ISBN, then on title and author.
				</li>
				<li>
					<strong>Enrichment at runtime.</strong> Covers from the Open Library Covers API by ISBN, falling
					back to title and author search. Summaries from Open Library, falling back to Wikipedia.
				</li>
				<li>
					<strong>Genre canonicalization.</strong> Word-boundary matching with noise filtering turns
					raw Open Library subjects into History, Philosophy, Fiction, Economics, Science Fiction. No
					filter chips reading "20th century".
				</li>
				<li>
					<strong>Split request queues.</strong> Covers and genres load independently, so a slow subject
					lookup never holds the grid hostage.
				</li>
				<li>
					<strong>Browsing.</strong> Search on title and author, filter chips with live counts, read
					and unread, primary-source flag, sort, grid or list, system light and dark.
				</li>
			</ul>
		</section>

		<figure class="story-figure">
			<img
				src={detailImg}
				alt="A book detail popup showing a fetched summary and canonicalized genre tags."
				loading="lazy"
			/>
		</figure>

		<figure class="story-figure">
			<img src={darkImg} alt="The same dashboard in dark mode." loading="lazy" />
		</figure>

		<section class="story-section">
			<div class="section-body font-garamond">
				<p>
					Hosted free on GitHub Pages. Bare titles become a shelf of covers, tags and summaries in a
					few seconds. Nothing leaves the machine.
				</p>
			</div>
		</section>
	</div>

	<SocialRow />
</div>

<style>
	@import '../story.css';
</style>

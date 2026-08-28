<script>
	import SocialRow from '$lib/components/SocialRow.svelte';
	import gridImg from '$lib/assets/photos/Projects/library-grid.png';
	import detailImg from '$lib/assets/photos/Projects/library-detail.png';
	import darkImg from '$lib/assets/photos/Projects/library-dark.png';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/#projects">← Projects</a>

	<h1 class="story-title font-bodoni">Library</h1>
	<p class="story-meta font-garamond">Personal Tool · Static Web App · Vanilla JS</p>

	<figure class="story-figure">
		<img
			src={gridImg}
			alt="The Library reading dashboard — a grid of book covers automatically fetched from Open Library."
			loading="lazy"
		/>
		<figcaption class="fig-caption font-garamond">
			The shelf. Covers pulled from Open Library at runtime; nothing entered by hand.
		</figcaption>
	</figure>

	<div class="story-body">
		<section class="story-section">
			<h2 class="section-heading font-bodoni">Two Reading Lives</h2>
			<div class="section-body font-garamond">
				<p>
					I keep two reading lives and they have never spoken to each other. One is a list of things
					I intend to read: the canon, the primary sources, the books I have been meaning to get to
					since some specific afternoon in 2021. The other is Goodreads, where a decade of finished
					books sits behind an interface I do not enjoy and cannot shape.
				</p>
				<p>
					Neither one answers the question I actually have. How much philosophy have I read against
					how much history? Which of these are primary sources and which are somebody's summary of
					one? What does the whole thing look like as a wall of covers instead of a column of
					titles? Goodreads owns the data and hides it. My own list has the intent and nothing else
					— no covers, no genres, nothing to browse, just me and a bullet point.
				</p>
				<p>
					Every tool that offered to fix this wanted an account, a server, and a cut of my reading
					history for purposes it declined to specify. I wanted the opposite: something private,
					something mine, something that would still open in ten years because it depends on nothing
					that can be shut down.
				</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">Refusing a Backend</h2>
			<div class="section-body font-garamond">
				<p>
					The whole thing is static. Plain HTML, CSS, and vanilla JavaScript; no build step, no
					dependencies, no framework. It runs by double-clicking a file. Every piece of state — the
					reading list, the imported books, the cached covers and genres — lives in the browser's
					localStorage. Nothing is uploaded because there is nowhere to upload it to.
				</p>
				<p>
					Getting books in had to cost nothing, or I would not have used it either. The curated list
					is a Markdown paste: headings become categories, one book per line, a checkmark for read,
					a tag for primary sources. Goodreads arrives through its own official CSV export rather
					than a scraper, and re-importing later merges only what is new, deduping by ISBN first and
					then by title and author so nothing quietly doubles.
				</p>
				<p>
					What arrives is bare, though — a title and an author, which is not a shelf. Everything
					that makes the thing worth looking at gets reconstructed on the fly. Covers come from the
					Open Library Covers API by ISBN, falling back to a title-and-author search. Genres come
					from Open Library subjects and are then canonicalized into a vocabulary you can actually
					filter with: the raw subject soup collapses down into History, Philosophy, Fiction,
					Economics, Science Fiction. Summaries come from Open Library descriptions, and when there
					is nothing there, from a Wikipedia lookup matched on title and author.
				</p>
			</div>
		</section>

		<figure class="story-figure">
			<img
				src={detailImg}
				alt="A book detail popup showing an auto-fetched summary and canonicalized genre tags."
				loading="lazy"
			/>
			<figcaption class="fig-caption font-garamond">
				Click a book: a summary and clean genre tags, assembled at read time from Open Library and
				Wikipedia.
			</figcaption>
		</figure>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">Where the Engineering Hides</h2>
			<div class="section-body font-garamond">
				<p>
					None of the above is the hard part. The hard part is that a hundred books means several
					hundred network requests against public APIs that owe you nothing, and if you fire them
					naively the page sits there being useless.
				</p>
				<p>
					So covers and genres load on separate queues. A slow subject lookup never holds a cover
					hostage: the wall of covers fills in first, because that is what you came for, and the
					tags settle in behind it. Genre canonicalization does word-boundary matching against a
					curated list with noise filtering, which is a dull sentence describing the difference
					between a usable filter bar and forty chips that say things like "20th century."
				</p>
				<p>
					On top of that sits the browsing I built the thing for in the first place: search across
					title and author, filter chips for author and genre with live counts, read and unread and
					primary-source status, sorting, and a grid-or-list toggle. It follows the system's light
					and dark theme. It is responsive. Because there is no framework and nothing on the
					critical path is waiting on a network, it is fast — which is less an achievement than the
					natural result of not adding anything.
				</p>
			</div>
		</section>

		<figure class="story-figure">
			<img src={darkImg} alt="The same dashboard in dark mode." loading="lazy" />
			<figcaption class="fig-caption font-garamond">
				Light and dark follow the system. Responsive, framework-free.
			</figcaption>
		</figure>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">What I Actually Wanted</h2>
			<div class="section-body font-garamond">
				<p>
					Library is one static site, hosted free on GitHub Pages, running entirely in the browser.
					No account, no backend, no tracking. Bare titles from a Markdown paste or a Goodreads
					export become, in a few seconds, a browsable shelf of real covers, tagged genres, and
					readable summaries.
				</p>
				<p>
					The satisfying part was watching the constraint do the work. Refusing a backend forced
					every genuinely hard problem — covers, genres, summaries — to be solved against public,
					durable APIs and then cached locally, which is a better answer than the one I would have
					written if I had let myself have a server. The result owes nothing to anyone. There is no
					service to go under, no login to expire, no data leaving the machine.
				</p>
				<p>
					It is the version of a reading tracker I wanted to exist, which is the only reason it
					does. I am aware that this is not a business.
				</p>
			</div>
		</section>
	</div>

	<SocialRow />
</div>

<style>
	@import '../story.css';
</style>

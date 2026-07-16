<script>
	import resumePdf from '$lib/assets/AbhaypradJhaResume.pdf';
	import gridImg from '$lib/assets/photos/Projects/library-grid.png';
	import detailImg from '$lib/assets/photos/Projects/library-detail.png';
	import darkImg from '$lib/assets/photos/Projects/library-dark.png';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/projects">← Projects</a>

	<h1 class="story-title font-bodoni">Library</h1>
	<p class="story-meta font-garamond">Personal Tool · Static Web App · Vanilla JS</p>

	<figure class="story-figure">
		<img src={gridImg} alt="The Library reading dashboard — a grid of book covers automatically fetched from Open Library." loading="lazy" />
		<figcaption class="fig-caption font-garamond">The reading dashboard — covers pulled automatically from Open Library, no manual entry.</figcaption>
	</figure>

	<div class="story-body">
		<section class="story-section">
			<h2 class="section-heading font-bodoni">The Problem</h2>
			<div class="section-body font-garamond">
				<p>I keep two reading lives that never talk to each other. One is a curated list of things I intend to read — the canon, the primary sources, the books I keep meaning to get to. The other is Goodreads, where years of finished books sit behind an interface I don't enjoy and can't really shape.</p>
				<p>Neither view answers the questions I actually ask. What have I read in philosophy versus history? Which of these are primary sources? What does the whole shelf look like as a wall of covers rather than a list of titles? Goodreads has the data but hides it; my curated list has the intent but no covers, no genres, nothing to browse.</p>
				<p>Every tool that promised to fix this wanted an account, a server, and a slice of my reading history for its own purposes. I wanted the opposite: something private, something I owned, something that would still work in ten years because it depended on nothing.</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">The Approach</h2>
			<div class="section-body font-garamond">
				<p>The whole thing is static — plain HTML, CSS, and vanilla JavaScript, no build step and no dependencies. It runs by double-clicking a file. Every piece of state — your reading list, imported books, cached covers and genres — lives in the browser's localStorage. Nothing is uploaded, because there is nowhere to upload it to.</p>
				<p>Getting books in had to be effortless. The curated list is just a Markdown paste: headings become categories, one book per line, a checkmark for read, a tag for primary sources. Goodreads comes in through its own official CSV export — no scraping — and re-importing later merges in only what's new, deduping by ISBN and then by title and author so nothing doubles up.</p>
				<p>The books arrive bare, though — a title and an author. Everything that makes the dashboard worth looking at is fetched and reconstructed on the fly. Covers come from the Open Library Covers API by ISBN, falling back to a title-and-author search. Genres are pulled from Open Library subjects and then canonicalised into a clean, filterable vocabulary — the raw subject soup collapses into History, Philosophy, Fiction, Economics, Science Fiction. Summaries come from Open Library descriptions, falling back to a Wikipedia lookup matched on title and author when there's nothing there.</p>
			</div>
		</section>

		<figure class="story-figure">
			<img src={detailImg} alt="A book detail popup showing an auto-fetched summary and canonicalised genre tags." loading="lazy" />
			<figcaption class="fig-caption font-garamond">Click any book: a summary and canonicalised genre tags, assembled at runtime from Open Library and Wikipedia.</figcaption>
		</figure>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">The Details</h2>
			<div class="section-body font-garamond">
				<p>The enrichment is where the engineering hides. Covers and genres load on separate request queues, so a slow genre lookup never holds a cover hostage — the wall of covers fills in first, then the tags settle in behind it. Genre canonicalisation uses word-boundary matching against a curated list with noise filtering, so "20th century" and a hundred other junk subjects don't become filter chips.</p>
				<p>On top of that sits the browsing I built the tool for in the first place: search across title and author, filter chips for author and genre with live counts, read and unread and primary-source status, sorting, and a grid-or-list toggle. It follows the system's light and dark theme, it's responsive, and because there's no framework and no network on the critical path, it's fast.</p>
			</div>
		</section>

		<figure class="story-figure">
			<img src={darkImg} alt="The same dashboard in dark mode." loading="lazy" />
			<figcaption class="fig-caption font-garamond">Light and dark follow the system; the layout is responsive and framework-free.</figcaption>
		</figure>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">The Outcome</h2>
			<div class="section-body font-garamond">
				<p>Library is a single static site that hosts for free on GitHub Pages and runs entirely in the browser — no accounts, no backend, no tracking. Bare titles from a Markdown paste or a Goodreads export turn, within seconds, into a browsable shelf of real covers, tagged genres, and readable summaries.</p>
				<p>The satisfying part was watching the constraint pay off. Refusing a backend forced every hard problem — covers, genres, summaries — to be solved against public, durable APIs and cached locally. The result is a tool that owes nothing to anyone: no service to shut down, no login to expire, no data leaving the machine. It's the version of a reading tracker I actually wanted, which is the only reason it exists.</p>
			</div>
		</section>
	</div>

	<nav class="social-row" aria-label="Links">
		<a class="social-item" href="https://github.com/abetrs/book-library" target="_blank" rel="noopener noreferrer">
			<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
			<span class="social-label font-garamond">GitHub</span>
		</a>
		<a class="social-item" href="https://abetheunicorn.substack.com" target="_blank" rel="noopener noreferrer">
			<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>
			<span class="social-label font-garamond">Cult Classic</span>
		</a>
		<a class="social-item" href="https://www.linkedin.com/in/abhayprad-jha-b12390223/" target="_blank" rel="noopener noreferrer">
			<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
			<span class="social-label font-garamond">LinkedIn</span>
		</a>
		<a class="social-item" href={resumePdf} target="_blank" rel="noopener noreferrer">
			<svg class="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>
			<span class="social-label font-garamond">Resume</span>
		</a>
	</nav>
</div>

<style>
	@import '../story.css';
</style>

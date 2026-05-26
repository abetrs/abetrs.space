<script>
	import resumePdf from '$lib/assets/AbhaypradJhaResume.pdf';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/projects">← Projects</a>

	<h1 class="story-title font-bodoni">The UX Philosophy<br>of This Site</h1>
	<p class="story-meta font-garamond">Design Philosophy · Typography · Interaction</p>

	<div class="story-body">
		<section class="story-section">
			<h2 class="section-heading font-bodoni">The Brief</h2>
			<div class="section-body font-garamond">
				<p>Most personal portfolio sites make the same mistake: they try to be comprehensive. They list every skill, every project, every certificate. They optimise for surface area rather than signal. The result is a page that tells you everything and communicates nothing — a wall of text that proves busyness rather than capability.</p>
				<p>The brief I gave myself for this site was the opposite: fixed-frame, typographically-led, minimal. The primary inspiration was asimorb.com — a site that communicates personality and craft through restraint rather than density. The challenge was to take that aesthetic sensibility and apply it to a portfolio that still needed to do real work: convey experience, establish credibility, invite connection.</p>
				<p>The design should feel like a business card, not a brochure. Everything that's there should be earning its place.</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">Typography as Structure</h2>
			<div class="section-body font-garamond">
				<p>The typographic system is built on a single tension: Bodoni Moda for display, EB Garamond for body. These two typefaces don't belong to the same historical moment — Bodoni is high-contrast neoclassical, Garamond is old-style humanist — and that tension is intentional. Bodoni commands at large sizes; it makes titles feel like statements. Garamond recedes into readability at small sizes; it makes body text feel like conversation. Together they create a hierarchy that doesn't need colour or weight to communicate itself.</p>
				<p>The name "Abhayprad Jha" at the top of the landing page is the largest element on the site. This is a deliberate inversion of typical portfolio logic, which tends to lead with credentials and treat identity as secondary. Here, identity is the primary message. Everything else — the work, the experience, the links — unfolds from that centre.</p>
				<p>The Libre Barcode 128 typeface in the corner is an easter egg and a signature. It renders the name as a barcode: machine-readable, permanent, slightly alien. It suggests that somewhere in the infrastructure of the world, this person has been indexed.</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">Time as Interface</h2>
			<div class="section-body font-garamond">
				<p>The clock in the upper-left corner is the feature I'm most pleased with, and the one that took the most iterations to get right. The idea came from a simple observation: a personal website is always viewed in a specific moment, by a specific person, in a specific place. Most sites ignore all of that context. This one doesn't.</p>
				<p>The clock displays the current time, date, and day of week — and through the timezone selector, lets visitors reframe the site through their own geography. Selecting Mumbai changes the time. More importantly, it changes the background. The site fetches real sunrise and sunset times for the selected city via the sunrise-sunset.org API, and shifts the background gradient accordingly: a sky-blue gradient for daytime, a warm amber-to-crimson gradient for the two-hour window around sunrise and sunset (golden hour), and a deep navy for night.</p>
				<p>This means the site looks genuinely different at different times of day, in different cities, in different seasons. A visitor in Tokyo at midnight sees a completely different visual register than a visitor in London at noon. The site is not a static document — it's a document that exists in time.</p>
				<p>Night mode flips the entire foreground to white. This wasn't designed as a "dark mode toggle" — it's a mood shift tied to real-world astronomy. The interface literally changes when the sun goes down.</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">Navigation as Ceremony</h2>
			<div class="section-body font-garamond">
				<p>There is no traditional navigation bar. Instead, each page title is a button. Clicking it reveals a dropdown of the other sections — a gesture that treats navigation as something you choose rather than something that's always available. This creates a small but meaningful friction: you have to want to leave the page you're on.</p>
				<p>On the landing page, the site begins collapsed. The name and its Hindi translation are centred on screen. A down arrow pulses below them. This is the only call to action. Pressing it expands the About Me section — the name shrinks, the page shifts, the typewriter begins. The content is revealed rather than immediately present. This treats the bio as something to be discovered rather than declared.</p>
				<p>Clicking the name again collapses everything back. The site remembers its resting state. There's something satisfying about an interface that can return to its origin.</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">Transitions as Continuity</h2>
			<div class="section-body font-garamond">
				<p>Page transitions use the View Transitions API — a relatively new browser feature that allows cross-document transitions to feel like within-document animations. The outgoing page fades in 180ms; the incoming page fades in over 280ms. The asymmetry is intentional: leaving should feel faster than arriving.</p>
				<p>The blur veil is a fixed-position element that sits between the background gradient and the page content. It applies a 40px backdrop-filter blur, which softens the background without obscuring it — creating the impression that the content is floating above a frosted surface rather than sitting on a flat colour. This required the background to be a proper DOM element (a fixed-position div) rather than a CSS body gradient, because backdrop-filter needs something real to filter.</p>
				<p>These details don't announce themselves. They're the kind of thing you feel without being able to name — a site that somehow feels more considered than others without being able to say exactly why. That's the goal. Good UX is often most effective when it's invisible.</p>
			</div>
		</section>
	</div>

	<nav class="social-row" aria-label="Links">
		<a class="social-item" href="https://abetheunicorn.substack.com" target="_blank" rel="noopener noreferrer">
			<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>
			<span class="social-label font-garamond">Cult Classic</span>
		</a>
		<a class="social-item" href="https://github.com/abetrs" target="_blank" rel="noopener noreferrer">
			<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
			<span class="social-label font-garamond">GitHub</span>
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

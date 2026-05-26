<script>
	import resumePdf from '$lib/assets/AbhaypradJhaResume.pdf';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/projects">← Projects</a>

	<h1 class="story-title font-bodoni">TCS Lithium<br>Battery UX</h1>
	<p class="story-meta font-garamond">Enterprise UX · Design Systems · B2B</p>

	<div class="story-body">
		<section class="story-section">
			<h2 class="section-heading font-bodoni">The Problem</h2>
			<div class="section-body font-garamond">
				<p>The lithium-ion battery supply chain is one of the most regulated and technically complex ecosystems in manufacturing. At TCS, the challenge wasn't a shortage of expertise — it was a surplus of misaligned mental models. Engineers, compliance officers, and procurement managers were each working from a different implicit understanding of the same process. There was no shared design language, no canonical workflow, and no artefact that all three groups could point to and say: this is what we are building.</p>
				<p>The consequences were costly. Every regulatory review cycle produced new design changes because compliance requirements had been addressed reactively rather than embedded from the start. Engineering rework was chronic, and the disconnect between what was designed and what could realistically be built was eating weeks off every sprint.</p>
				<p>The core UX problem was this: how do you design an interface that simultaneously satisfies the speed needs of an engineer, the auditability needs of a compliance officer, and the transparency needs of a procurement manager — without creating three separate products?</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">The Approach</h2>
			<div class="section-body font-garamond">
				<p>Discovery began with interviews across the full stakeholder spectrum. The research surfaced a central tension: every team wanted faster decisions, but no team was willing to sacrifice the compliance trail. This wasn't a contradiction — it was a design constraint. Speed and auditability weren't opposing forces; they'd just never been designed for simultaneously.</p>
				<p>The insight that reframed the project: compliance documentation shouldn't be a separate workflow that happens after design. It should be a first-class UX element embedded in every interface component. If a user can't complete a step without producing the required compliance record, the audit trail becomes automatic rather than afterthought.</p>
				<p>I built a design system around this principle. Each component in the system had a compliance state — a visual treatment that indicated whether the current data met regulatory acceptance criteria. This gave compliance officers visibility at a glance without burdening engineers with compliance logic they shouldn't need to think about. The Figma prototype was constructed to demonstrate this dual-audience design: one interface, two mental models served simultaneously.</p>
				<p>The white paper I authored alongside the prototype documented the design rationale explicitly — not just what I designed, but why each decision was made and what regulatory requirement it addressed. This gave the CTO the evidence base to make a confident sign-off decision rather than an intuitive one.</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">The Outcome</h2>
			<div class="section-body font-garamond">
				<p>The prototype was signed off by the CTO in a single review session — something the project team described as unprecedented. More practically, the design system cut time-to-spec by 25%: developers could move directly from design handoff to implementation because the specifications were unambiguous and the compliance criteria were already encoded in the component definitions.</p>
				<p>Rework in the early engineering cycles dropped by 30%, because the design artefacts gave engineers a clear contract to build against. When a component didn't match the spec, there was something specific to point to rather than a disputed memory of what had been agreed in a meeting.</p>
				<p>The broader lesson was about the value of making the implicit explicit. The compliance requirements had always existed. The stakeholder mental models had always been misaligned. Making both visible — through design — was what changed the outcome.</p>
			</div>
		</section>

		<div class="metrics-row">
			<div class="metric">
				<span class="metric-num font-bodoni">25%</span>
				<span class="metric-label font-garamond">reduction in time-to-spec</span>
			</div>
			<div class="metric">
				<span class="metric-num font-bodoni">30%</span>
				<span class="metric-label font-garamond">less rework in early engineering</span>
			</div>
			<div class="metric">
				<span class="metric-num font-bodoni">1</span>
				<span class="metric-label font-garamond">review session to CTO sign-off</span>
			</div>
		</div>
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

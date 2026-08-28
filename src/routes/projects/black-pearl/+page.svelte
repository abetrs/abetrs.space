<script>
	import SocialRow from '$lib/components/SocialRow.svelte';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/#projects">← Projects</a>

	<h1 class="story-title font-bodoni">Black Pearl<br />AI Due Diligence</h1>
	<p class="story-meta font-garamond">Venture Capital · Agentic AI · Workflow Design</p>

	<div class="story-body">
		<section class="story-section">
			<h2 class="section-heading font-bodoni">A Paradox of Scale</h2>
			<div class="section-body font-garamond">
				<p>
					Venture capital has a scale problem it created for itself. Fundraising got frictionless,
					startups went remote-first, and the whole thing globalized — so a mid-sized fund that once
					saw thirty decks a month now sees several hundred. What did not change is the diligence.
					Somebody still has to read every deck, chase down the market sizing claim, look at the
					architecture, and turn all of it into a memo a partner can act on.
				</p>
				<p>
					At Black Pearl the bottleneck was easy to see and awkward to say out loud. Analysts were
					spending most of their working hours on mechanical information gathering rather than
					judgment, which is the one thing they were hired for. The pipeline was not a pipeline; it
					was email, spreadsheets, a Drive folder, and notes in a calendar invite. There was no
					schema for what a diligence output should even look like, so every analyst's work product
					was shaped differently and comparing two deals meant reading both again from scratch.
				</p>
				<p>Nobody was working slowly. The system was pointing them at the wrong work.</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">Three Layers, One Human</h2>
			<div class="section-body font-garamond">
				<p>
					The brief was clear in one direction and deliberately vague in the other: automate what
					can be automated, never take the human out of the decision. That second half is the
					interesting constraint, and it decided the architecture.
				</p>
				<p>
					A single monolithic AI tool would have been faster to describe and worse to use, because
					when it is wrong there is no seam to reach into. So the workflow is three layers.
					Ingestion, on n8n, pulls decks, market reports, technical specs and cap table summaries
					out of email and data room integrations and flattens them into one standardized schema.
					The intelligence layer runs on Claude, with a purpose-built prompt per document type
					extracting what actually moves an investment decision: defensibility, how the market
					sizing was arrived at, team composition, technical differentiation, and the red flags.
					Delivery, on Zapier, routes the finished analysis into the CRM and generates a structured
					briefing ready for partner review.
				</p>
				<p>
					Every layer exposes an override. An analyst can flag a deck out to manual review, inject
					context the model has no way of knowing, or kill a generated summary before it ever
					reaches a partner. This is not a hedge; it is the point. A system that cannot be
					redirected mid-flight is one people learn to route around, and a diligence tool nobody
					trusts is worse than no tool at all.
				</p>
				<p>
					The architecture went into a Figma deck built for a CIO audience: workflow diagrams,
					example outputs, projected efficiency, and a phased rollout.
				</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">What the Exercise Was Actually For</h2>
			<div class="section-body font-garamond">
				<p>
					The framework won internal sponsorship for a pilot. The projection — 40 to 60% off initial
					screening time, and capacity for roughly 75% more deals at the same headcount — was enough
					to move the room from "interesting" to "what do we need to start."
				</p>
				<p>
					The outcome I keep thinking about is quieter than that. Designing the workflow forced a
					level of precision about what due diligence <em>is</em> that nobody had been made to produce
					before: which information matters, in what order, held to what standard of confidence. You
					cannot automate a process you cannot describe, and being made to describe it exposed how much
					of it had been running on the accumulated instinct of whoever happened to be doing it that
					week.
				</p>
				<p>
					That clarity was worth having on its own terms, independently of whether a single line of
					the thing ever ran. Which is a strange conclusion to reach about an automation project,
					and I think it is the honest one.
				</p>
			</div>
		</section>

		<div class="metrics-row">
			<div class="metric">
				<span class="metric-num font-bodoni">40–60%</span>
				<span class="metric-label font-garamond">projected reduction in screening time</span>
			</div>
			<div class="metric">
				<span class="metric-num font-bodoni">75%</span>
				<span class="metric-label font-garamond">more deals evaluated per analyst</span>
			</div>
			<div class="metric">
				<span class="metric-num font-bodoni">3</span>
				<span class="metric-label font-garamond">integrated automation layers</span>
			</div>
		</div>
	</div>

	<SocialRow />
</div>

<style>
	@import '../story.css';
</style>

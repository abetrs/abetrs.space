<script>
	import SocialRow from '$lib/components/SocialRow.svelte';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/#projects">← Projects</a>

	<h1 class="story-title font-bodoni">Black Pearl<br />AI Due Diligence</h1>
	<p class="story-meta font-garamond">Venture Capital Intern · Summer 2025</p>

	<div class="story-lede font-garamond">
		<p>
			Deal flow scaled. Diligence did not. Analysts at Black Pearl were spending most of their hours
			gathering information instead of judging it.
		</p>
		<p>
			The pipeline was email, spreadsheets and a Drive folder. No two memos had the same shape, so
			deals could not be compared without reading both again.
		</p>
	</div>

	<div class="story-body">
		<section class="story-section">
			<h2 class="section-heading font-bodoni">Built</h2>
			<ul class="story-list font-garamond">
				<li>
					<strong>Ingestion, on n8n.</strong> Pitch decks, market reports, technical specs and cap tables
					pulled from email and data room integrations into one schema.
				</li>
				<li>
					<strong>Analysis, on Claude.</strong> A prompt per document type extracting defensibility,
					market sizing method, team composition, technical differentiation and red flags.
				</li>
				<li>
					<strong>Delivery, on Zapier.</strong> Routed into the CRM as a structured briefing ready for
					partner review.
				</li>
				<li>
					<strong>Override at every layer.</strong> An analyst can flag a deck to manual review, inject
					context the model cannot see, or kill a summary before it reaches a partner.
				</li>
				<li>
					<strong>Presented as a Figma deck</strong> for a CIO audience: workflow diagrams, sample outputs,
					projected efficiency, phased rollout.
				</li>
			</ul>
		</section>

		<div class="metrics-row">
			<div class="metric">
				<span class="metric-num font-bodoni">40–60%</span>
				<span class="metric-label font-garamond">projected cut in screening time</span>
			</div>
			<div class="metric">
				<span class="metric-num font-bodoni">75%</span>
				<span class="metric-label font-garamond">more deals per analyst</span>
			</div>
			<div class="metric">
				<span class="metric-num font-bodoni">Pilot</span>
				<span class="metric-label font-garamond">internal sponsorship secured</span>
			</div>
		</div>

		<section class="story-section">
			<div class="section-body font-garamond">
				<p>
					Writing the workflow forced the firm to say what diligence actually is. Which information
					matters, in what order, at what confidence.
				</p>
			</div>
		</section>
	</div>

	<SocialRow />
</div>

<style>
	@import '../story.css';
</style>

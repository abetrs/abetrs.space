<script>
	import SocialRow from '$lib/components/SocialRow.svelte';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/#projects">← Projects</a>

	<h1 class="story-title font-bodoni">TCS Lithium<br />Battery UX</h1>
	<p class="story-meta font-garamond">UX Design Intern · Summer 2024</p>

	<div class="story-lede font-garamond">
		<p>
			Engineers, compliance officers and procurement managers were each running a different version
			of the same lithium-ion supply chain process. No artifact existed that all three could point
			at.
		</p>
		<p>
			Compliance was handled after design, so every regulatory review sent work back to engineering.
			Engineers wanted speed. Compliance wanted an audit trail. Nobody had tried designing for both
			at once.
		</p>
	</div>

	<div class="story-body">
		<section class="story-section">
			<h2 class="section-heading font-bodoni">What I did</h2>
			<ul class="story-list font-garamond">
				<li>
					<strong>Interviewed across all three groups</strong> to define the problem statements, plus
					market research on the battery supply chain.
				</li>
				<li>
					<strong>Made compliance a component state.</strong> Every component shows whether its current
					data meets the regulatory acceptance criteria. You cannot finish a step without producing the
					record it needs.
				</li>
				<li>
					<strong>Built the design system and Figma prototype</strong> around that, with documented components
					and acceptance criteria.
				</li>
				<li>
					<strong>Wrote a white paper</strong> mapping each design decision to the requirement it answers,
					and presented it to the CTO.
				</li>
			</ul>
		</section>

		<div class="metrics-row">
			<div class="metric">
				<span class="metric-num font-bodoni">1</span>
				<span class="metric-label font-garamond">review session to CTO sign-off</span>
			</div>
			<div class="metric">
				<span class="metric-num font-bodoni">25%</span>
				<span class="metric-label font-garamond">cut in time-to-spec</span>
			</div>
			<div class="metric">
				<span class="metric-num font-bodoni">30%</span>
				<span class="metric-label font-garamond">less rework in early engineering</span>
			</div>
		</div>

		<section class="story-section">
			<div class="section-body font-garamond">
				<p>
					Nothing here was new information. The requirements existed and the mental models were
					already misaligned. The design put both on a page where people could argue about them.
				</p>
			</div>
		</section>
	</div>

	<SocialRow />
</div>

<style>
	@import '../story.css';
</style>

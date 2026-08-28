<script>
	import SocialRow from '$lib/components/SocialRow.svelte';
	import dataSection from '$lib/assets/photos/Projects/flathat-data.png';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/#projects">← Projects</a>

	<h1 class="story-title font-bodoni">The Flat Hat<br />Data Section</h1>
	<p class="story-meta font-garamond">Data Editor · 2022–2026</p>

	<div class="story-lede font-garamond">
		<p>
			The Flat Hat had no data section. Campus stories ran on four interviews and an estimate. The
			numbers were sitting in institutional reports, public datasets and the university's own
			filings, and nobody's job was to go get them.
		</p>
		<p>I founded the section in 2022 and ran it until I graduated.</p>
	</div>

	<figure class="story-figure">
		<img
			src={dataSection}
			alt="The Flat Hat's Data section, a dedicated vertical of data-driven campus journalism."
			loading="lazy"
		/>
	</figure>

	<div class="story-body">
		<section class="story-section">
			<h2 class="section-heading font-bodoni">What I did</h2>
			<ul class="story-list font-garamond">
				<li>
					<strong>Hired and managed 5 writers.</strong> Selected for curiosity over technical skill.
					Datawrapper takes an afternoon to teach. Asking what a number means does not.
				</li>
				<li>
					<strong>Built reusable chart templates</strong> in Datawrapper and Flourish so no story waited
					on one person to get a graphic.
				</li>
				<li>
					<strong>Set the review standard.</strong> Figures got checked the way the desk checked quotes.
					Technically correct and contextually misleading still fails.
				</li>
				<li>
					<strong>Opened the section to Sports and News</strong> as a shared resource instead of a vertical
					competing for page space.
				</li>
			</ul>
		</section>

		<div class="metrics-row">
			<div class="metric">
				<span class="metric-num font-bodoni">0 → 20+</span>
				<span class="metric-label font-garamond">articles a year</span>
			</div>
			<div class="metric">
				<span class="metric-num font-bodoni">2</span>
				<span class="metric-label font-garamond">full pages a semester, up from half a page</span>
			</div>
			<div class="metric">
				<span class="metric-num font-bodoni">SPJ</span>
				<span class="metric-label font-garamond">Region 2 Mark of Excellence finalist</span>
			</div>
		</div>

		<section class="story-section">
			<div class="section-body font-garamond">
				<p>The section still publishes. I left in 2026 and it kept running without me.</p>
			</div>
		</section>

		<p class="story-outro font-garamond">
			<a href="/#data">See the charts and the stories they ran in.</a>
		</p>
	</div>

	<SocialRow />
</div>

<style>
	@import '../story.css';

	.story-outro {
		font-size: clamp(14px, 1.2vw, 18px);
		line-height: 1.8;
		color: rgba(0, 0, 0, 0.55);
		margin: 0;
	}
	.story-outro a {
		color: inherit;
		text-decoration: underline;
		text-underline-offset: 3px;
	}
	.story-outro a:hover {
		color: #000;
	}
</style>

<script>
	import SocialRow from '$lib/components/SocialRow.svelte';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/#projects">← Projects</a>

	<h1 class="story-title font-bodoni">The UX Philosophy<br />of This Site</h1>
	<p class="story-meta font-garamond">Design Notes</p>

	<div class="story-lede font-garamond">
		<p>
			Most portfolio sites optimize for surface area. Every skill, every certificate, every tool
			logo in a grid. A business card, not a brochure.
		</p>
	</div>

	<div class="story-body">
		<section class="story-section">
			<h2 class="section-heading font-bodoni">Type</h2>
			<ul class="story-list font-garamond">
				<li><strong>Bodoni Moda</strong> for display. High contrast, commands at size.</li>
				<li><strong>EB Garamond</strong> for body. Old-style, disappears into reading.</li>
				<li>
					<strong>Libre Barcode 128</strong> in the corner, rendering the name machine-readable.
				</li>
				<li>The name is the largest element on the site. Credentials come after.</li>
			</ul>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">Time</h2>
			<ul class="story-list font-garamond">
				<li>The clock reads local time, date and day. Eight cities in the selector.</li>
				<li>
					<strong>Sunrise and sunset drive the palette.</strong> Real times per city from the sunrise-sunset.org
					API. Sky blue by day, amber to crimson for the two hours either side of golden hour, navy at
					night.
				</li>
				<li>Night flips the foreground white. There is no toggle. The sun sets.</li>
			</ul>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">Navigation</h2>
			<ul class="story-list font-garamond">
				<li>Landing state is the name and a single arrow.</li>
				<li>The arrow opens the whole portfolio in one scroll. About, data, work, projects.</li>
				<li>
					<strong>A contents rail</strong> down the left tracks position and jumps. Chips at the top
					below 1080px.
				</li>
				<li>Clicking the name collapses back to the title card.</li>
				<li>Replaced a dropdown menu that hung off each page title.</li>
			</ul>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">Detail</h2>
			<ul class="story-list font-garamond">
				<li>
					<strong>View Transitions API</strong> between pages. 180ms out, 280ms in. Leaving is faster
					than arriving.
				</li>
				<li>
					<strong>A 40px backdrop blur</strong> between the gradient and the content. The background
					is a real element, not a body gradient.
				</li>
				<li>
					<strong>Live Datawrapper embeds</strong> rather than screenshots. Each chart posts its rendered
					height back and the frame resizes to match.
				</li>
			</ul>
		</section>
	</div>

	<SocialRow />
</div>

<style>
	@import '../story.css';
</style>

<script>
	import SocialRow from '$lib/components/SocialRow.svelte';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/#projects">← Projects</a>

	<h1 class="story-title font-bodoni">CricWAR</h1>
	<p class="story-meta font-garamond">Cricket Analytics · Statistical Modelling</p>

	<div class="story-lede font-garamond">
		<p>
			Cricket has kept the same two numbers for a century. Batting average and bowling average, both
			counting every run as equal. A hundred against a collapsing tail on a flat deck scores the
			same as a fifty that held the innings together.
		</p>
		<p>
			Baseball answered this with Wins Above Replacement. Cricket has not, because three formats,
			swinging conditions and role structure make the replacement baseline hard.
		</p>
	</div>

	<div class="story-body">
		<section class="story-section">
			<div class="section-body font-garamond">
				<p>
					CricWAR is my attempt at that translation. In progress. The simulation code is public and
					the working notes are on the newsletter.
				</p>
			</div>
		</section>
	</div>

	<SocialRow />
</div>

<style>
	@import '../story.css';
</style>

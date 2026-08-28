<script>
	import SocialRow from '$lib/components/SocialRow.svelte';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/#projects">← Projects</a>

	<h1 class="story-title font-bodoni">CricWAR</h1>
	<p class="story-meta font-garamond">Cricket Analytics · Statistical Modelling</p>

	<div class="story-body">
		<section class="story-section">
			<h2 class="section-heading font-bodoni">The Averages Are Lying to You</h2>
			<div class="section-body font-garamond">
				<p>
					Cricket has kept the same two numbers for over a century. A batting average and a bowling
					average, both computed as though every run were worth the same as every other run, and
					both perfectly happy to tell you that a hundred against a collapsing tail on a flat deck
					is the equal of a fifty made while the innings was falling apart around you. They are not
					wrong exactly. They are just answering a question nobody asked.
				</p>
				<p>
					Baseball worked through this decades ago and arrived at Wins Above Replacement: not how
					much a player did, but how many wins they account for against what you would have got from
					whoever was next in line. Cricket has resisted the same move, partly because the sport is
					genuinely harder to model — three formats, conditions that swing a match before a ball is
					bowled, and a role structure where an opener and a death bowler are not doing comparable
					jobs in any obvious sense.
				</p>
				<p>
					CricWAR is my attempt at that translation: a simulation and modelling project that
					contextualizes the traditional metrics rather than replacing them, and tries to say how
					many wins a given player is actually responsible for.
				</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">Still Being Written</h2>
			<div class="section-body font-garamond">
				<p>
					The full write-up is not finished, largely because the model isn't either — the
					replacement-level baseline is the part I keep tearing up and starting again. The code is
					public in the meantime, and the ongoing arguments with myself are on the newsletter.
				</p>
			</div>
		</section>
	</div>

	<SocialRow />
</div>

<style>
	@import '../story.css';
</style>

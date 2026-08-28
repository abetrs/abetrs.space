<script>
	import SocialRow from '$lib/components/SocialRow.svelte';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/#projects">← Projects</a>

	<h1 class="story-title font-bodoni">SpleenToTextBot</h1>
	<p class="story-meta font-garamond">Discord Bot · Go · Accessibility</p>

	<div class="story-lede font-garamond">
		<p>
			Voice notes became the default on Discord. They cannot be read in public, searched later, or
			heard at all by anyone with a hearing impairment. Servers ended up with two tiers of member in
			the same conversation.
		</p>
		<p>
			A transcript that arrives in thirty seconds does not fix that. The conversation has moved on.
			I built for under five.
		</p>
	</div>

	<div class="story-body">
		<section class="story-section">
			<h2 class="section-heading font-bodoni">Built</h2>
			<ul class="story-list font-garamond">
				<li>
					<strong>Go, for goroutines.</strong> Several simultaneous transcriptions without a thread per
					request. Four notes landing at once does not queue.
				</li>
				<li>
					<strong>Threaded replies.</strong> The transcript posts on the original message rather than
					as a loose block further down the channel.
				</li>
				<li>
					<strong>OAuth install.</strong> Any server owner can add it without managing credentials or
					standing up infrastructure.
				</li>
			</ul>
		</section>

		<div class="metrics-row">
			<div class="metric">
				<span class="metric-num font-bodoni">&lt;5s</span>
				<span class="metric-label font-garamond">average transcription</span>
			</div>
			<div class="metric">
				<span class="metric-num font-bodoni">Live</span>
				<span class="metric-label font-garamond">public on Discord</span>
			</div>
		</div>

		<section class="story-section">
			<div class="section-body font-garamond">
				<p>
					People started sending voice notes for tone and expecting them to be searchable afterward.
					I did not design for that.
				</p>
			</div>
		</section>
	</div>

	<SocialRow />
</div>

<style>
	@import '../story.css';
</style>

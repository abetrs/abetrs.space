<script>
	import SocialRow from '$lib/components/SocialRow.svelte';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/#projects">← Projects</a>

	<h1 class="story-title font-bodoni">SpleenToTextBot</h1>
	<p class="story-meta font-garamond">Developer Tool · Accessibility · Go</p>

	<div class="story-body">
		<section class="story-section">
			<h2 class="section-heading font-bodoni">The Voice Note Is a Dead End</h2>
			<div class="section-body font-garamond">
				<p>
					Somewhere in the last few years the voice note quietly became the dominant form of
					asynchronous conversation on Discord. It is faster to send than a typed message, it
					carries tone that text flattens, and it lets people be discursive in a way a chat box
					discourages. It is also, by default, a dead end.
				</p>
				<p>
					In public without headphones, a voice note is dead weight. If the sender is speaking your
					third language rather than your first, comprehension falls off a cliff. If you are hard of
					hearing, it may as well not have been sent. And if you want to find the thing somebody
					said three weeks ago, you are out of luck, because you cannot search audio — the message
					exists, and it is functionally invisible.
				</p>
				<p>
					What this produces is not a minor inconvenience. It is a two-tier server: people who can
					hear the note and people who cannot, having what looks like the same conversation. Nobody
					designed that. It just happened, because the medium had no text and nobody thought to give
					it one.
				</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">Latency Is the Whole Design</h2>
			<div class="section-body font-garamond">
				<p>
					The entire problem turned out to be speed. A transcription bot that answers in thirty
					seconds has not solved anything; it has added a second thing to wait for. By the time the
					text lands the conversation has moved on and the transcript is archaeology. The target was
					under five seconds, and everything else was downstream of hitting it.
				</p>
				<p>
					I wrote it in Go for the concurrency model. Goroutines let the bot handle several
					transcriptions at once without paying for a thread per request, which matters exactly when
					it matters most — in an active server where four voice notes land in the same twenty
					seconds and the naive version starts queueing.
				</p>
				<p>
					The bot pulls the audio from Discord's voice note API, hands it to a speech recognition
					model, and posts the transcript as a threaded reply on the original message. Threading was
					the one design decision I argued with myself about, and it was the right call: an orphaned
					block of text further down the channel is a second thing to correlate. In a thread the
					transcript sits where it belongs, attached to what it transcribes.
				</p>
				<p>
					The whole thing is built to be invisible when it works. Nobody has to change how they
					talk, nobody has to invoke it, nobody has to think about it. A good accessibility tool
					does not announce itself; it removes a barrier and then gets out of the way.
				</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">What Happened Instead</h2>
			<div class="section-body font-garamond">
				<p>
					It is live and public. Average transcription is under five seconds. It can be added to any
					server through OAuth without the owner managing credentials or standing up infrastructure,
					because asking a Discord moderator to run a server is the same as not shipping.
				</p>
				<p>
					The interesting outcome was not the accessibility win, which was the point, but the
					behavioral one, which was not. Once transcripts existed, people started using voice notes
					differently. They sent them <em>for</em> the tone — for the register text cannot carry — while
					assuming the content would be readable and searchable afterward. The voice note stopped being
					a terminal artifact and became a first-class part of the conversation history.
				</p>
				<p>
					I did not predict that and cannot take credit for it. We built a tool to remove a barrier
					and accidentally changed what the medium was for. That happens more often than the case
					studies admit.
				</p>
			</div>
		</section>
	</div>

	<SocialRow />
</div>

<style>
	@import '../story.css';
</style>

<script>
	import resumePdf from '$lib/assets/AbhaypradJhaResume.pdf';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/projects">← Projects</a>

	<h1 class="story-title font-bodoni">SpleenToTextBot</h1>
	<p class="story-meta font-garamond">Developer Tool · Accessibility · Go</p>

	<div class="story-body">
		<section class="story-section">
			<h2 class="section-heading font-bodoni">The Problem</h2>
			<div class="section-body font-garamond">
				<p>Voice messages have quietly become the dominant form of async communication on Discord. They're faster to send than typed messages, more expressive than text, and better at capturing tone. But they're deeply inaccessible by default.</p>
				<p>If you're in a public place without headphones, a voice message is dead weight. If the sender speaks a language you don't understand natively, comprehension drops sharply. If you have a hearing impairment, voice notes are effectively invisible. And if you need to search back through a conversation for something someone said, voice notes are opaque — you can't ctrl-F audio.</p>
				<p>The result was fractured conversations. Messages got missed. Community members felt excluded. People who relied on voice notes for nuance were inadvertently creating a two-tier communication system within their own servers.</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">The Approach</h2>
			<div class="section-body font-garamond">
				<p>The core design constraint was latency. A transcription bot that takes thirty seconds to respond doesn't solve the problem — it creates a new one. Slow feedback breaks conversation flow in a way that makes the tool feel like friction rather than aid. The target was sub-five-second response time for the vast majority of messages.</p>
				<p>I chose Go for its lightweight concurrency model. The language's goroutines make it possible to handle multiple simultaneous voice message transcriptions without the overhead of a thread-per-request model. This matters in active Discord servers where several voice messages might arrive in quick succession.</p>
				<p>The bot connects directly to Discord's voice note API, passes the audio to a speech recognition model, and posts the transcript as a threaded reply in the original channel. Threading was a deliberate choice — it preserves the conversational context of the original message rather than flooding the channel with orphaned text blocks. The transcript appears where it belongs: attached to the message it came from.</p>
				<p>The integration is designed to be invisible when it's working. A good accessibility tool disappears into the background — it doesn't announce itself, it doesn't require users to change their behaviour, it just removes a barrier that previously existed.</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">The Outcome</h2>
			<div class="section-body font-garamond">
				<p>SpleenToTextBot is live and publicly available on Discord. Average transcription time is under five seconds. The bot can be added to any server via OAuth without requiring the server owner to manage credentials or infrastructure.</p>
				<p>The behavioural change it produced was more interesting than the accessibility improvement alone. Once transcripts were available, people started treating voice messages differently. They began sending them for nuance — for the emotional register that text can't carry — while expecting them to be readable and searchable afterward. The voice note evolved from a terminal artefact into a first-class piece of conversation history.</p>
				<p>We didn't anticipate that. We built a tool to remove a barrier and inadvertently changed how people thought about the medium.</p>
			</div>
		</section>
	</div>

	<nav class="social-row" aria-label="Links">
		<a class="social-item" href="https://abetheunicorn.substack.com" target="_blank" rel="noopener noreferrer">
			<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/></svg>
			<span class="social-label font-garamond">Cult Classic</span>
		</a>
		<a class="social-item" href="https://github.com/abetrs/SpleenToTextBot" target="_blank" rel="noopener noreferrer">
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

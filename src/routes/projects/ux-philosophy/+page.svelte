<script>
	import SocialRow from '$lib/components/SocialRow.svelte';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/#projects">← Projects</a>

	<h1 class="story-title font-bodoni">The UX Philosophy<br />of This Site</h1>
	<p class="story-meta font-garamond">Design Philosophy · Typography · Interaction</p>

	<div class="story-body">
		<section class="story-section">
			<h2 class="section-heading font-bodoni">Against Comprehensiveness</h2>
			<div class="section-body font-garamond">
				<p>
					Most portfolio sites fail the same way. They try to be complete. Every skill, every
					project, every certificate, every tool logo arranged in a grid, all of it optimizing for
					surface area on the theory that more evidence is more convincing. What you get is a page
					that tells you everything and communicates nothing — a proof of busyness rather than of
					capability.
				</p>
				<p>
					The brief I set myself was the opposite, and I stole most of it from <em>asimorb.com</em>,
					which gets more across through restraint than almost anything else does through density.
					Fixed frame. Led by type. Minimal to the point of being slightly rude. But it still had to
					do real work — convey experience, establish that I can build things, give someone a reason
					to write to me — so the restraint could not just be a mood.
				</p>
				<p>
					A business card, then, rather than a brochure. Anything on the page has to be earning the
					space it takes up.
				</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">Two Typefaces That Don't Belong Together</h2>
			<div class="section-body font-garamond">
				<p>
					The whole typographic system runs on one tension: Bodoni Moda for display, EB Garamond for
					body. These faces are not from the same century and were not designed for the same
					purpose. Bodoni is high-contrast neoclassical, all thin hairlines and vertical stress;
					Garamond is old-style humanist and considerably warmer. Putting them together is the
					point. Bodoni commands at size — it makes a title read as a statement. Garamond disappears
					into readability at small sizes — it makes body text read as talking. Between them you get
					a hierarchy that never needs color or weight to do its job.
				</p>
				<p>
					The largest object on the site is my name. That inverts the usual portfolio logic, which
					leads with credentials and treats the person as metadata attached to them. Here identity
					comes first and everything else — the work, the jobs, the links — unfolds out of it.
				</p>
				<p>
					The Libre Barcode 128 in the corner is a joke I have decided to keep. It renders the name
					as a barcode: machine-readable, permanent, faintly sinister. It suggests that somewhere in
					the infrastructure of the world this person has already been indexed, which is true of
					everyone and worth admitting.
				</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">A Document That Exists in Time</h2>
			<div class="section-body font-garamond">
				<p>
					The clock in the top-left is the part I am most pleased with and the part that took the
					most attempts. It came out of an obvious observation that most sites ignore: a personal
					website is always being read at a particular hour, by a particular person, somewhere in
					particular. The web treats that context as noise. It seemed like the most interesting
					thing available.
				</p>
				<p>
					So the clock shows the time, the date, and the day — and the timezone selector lets a
					visitor re-frame the whole site through their own geography. Choosing Mumbai changes the
					time. More importantly it changes the sky. The site fetches real sunrise and sunset times
					for the selected city from the sunrise-sunset.org API and shifts the background
					accordingly: pale blue through the day, an amber-to-crimson gradient for the two hours
					either side of sunrise and sunset, deep navy at night.
				</p>
				<p>
					Which means the page genuinely looks different depending on when and where you open it.
					Someone reading this in Tokyo at midnight is not looking at what someone in London at noon
					is looking at. Night mode flips the entire foreground to white, but it was never conceived
					as a dark mode toggle — there is no switch. The interface changes because the sun went
					down.
				</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">One Page, and a Rail to Find Your Way</h2>
			<div class="section-body font-garamond">
				<p>
					The site used to be four pages behind a dropdown that hung off each title. I liked the
					gesture — navigation as something you choose rather than something permanently shouting at
					you — and I was wrong about it. A menu that hides is a menu that makes a reader work to
					find out whether there is anything worth their time. Ceremony is only charming when there
					is something on the other side of it, and a visitor who has not seen the work yet has no
					reason to grant you the ceremony.
				</p>
				<p>
					So it is one page now. The landing state is still collapsed — the name and its Hindi,
					centered, with a single arrow pulsing underneath as the only thing to do. Pressing it does
					not open a summary any more. It opens the whole portfolio: about, the data visualization
					work, the jobs, the projects, in one scroll. The name shrinks into a header on the way,
					which is the same animation as before doing a different job.
				</p>
				<p>
					What replaces the dropdown is a contents rail down the left, sticky, right-aligned against
					a hairline rule so it reads as a margin annotation rather than a navigation bar. It tracks
					where you are as you scroll and lets you jump. It is the oldest interface in publishing —
					a table of contents — and it beats a menu because it tells you what exists before you ask.
					Below a thousand pixels or so it collapses into a strip of chips at the top, since a
					margin is a luxury a phone does not have.
				</p>
				<p>
					Clicking the name still collapses everything back to the title card. I kept that because
					there is something satisfying about an interface that can return to its origin, and
					because a site should let you put it down.
				</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">Live Charts, Not Screenshots</h2>
			<div class="section-body font-garamond">
				<p>
					The data journalism section embeds the actual Datawrapper charts rather than pictures of
					them. This costs something — an iframe per chart, a third-party origin, a load that is not
					instant — and it is worth it. A screenshot of a chart is a claim that a chart existed. The
					chart itself is the thing, with its own headline, its own source line, and its own
					tooltips, exactly as it ran in the paper.
				</p>
				<p>
					Each embed posts its rendered height back to the page as it lays out, and the frame
					resizes to match, so nothing sits in a fixed box with an inner scrollbar. It is a small
					piece of plumbing that is invisible when it works, which is the recurring theme.
				</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">The Things You Feel and Can't Name</h2>
			<div class="section-body font-garamond">
				<p>
					Page transitions use the View Transitions API, which lets a cross-document navigation
					behave like an animation inside one document. The outgoing page fades over 180ms, the
					incoming one over 280ms. The asymmetry is deliberate: leaving should feel faster than
					arriving.
				</p>
				<p>
					The blur veil is a fixed element sitting between the background gradient and the content,
					applying a 40px backdrop filter. It softens the sky without hiding it, so the text reads
					as floating above a frosted surface rather than sitting on a flat color. This is the
					reason the background is a real DOM element instead of a gradient on the body — <code
						>backdrop-filter</code
					> needs something behind it that actually exists.
				</p>
				<p>
					None of these announce themselves. They are the kind of thing a visitor registers without
					being able to name: a site that feels more considered than the last one, for reasons they
					could not articulate under questioning. That is the whole ambition. Most good interface
					work is invisible, and the ones that insist on being noticed are usually compensating.
				</p>
			</div>
		</section>
	</div>

	<SocialRow />
</div>

<style>
	@import '../story.css';

	.section-body code {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.88em;
		background: rgba(0, 0, 0, 0.05);
		border-radius: 4px;
		padding: 1px 5px;
	}
</style>

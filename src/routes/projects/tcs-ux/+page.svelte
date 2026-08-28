<script>
	import SocialRow from '$lib/components/SocialRow.svelte';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/#projects">← Projects</a>

	<h1 class="story-title font-bodoni">TCS Lithium<br />Battery UX</h1>
	<p class="story-meta font-garamond">Enterprise UX · Design Systems · B2B</p>

	<div class="story-body">
		<section class="story-section">
			<h2 class="section-heading font-bodoni">Three Teams, One Process, No Shared Map</h2>
			<div class="section-body font-garamond">
				<p>
					The lithium-ion battery supply chain is one of the most heavily regulated things anybody
					has tried to build software for. Every cell has a provenance, every provenance has a
					document, and every document has a regulator who will eventually ask to see it.
				</p>
				<p>
					The problem at TCS was not a shortage of expertise. There was too much of it, held in
					incompatible forms. Engineers, compliance officers, and procurement managers were each
					working from a different private picture of the same process, and there was no artifact
					any of them could point at and say: this is the thing we are building. When three people
					use the same word to mean three different processes, every meeting sounds like agreement
					and every handoff produces a surprise.
				</p>
				<p>
					The cost showed up on schedule. Compliance was handled reactively, so every regulatory
					review produced a new round of design changes, and every round of design changes produced
					engineering rework. Weeks went out of sprints for reasons nobody could point at afterward.
				</p>
				<p>
					Stated plainly: how do you build one interface that serves an engineer who needs speed, a
					compliance officer who needs an audit trail, and a procurement manager who needs
					visibility — without quietly shipping three products?
				</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">Compliance Is a Component State</h2>
			<div class="section-body font-garamond">
				<p>
					I started with interviews across all three groups, and the research surfaced what looked
					at first like a contradiction. Everybody wanted decisions to move faster. Nobody was
					willing to give up an inch of the compliance trail. Read as a contradiction it is
					unresolvable, and you end up arbitrating between departments. Read as a constraint it is
					just a specification: speed and auditability are not opposed, they had simply never been
					designed for at the same time.
				</p>
				<p>
					The reframe the whole project turned on was this: compliance documentation should not be a
					workflow that happens after the design. It should be a property of the interface itself.
					If you cannot complete a step without producing the record the step requires, the audit
					trail stops being paperwork and becomes a byproduct of doing the work.
				</p>
				<p>
					So I built the design system around it. Every component carries a compliance state — a
					visual treatment that says whether the data currently in it meets the regulatory
					acceptance criteria. The compliance officer gets the whole picture at a glance. The
					engineer never has to hold compliance logic in their head, because the component already
					knows. One interface, two mental models, no second product. The Figma prototype existed
					mainly to prove that claim was true rather than merely elegant.
				</p>
				<p>
					Alongside it I wrote a white paper documenting the rationale — not what I had designed,
					which the prototype showed, but why each decision was made and which specific regulatory
					requirement it answered. That was deliberate. It gave the CTO something to sign off <em
						>on</em
					>, rather than a feeling to sign off <em>with</em>.
				</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">Making the Implicit Explicit</h2>
			<div class="section-body font-garamond">
				<p>
					The prototype was signed off in a single review session, which the team told me had not
					happened before. More usefully, the design system cut time-to-spec by 25%: developers
					could go straight from handoff to implementation because the specification was unambiguous
					and the compliance criteria were already written into the component definitions rather
					than living in somebody's inbox.
				</p>
				<p>
					Rework in early engineering cycles dropped by 30%. The mechanism is not mysterious. When a
					component did not match the spec there was now a specific document to point at, instead of
					two people with conflicting memories of a meeting.
				</p>
				<p>
					What I took from it is duller than the numbers and more portable. Nothing I did created
					new information. The compliance requirements already existed. The mental models were
					already misaligned. All the design did was drag both of those things into the open where
					people could argue about them — and it turns out that most of what looks like a process
					problem is really an unwritten assumption that nobody has been forced to write down.
				</p>
			</div>
		</section>

		<div class="metrics-row">
			<div class="metric">
				<span class="metric-num font-bodoni">25%</span>
				<span class="metric-label font-garamond">reduction in time-to-spec</span>
			</div>
			<div class="metric">
				<span class="metric-num font-bodoni">30%</span>
				<span class="metric-label font-garamond">less rework in early engineering</span>
			</div>
			<div class="metric">
				<span class="metric-num font-bodoni">1</span>
				<span class="metric-label font-garamond">review session to CTO sign-off</span>
			</div>
		</div>
	</div>

	<SocialRow />
</div>

<style>
	@import '../story.css';
</style>

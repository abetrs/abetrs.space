<script>
	import SocialRow from '$lib/components/SocialRow.svelte';
	import dataSection from '$lib/assets/photos/Projects/flathat-data.png';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/#projects">← Projects</a>

	<h1 class="story-title font-bodoni">The Flat Hat<br />Data Section</h1>
	<p class="story-meta font-garamond">Editorial Product · Data Journalism · 0 → 1</p>

	<figure class="story-figure">
		<img
			src={dataSection}
			alt="The Flat Hat's Data section — a dedicated vertical of data-driven campus journalism."
			loading="lazy"
		/>
		<figcaption class="fig-caption font-garamond">
			The Data section as it runs today — a vertical that outlasted the people who started it.
		</figcaption>
	</figure>

	<div class="story-body">
		<section class="story-section">
			<h2 class="section-heading font-bodoni">The Anecdote Problem</h2>
			<div class="section-body font-garamond">
				<p>
					Every college newspaper runs on anecdote. You stand outside Swem, you talk to four
					students, one of them says the thing, and the quote carries the piece. It works. It is
					also, in a specific and boring way, a lie: four people are not a campus, and a quote is
					not a pattern.
				</p>
				<p>
					The numbers were there the entire time. They sat in institutional reports, in public
					datasets, in the university's own filings, and nobody in the newsroom had any particular
					reason to go and get them. That isn't a failure of will. It's a failure of infrastructure.
					There was no section, no pipeline, and no person whose job it was, so the work did not
					happen.
				</p>
				<p>
					What The Flat Hat was missing wasn't charts. Charts are easy — anyone can make a bar chart
					in an afternoon. What it was missing was a shared idea of what data journalism is <em
						>for</em
					> in a student paper: the commitment to show the pattern rather than the instance, to make
					a claim a reader can check instead of one they can only feel.
				</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">Founding a Section Is a Product Problem</h2>
			<div class="section-body font-garamond">
				<p>
					You are not producing content. You are defining what the thing is, recruiting the people
					who will make it, building the pipeline they will make it in, and setting the standard it
					has to clear — all at once, with no budget, and with a staff that graduates out from under
					you every four years.
				</p>
				<p>
					The first decision was editorial, and everything else followed from it. A chart that shows
					one number is an infographic. A chart that shows a trend, a disparity, or an anomaly is
					journalism. I recruited five writers and selected for curiosity over technical skill,
					because you can teach someone Datawrapper before lunch and you cannot teach someone to
					look at a number and ask what it actually means.
				</p>
				<p>
					Then I made the tooling boring on purpose. Reusable visualization templates in Datawrapper
					and Flourish meant no story had to route through one person's hands to get a chart, which
					is the bottleneck that quietly kills every section like this. Review treated a number with
					the same suspicion as a quote: a figure that is technically correct and contextually
					misleading is still a bad figure, and it will still embarrass you in print.
				</p>
				<p>
					The last part was political rather than editorial. Sports had data it didn't know what to
					do with. News had stories that would survive contact with a spreadsheet. So I stopped
					treating Data as a vertical competing for page space and started treating it as a service
					the rest of the paper could call on. It doubled what we published, and — more usefully —
					it made the section very hard to cut, because cutting it would have taken three other
					sections down with it.
				</p>
			</div>
		</section>

		<section class="story-section">
			<h2 class="section-heading font-bodoni">What Survived</h2>
			<div class="section-body font-garamond">
				<p>
					Within two years: more than twenty articles a year, a half-page that became two full pages
					a semester, and a Region 2 Mark of Excellence finalist nod from the Society of
					Professional Journalists — which is not nothing for a student paper, and which mostly told
					me the standard we were holding ourselves to was real rather than imagined.
				</p>
				<p>
					The number I actually care about is one. The section still exists. I graduated and it kept
					running, staffed by people I never met, publishing stories I had nothing to do with. A
					thing that outlives its founder is a system; a thing that dies with them was a hobby with
					good branding. I would like to claim I engineered that. In truth I wrote everything down
					and worked from the assumption that I was temporary, which turns out to be most of the
					job.
				</p>
			</div>
		</section>

		<div class="metrics-row">
			<div class="metric">
				<span class="metric-num font-bodoni">20+</span>
				<span class="metric-label font-garamond">articles published annually</span>
			</div>
			<div class="metric">
				<span class="metric-num font-bodoni">2</span>
				<span class="metric-label font-garamond">full pages per semester</span>
			</div>
			<div class="metric">
				<span class="metric-num font-bodoni">SPJ</span>
				<span class="metric-label font-garamond">Region 2 Mark of Excellence finalist</span>
			</div>
		</div>

		<p class="story-outro font-garamond">
			The charts themselves — and the stories they ran in — are collected on the
			<a href="/#data">portfolio's data visualization section</a>.
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

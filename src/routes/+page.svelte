<script>
	import TypewriterText from '$lib/components/TypewriterText.svelte';
	import TableOfContents from '$lib/components/TableOfContents.svelte';
	import DatawrapperChart from '$lib/components/DatawrapperChart.svelte';
	import SocialRow from '$lib/components/SocialRow.svelte';
	import { experiences } from '$lib/data/experiences.js';
	import { projects } from '$lib/data/projects.js';
	import { articles, charts } from '$lib/data/dataviz.js';
	import { fly } from 'svelte/transition';
	import { onMount, tick } from 'svelte';

	let expanded = $state(false);
	let startTypewriter = $state(false);
	let hindiRef = $state(null);
	let arrowTopVh = $state(56);

	const sections = [
		{ id: 'about', label: 'About' },
		{ id: 'data', label: 'Data Visualization' },
		{ id: 'work', label: 'Work Experience' },
		{ id: 'projects', label: 'Projects' }
	];

	function expand() {
		if (expanded) return;
		expanded = true;
		setTimeout(() => {
			startTypewriter = true;
		}, 1400);
	}

	function collapse() {
		if (!expanded) return;
		expanded = false;
		startTypewriter = false;
		if (typeof window !== 'undefined') {
			history.replaceState(null, '', window.location.pathname);
			window.scrollTo({ top: 0 });
		}
	}

	onMount(() => {
		// Deep links like /#projects (used by the story pages' back links) should
		// open straight into the portfolio rather than the collapsed title card.
		const hash = window.location.hash.slice(1);
		if (sections.some((s) => s.id === hash)) {
			expanded = true;
			startTypewriter = true;
			tick().then(() => document.getElementById(hash)?.scrollIntoView());
		}

		function measure() {
			if (hindiRef && !expanded) {
				const rect = hindiRef.getBoundingClientRect();
				arrowTopVh = ((rect.bottom + 20) / window.innerHeight) * 100;
			}
		}
		measure();
		window.addEventListener('resize', measure, { passive: true });
		return () => window.removeEventListener('resize', measure);
	});

	const aboutText = `I build, design, write, play music, make films and DJ. I was raised across five countries, which is roughly how I move between mediums. Three principles: simplicity, practicality, applicability. I am interested in the gap between how things work and how they could work. The friction in systems nobody has questioned. The noise in interfaces that never needed to be loud.`;
</script>

<div class="page" class:expanded>
	<!--
		Stays one element across both states so the name can animate its way
		down to a header rather than being swapped out for a button.
	-->
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<div
		class="name-block"
		class:clickable={expanded}
		role={expanded ? 'button' : 'presentation'}
		tabindex={expanded ? 0 : -1}
		aria-label={expanded ? 'Collapse and return to the title card' : undefined}
		onclick={collapse}
		onkeydown={(event) => {
			if (!expanded) return;
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				collapse();
			}
		}}
	>
		<h1 class="name-en font-bodoni">Abhayprad Jha</h1>
		<p bind:this={hindiRef} class="name-hi font-bodoni">अभयप्रद झा</p>
	</div>

	{#if expanded}
		<div class="portfolio" transition:fly={{ y: 30, duration: 700, delay: 400 }}>
			<div class="rail">
				<TableOfContents {sections} />
			</div>

			<div class="stream">
				<!-- ══ About ══ -->
				<section id="about" class="block">
					<h2 class="block-title font-bodoni">About Me</h2>
					<div class="about-body font-garamond">
						{#if startTypewriter}
							<TypewriterText text={aboutText} speed={22} cursor={true} />
						{:else}
							<span style="opacity:0">{aboutText}</span>
						{/if}
					</div>
				</section>

				<!-- ══ Data Visualization ══ -->
				<section id="data" class="block">
					<h2 class="block-title font-bodoni">Data Visualization</h2>
					<div class="block-intro font-garamond">
						<p>
							Data editor at <em>The Flat Hat</em>, 2022 to 2026. I reported these and built the
							charts.
						</p>
					</div>

					<h3 class="sub-heading font-bodoni">Selected stories</h3>
					<ul class="article-list">
						{#each articles as article (article.id)}
							<li>
								<a class="article" href={article.href} target="_blank" rel="noopener noreferrer">
									<span class="article-title font-garamond">{article.title}</span>
									<span class="article-kicker font-garamond">{article.kicker}</span>
									<span class="article-cue font-garamond">
										The Flat Hat
										<svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
											<path
												d="M2 12L12 2M12 2H5M12 2v7"
												stroke="currentColor"
												stroke-width="1.6"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
									</span>
								</a>
							</li>
						{/each}
					</ul>

					<h3 class="sub-heading font-bodoni">The charts</h3>
					<div class="chart-grid">
						{#each charts as chart (chart.id)}
							{#if chart.kind === 'chart'}
								<DatawrapperChart id={chart.id} height={chart.height} />
							{:else}
								<figure class="chart-figure">
									<a href={chart.href} target="_blank" rel="noopener noreferrer">
										<img src={chart.src} alt={chart.alt} loading="lazy" />
									</a>
									<figcaption class="font-garamond">{chart.caption}</figcaption>
								</figure>
							{/if}
						{/each}
					</div>
				</section>

				<!-- ══ Work Experience ══ -->
				<section id="work" class="block">
					<h2 class="block-title font-bodoni">Work Experience</h2>

					<div class="exp-list">
						{#each experiences as exp (exp.id)}
							<article class="exp">
								<div class="exp-head">
									<span class="exp-logo"><img src={exp.logo} alt="" /></span>
									<div class="exp-id">
										<h3 class="exp-company font-bodoni">{exp.company}</h3>
										<span class="exp-position font-garamond">{exp.position}</span>
									</div>
									<span class="exp-period font-garamond">{exp.period}</span>
								</div>

								<p class="exp-desc font-garamond">{exp.description}</p>

								<ul class="bullets font-garamond">
									{#each exp.bullets as bullet, i (i)}
										<li>{bullet}</li>
									{/each}
								</ul>

								{#if exp.storyHref}
									<a class="cue font-garamond" href={exp.storyHref}>
										Read the story
										<svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
											<path
												d="M1 12L11 2M11 2H4M11 2v7"
												stroke="currentColor"
												stroke-width="1.4"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
									</a>
								{/if}
							</article>
						{/each}
					</div>
				</section>

				<!-- ══ Projects ══ -->
				<section id="projects" class="block">
					<h2 class="block-title font-bodoni">Projects</h2>

					<a class="ux-token font-garamond" href="/projects/ux-philosophy">
						About the UX philosophy of this site →
					</a>

					<div class="projects-grid">
						{#each projects as project (project.id)}
							<article class="project-card">
								<h3 class="card-title font-bodoni">{project.title}</h3>
								<span class="card-meta font-garamond">{project.meta}</span>
								<p class="card-summary font-garamond">{project.summary}</p>
								<a class="cue font-garamond" href={project.storyHref}>
									Read the story
									<svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
										<path
											d="M1 12L11 2M11 2H4M11 2v7"
											stroke="currentColor"
											stroke-width="1.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</a>
								{#if project.link}
									<div class="card-divider"></div>
									<a
										class="card-link font-garamond"
										href={project.link}
										target="_blank"
										rel="noopener noreferrer"
									>
										{project.linkLabel}
										<svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
											<path
												d="M2 12L12 2M12 2H5M12 2v7"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
									</a>
								{/if}
							</article>
						{/each}
					</div>
				</section>

				<SocialRow />
			</div>
		</div>
	{/if}
</div>

{#if !expanded}
	<button
		class="arrow-btn"
		style="top: calc({arrowTopVh}vh + 28px)"
		onclick={expand}
		aria-label="Explore"
	>
		<svg width="28" height="32" viewBox="0 0 28 32" fill="none">
			<line
				x1="14"
				y1="2"
				x2="14"
				y2="22"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
			/>
			<polyline
				points="6,15 14,24 22,15"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>
{/if}

<style>
	.page {
		position: relative;
		z-index: 20;
		padding-top: calc(50vh - 90px);
		padding-left: 2rem;
		padding-right: 2rem;
		padding-bottom: 6rem;
		min-height: 100vh;
		max-width: 860px;
		margin: 0 auto;
		transition:
			padding-top 0.9s cubic-bezier(0.4, 0, 0.2, 1),
			max-width 0.9s ease;
	}
	.page.expanded {
		padding-top: 72px;
		max-width: 1240px;
	}

	.name-block {
		text-align: center;
	}
	.name-block.clickable {
		cursor: pointer;
	}

	.name-en {
		font-size: clamp(48px, 8vw, 118px);
		font-weight: 400;
		line-height: 1;
		letter-spacing: -0.02em;
		color: #000;
		transition: font-size 0.9s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.page.expanded .name-en {
		font-size: clamp(26px, 3.6vw, 50px);
	}

	.name-hi {
		margin-top: 0.5rem;
		font-size: clamp(18px, 2.4vw, 40px);
		font-weight: 400;
		color: #000;
		opacity: 0.72;
		transition:
			font-size 0.9s cubic-bezier(0.4, 0, 0.2, 1),
			opacity 0.9s ease;
	}
	.page.expanded .name-hi {
		font-size: clamp(12px, 1.3vw, 20px);
		opacity: 0.45;
	}

	/* ══ Portfolio shell: contents rail + scrolling stream ══ */
	.portfolio {
		display: grid;
		grid-template-columns: 210px minmax(0, 1fr);
		gap: 56px;
		margin-top: 56px;
	}

	.rail {
		position: relative;
	}

	.stream {
		display: flex;
		flex-direction: column;
		gap: 96px;
		min-width: 0;
	}

	.block {
		scroll-margin-top: 120px;
	}

	.block-title {
		font-size: clamp(34px, 4.4vw, 68px);
		font-weight: 400;
		line-height: 1;
		text-align: right;
		color: #000;
		margin: 0 0 10px;
		letter-spacing: -0.01em;
	}
	.block > .block-title {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		padding-bottom: 18px;
		margin-bottom: 32px;
	}

	.sub-heading {
		font-size: clamp(18px, 1.7vw, 26px);
		font-weight: 400;
		color: #000;
		text-align: right;
		margin: 48px 0 20px;
		opacity: 0.75;
	}

	.block-intro {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	.block-intro p {
		font-size: clamp(15px, 1.25vw, 19px);
		line-height: 1.85;
		color: rgba(0, 0, 0, 0.72);
		margin: 0;
	}

	.about-body {
		font-size: clamp(15px, 1.3vw, 20px);
		line-height: 1.9;
		color: #000;
	}

	/* ── Shared "read the story" cue ── */
	.cue {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: clamp(13px, 1.05vw, 16px);
		color: rgba(0, 0, 0, 0.72);
		text-decoration: none;
		letter-spacing: 0.01em;
		transition:
			color 0.15s ease,
			gap 0.15s ease;
		align-self: flex-start;
	}
	.cue:hover {
		color: #000;
		gap: 10px;
	}

	/* ══ Data visualization ══ */
	.article-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0;
		margin: 0;
		padding: 0;
		border-top: 1px solid rgba(0, 0, 0, 0.09);
	}

	.article {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		grid-template-areas: 'title cue' 'kicker cue';
		column-gap: 24px;
		row-gap: 4px;
		align-items: center;
		padding: 20px 4px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.09);
		text-decoration: none;
		transition:
			padding-left 0.18s ease,
			background 0.18s ease;
	}
	.article:hover {
		padding-left: 14px;
		background: rgba(255, 255, 255, 0.45);
	}

	.article-title {
		grid-area: title;
		font-size: clamp(16px, 1.35vw, 21px);
		color: #000;
		line-height: 1.35;
	}
	.article-kicker {
		grid-area: kicker;
		font-size: clamp(13px, 1.05vw, 16px);
		color: rgba(0, 0, 0, 0.5);
		line-height: 1.5;
	}
	.article-cue {
		grid-area: cue;
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 12px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: rgba(0, 0, 0, 0.38);
		white-space: nowrap;
	}
	.article:hover .article-cue {
		color: rgba(0, 0, 0, 0.72);
	}

	.chart-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 22px;
	}

	.chart-figure {
		display: flex;
		flex-direction: column;
		gap: 10px;
		background: rgba(255, 255, 255, 0.82);
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 12px;
		padding: 18px 18px 12px;
		margin: 0;
		transition: box-shadow 0.22s ease;
	}
	.chart-figure:hover {
		box-shadow: 0 8px 28px rgba(0, 0, 0, 0.09);
	}
	.chart-figure img {
		width: 100%;
		height: auto;
		display: block;
	}
	.chart-figure figcaption {
		font-size: 12px;
		letter-spacing: 0.03em;
		color: rgba(0, 0, 0, 0.38);
		text-align: right;
	}

	/* ══ Work experience ══ */
	.exp-list {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.exp {
		display: flex;
		flex-direction: column;
		gap: 14px;
		background: rgba(255, 255, 255, 0.8);
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 12px;
		padding: 26px 28px 24px;
		transition:
			box-shadow 0.22s ease,
			transform 0.22s ease;
	}
	.exp:hover {
		box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);
		transform: translateY(-2px);
	}

	.exp-head {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.exp-logo {
		width: 52px;
		height: 52px;
		flex-shrink: 0;
		border-radius: 50%;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.04);
		border: 1px solid rgba(0, 0, 0, 0.08);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.exp-logo img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.exp-id {
		display: flex;
		flex-direction: column;
		gap: 3px;
		flex: 1;
		min-width: 0;
	}

	.exp-company {
		font-size: clamp(19px, 1.8vw, 27px);
		font-weight: 400;
		line-height: 1.15;
		color: #000;
		margin: 0;
	}
	.exp-position {
		font-size: clamp(13px, 1.05vw, 16px);
		color: rgba(0, 0, 0, 0.55);
	}
	.exp-period {
		font-size: clamp(12px, 1vw, 14px);
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: rgba(0, 0, 0, 0.4);
		white-space: nowrap;
		align-self: flex-start;
		padding-top: 4px;
	}

	.exp-desc {
		font-size: clamp(14px, 1.15vw, 18px);
		line-height: 1.8;
		color: rgba(0, 0, 0, 0.72);
		margin: 0;
	}

	.bullets {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: 0;
		padding: 18px 0 0;
		border-top: 1px solid rgba(0, 0, 0, 0.08);
	}
	.bullets li {
		position: relative;
		padding-left: 20px;
		font-size: clamp(13px, 1.05vw, 16px);
		line-height: 1.7;
		color: rgba(0, 0, 0, 0.65);
	}
	.bullets li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.66em;
		width: 9px;
		height: 1px;
		background: rgba(0, 0, 0, 0.28);
	}

	/* ══ Projects ══ */
	.ux-token {
		display: block;
		width: fit-content;
		font-size: clamp(12px, 1vw, 14px);
		color: rgba(0, 0, 0, 0.42);
		text-decoration: none;
		letter-spacing: 0.04em;
		border: 1px solid rgba(0, 0, 0, 0.14);
		border-radius: 20px;
		padding: 5px 14px;
		margin: 0 0 28px auto;
		transition:
			color 0.15s ease,
			border-color 0.15s ease;
	}
	.ux-token:hover {
		color: #000;
		border-color: rgba(0, 0, 0, 0.35);
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 22px;
	}

	.project-card {
		background: rgba(255, 255, 255, 0.8);
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 12px;
		padding: 24px 26px 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		transition:
			box-shadow 0.22s ease,
			transform 0.22s ease;
	}
	.project-card:hover {
		box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);
		transform: translateY(-3px);
	}

	.card-title {
		font-size: clamp(18px, 1.6vw, 24px);
		font-weight: 400;
		color: #000;
		line-height: 1.2;
		margin: 0;
	}
	.card-meta {
		font-size: 11px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(0, 0, 0, 0.38);
	}
	.card-summary {
		font-size: clamp(13px, 1.1vw, 16px);
		line-height: 1.75;
		color: rgba(0, 0, 0, 0.65);
		flex: 1;
		margin: 0;
	}
	.card-divider {
		height: 1px;
		background: rgba(0, 0, 0, 0.07);
		margin: 2px 0;
	}

	.card-link {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: clamp(11px, 0.9vw, 13px);
		color: rgba(0, 0, 0, 0.38);
		text-decoration: none;
		letter-spacing: 0.03em;
		align-self: flex-start;
		transition:
			color 0.15s ease,
			gap 0.15s ease;
	}
	.card-link:hover {
		color: rgba(0, 0, 0, 0.7);
		gap: 8px;
	}

	/* ══ Arrow ══ */
	.arrow-btn {
		position: fixed;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 20;
		background: none;
		border: none;
		cursor: pointer;
		padding: 10px;
		color: rgba(0, 0, 0, 0.55);
		animation: bounce 2.2s ease-in-out infinite;
	}
	@keyframes bounce {
		0%,
		100% {
			transform: translate(-50%, -50%) translateY(0);
		}
		50% {
			transform: translate(-50%, -50%) translateY(7px);
		}
	}

	/* ══ Responsive ══ */
	@media (max-width: 1080px) {
		/* Drop the grid so the rail can stick against the whole portfolio column
		   rather than against a one-row grid area the height of itself. */
		.portfolio {
			display: block;
		}
		.rail {
			position: sticky;
			top: 64px;
			z-index: 30;
			margin-bottom: 40px;
			--toc-bleed: 2rem;
		}
		.stream {
			gap: 72px;
		}
	}

	@media (max-width: 760px) {
		.chart-grid,
		.projects-grid {
			grid-template-columns: minmax(0, 1fr);
		}
		.exp-head {
			flex-wrap: wrap;
		}
		.exp-period {
			width: 100%;
			padding-top: 0;
		}
		.article {
			grid-template-columns: minmax(0, 1fr);
			grid-template-areas: 'cue' 'title' 'kicker';
			row-gap: 6px;
		}
		.article-cue {
			justify-self: flex-start;
		}
		.block-title {
			text-align: left;
		}
		.sub-heading {
			text-align: left;
		}
		.ux-token {
			margin-left: 0;
		}
	}
</style>

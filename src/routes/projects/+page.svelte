<script>
	import { slide } from 'svelte/transition';
	import resumePdf from '$lib/assets/AbhaypradJhaResume.pdf';

	const navLinks = [
		{ label: 'Bio',             href: '/'            },
		{ label: 'Work Experience', href: '/internships' },
		{ label: 'Projects',        href: '/projects'    },
		{ label: 'Hobbies',         href: '/hobbies'     },
	];

	const projects = [
		{
			id: 'bp-agentic',
			title: 'Black Pearl AI Due Diligence',
			summary: 'A Claude-based agentic workflow to automate venture capital due diligence. Synthesises pitch decks, market data, and financials into structured investment memos — cutting initial screening time by an estimated 40%.',
			storyHref: '/projects/black-pearl',
			link: 'https://www.figma.com/slides/8mwqkeYUqmmdhKKFxmuFxD',
			linkLabel: 'View Deck',
		},
		{
			id: 'flathat',
			title: 'The Flat Hat — Data',
			summary: 'Founded and scaled the data journalism section of William & Mary\'s student newspaper from zero to 20+ articles annually. Region 2 SPJ Mark of Excellence finalist.',
			storyHref: '/projects/flat-hat',
			link: 'https://flathatnews.com/category/data/',
			linkLabel: 'View Section',
		},
		{
			id: 'tcs-ux',
			title: 'TCS Lithium Battery UX',
			summary: 'End-to-end UX design for an enterprise lithium-ion battery supply chain platform at TCS. Delivered a Figma prototype with compliance acceptance criteria, securing CTO sign-off and reducing engineering rework by 30%.',
			storyHref: '/projects/tcs-ux',
			link: null,
			linkLabel: null,
		},
		{
			id: 'spleen',
			title: 'SpleenToTextBot',
			summary: 'A Discord bot that transcribes voice messages to text in real time, making conversations accessible for every server member. Built in Go for performance and low latency.',
			storyHref: '/projects/spleen',
			link: 'https://github.com/abetrs/SpleenToTextBot',
			linkLabel: 'GitHub',
		},
		{
			id: 'cricwar',
			title: 'CricWAR',
			summary: 'A cricket analytics platform applying WAR (Wins Above Replacement) methodology to the sport. Builds statistical models that contextualise traditional metrics and quantify individual player contributions to team wins.',
			storyHref: '/projects/cricwar',
			link: 'https://github.com/abetrs/cricket-sim',
			linkLabel: 'GitHub',
		},
	];

	let dropdownOpen = $state(false);
	function toggleDropdown() { dropdownOpen = !dropdownOpen; }
</script>

<div class="page">
	<button class="section-title-btn" onclick={toggleDropdown} aria-expanded={dropdownOpen}>
		<h1 class="section-title font-bodoni">Projects</h1>
		<svg class="section-chevron" class:open={dropdownOpen} width="24" height="14" viewBox="0 0 24 14" fill="none" aria-hidden="true">
			<polyline points="2,2 12,12 22,2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</button>

	{#if dropdownOpen}
		<nav class="nav-dropdown font-garamond" transition:slide={{ duration: 340 }}>
			{#each navLinks as link (link.href)}
				<a class="dropdown-item" href={link.href}>{link.label}</a>
			{/each}
		</nav>
	{/if}

	<a class="ux-token font-garamond" href="/projects/ux-philosophy">
		About the UX philosophy of this site →
	</a>

	<div class="projects-grid">
		{#each projects as project (project.id)}
			<div class="project-card">
				<h2 class="card-title font-bodoni">{project.title}</h2>
				<p class="card-summary font-garamond">{project.summary}</p>
				<a class="card-learn-more font-garamond" href={project.storyHref}>
					Learn more
					<svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
						<path d="M1 12L11 2M11 2H4M11 2v7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</a>
				{#if project.link}
					<div class="card-divider"></div>
					<a class="card-link font-garamond" href={project.link} target="_blank" rel="noopener noreferrer">
						{project.linkLabel}
						<svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
							<path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</a>
				{/if}
			</div>
		{/each}
	</div>

	<nav class="social-row" aria-label="Links">
		<a class="social-item" href="https://abetheunicorn.substack.com" target="_blank" rel="noopener noreferrer">
			<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
			</svg>
			<span class="social-label font-garamond">Cult Classic</span>
		</a>
		<a class="social-item" href="https://cricwar.substack.com" target="_blank" rel="noopener noreferrer">
			<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<rect x="8" y="2" width="8" height="13" rx="4"/>
				<rect x="11" y="15" width="2" height="7" rx="1"/>
			</svg>
			<span class="social-label font-garamond">CricWAR</span>
		</a>
		<a class="social-item" href="https://github.com/abetrs" target="_blank" rel="noopener noreferrer">
			<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
			</svg>
			<span class="social-label font-garamond">GitHub</span>
		</a>
		<a class="social-item" href="https://www.linkedin.com/in/abhayprad-jha-b12390223/" target="_blank" rel="noopener noreferrer">
			<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
				<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
			</svg>
			<span class="social-label font-garamond">LinkedIn</span>
		</a>
		<a class="social-item" href={resumePdf} target="_blank" rel="noopener noreferrer">
			<svg class="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
				<polyline points="14 2 14 8 20 8"/>
				<line x1="8" y1="13" x2="16" y2="13"/>
				<line x1="8" y1="17" x2="16" y2="17"/>
			</svg>
			<span class="social-label font-garamond">Resume</span>
		</a>
	</nav>
</div>

<style>
	.page {
		position: relative;
		z-index: 20;
		padding-top: 72px;
		padding-left: 2rem;
		padding-right: 2rem;
		padding-bottom: 6rem;
		min-height: 100vh;
		max-width: 960px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	.section-title-btn {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 14px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		width: 100%;
		margin-bottom: 24px;
		transition: transform 0.18s ease;
	}
	.section-title-btn:hover { transform: scale(1.04); transform-origin: right center; }

	.section-title {
		font-size: clamp(40px, 5vw, 80px);
		font-weight: 400;
		line-height: 1;
		color: #000;
		margin: 0;
	}

	.section-chevron {
		color: #000;
		flex-shrink: 0;
		transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.section-chevron.open { transform: rotate(180deg); }

	.nav-dropdown {
		display: flex;
		flex-direction: column;
		gap: 0;
		margin-bottom: 32px;
		border-right: 2px solid rgba(0, 0, 0, 0.12);
		padding-right: 20px;
		align-items: flex-end;
	}

	.dropdown-item {
		font-size: clamp(16px, 1.5vw, 22px);
		font-weight: 400;
		color: #000;
		text-decoration: none;
		padding: 10px 0;
		letter-spacing: 0.02em;
		opacity: 0.75;
		display: inline-block;
		transform-origin: right center;
		transition: opacity 0.15s ease, transform 0.15s ease;
	}
	.dropdown-item:hover { opacity: 1; transform: scale(1.12); }

	/* ── UX philosophy token ── */
	.ux-token {
		display: inline-block;
		align-self: flex-end;
		font-size: clamp(12px, 1vw, 14px);
		color: rgba(0, 0, 0, 0.42);
		text-decoration: none;
		letter-spacing: 0.04em;
		border: 1px solid rgba(0, 0, 0, 0.14);
		border-radius: 20px;
		padding: 5px 14px;
		margin-bottom: 32px;
		transition: color 0.15s ease, border-color 0.15s ease;
	}
	.ux-token:hover { color: #000; border-color: rgba(0,0,0,0.35); }

	/* ── Projects grid ── */
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 22px;
		margin-top: 48px;
	}

	.project-card {
		background: rgba(255, 255, 255, 0.80);
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 12px;
		padding: 24px 26px 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		transition: box-shadow 0.22s ease, transform 0.22s ease;
	}
	.project-card:hover {
		box-shadow: 0 8px 28px rgba(0, 0, 0, 0.10);
		transform: translateY(-3px);
	}

	.card-title {
		font-size: clamp(17px, 1.5vw, 22px);
		font-weight: 400;
		color: #000;
		line-height: 1.2;
		margin: 0;
	}

	.card-summary {
		font-size: clamp(13px, 1.1vw, 16px);
		line-height: 1.75;
		color: rgba(0, 0, 0, 0.65);
		flex: 1;
		margin: 0;
	}

	.card-learn-more {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: clamp(13px, 1.1vw, 16px);
		color: rgba(0, 0, 0, 0.72);
		text-decoration: none;
		letter-spacing: 0.01em;
		transition: color 0.15s ease, gap 0.15s ease;
	}
	.card-learn-more:hover { color: #000; gap: 10px; }

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
		transition: color 0.15s ease, gap 0.15s ease;
		letter-spacing: 0.03em;
	}
	.card-link:hover { color: rgba(0,0,0,0.70); gap: 8px; }

	/* ── Social row ── */
	.social-row {
		display: flex;
		justify-content: center;
		gap: 40px;
		margin-top: auto;
		padding-top: 52px;
		padding-bottom: 2rem;
	}

	.social-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 18px;
		text-decoration: none;
		color: #000;
	}

	.social-icon {
		width: 36px;
		height: 36px;
		transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.social-item:hover .social-icon { transform: scale(1.55); }

	.social-label {
		font-family: 'Bodoni Moda', 'Bodoni 72', 'Didot', Georgia, serif;
		font-size: 27px;
		font-weight: 400;
		letter-spacing: 0.01em;
		opacity: 0;
		transform: translateY(4px);
		transition: opacity 0.18s ease, transform 0.18s ease;
		white-space: nowrap;
	}
	.social-item:hover .social-label { opacity: 1; transform: translateY(0); }

	@media (max-width: 700px) {
		.projects-grid { grid-template-columns: 1fr; }
		.social-row   { flex-direction: column; align-items: center; gap: 18px; padding-top: 36px; }
		.social-item  { flex-direction: row; gap: 14px; }
		.social-icon  { width: 22px; height: 22px; }
		.social-label { font-size: 18px; opacity: 1; transform: none; }
		.social-item:hover .social-icon { transform: none; }
	}

	@media (min-width: 701px) and (max-width: 960px) {
		.projects-grid { grid-template-columns: repeat(2, 1fr); }
	}
</style>

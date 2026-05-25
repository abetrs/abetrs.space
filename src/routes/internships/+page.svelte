<script>
	import { slide, fly } from 'svelte/transition';
	import { tick } from 'svelte';
	import resumePdf    from '$lib/assets/AbhaypradJhaResume.pdf';
	import wmLogo       from '$lib/assets/photos/College/WilliamandMary.png';
	import bpLogo       from '$lib/assets/photos/Internships/black_pearl_global_investments_logo-3394222977.jpeg';
	import deloitteLogo from '$lib/assets/photos/Internships/us-deloitte-logo-707218455.jpg';
	import tcsLogo      from '$lib/assets/photos/Internships/TCS-Logo-Tata-consultancy-service-3916172614.png';

	const navLinks = [
		{ label: 'Bio',             href: '/'            },
		{ label: 'Work Experience', href: '/internships' },
		{ label: 'Hobbies',         href: '/hobbies'     },
	];

	const experiences = [
		{
			id: 'tcs',
			company: 'TCS',
			logo: tcsLogo,
			position: 'UX Design Intern',
			period: 'May – Aug 2024',
			description: 'Led end-to-end UX design for a lithium-ion battery supply chain solution, conducting user research and developing a design system for enterprise IT.',
			bullets: [
				'Conducted user and market research on the lithium-ion battery supply chain to define problem statements',
				'Led end-to-end design; documented design-system components that cut time-to-spec by 25%',
				'Turned supply-chain interviews into a Figma prototype with compliance acceptance criteria, enabling CTO sign-off',
				'Authored and presented a white paper on design rationale, successfully advocating for the solution to the CTO',
				'Reduced rework by 30% in early engineering cycles through improved design handoff',
			],
		},
		{
			id: 'deloitte',
			company: 'Deloitte',
			logo: deloitteLogo,
			position: 'Product Strategy Intern',
			period: 'Jan 2025',
			description: 'Converted market research into actionable product strategies, focusing on post-pandemic demand signals and stakeholder alignment for new product opportunities.',
			bullets: [
				'Converted post-pandemic demand signals into 3 product opportunity briefs with must-test assumptions',
				'Secured stakeholder alignment in one workshop and green-lighted pilots',
				'Translated research findings into actionable product strategies for SMEs and industry leaders',
				'Standardized the decision pack (market sizing, comps, risks), reducing review cycles across SME groups',
			],
		},
		{
			id: 'wm',
			company: 'William & Mary',
			logo: wmLogo,
			position: 'Research Assistant – SBOM Tool Analysis',
			period: 'Jan 2025 – Present',
			description: 'Authored a research paper conducting comparative analysis of 15+ SBOM generation tools across Python, JavaScript, Java, and Go ecosystems, quantifying dependency identification accuracy and completeness through systematic testing.',
			bullets: [
				'Engineered automated frameworks to evaluate SBOM tool performance, identifying coverage gaps and documenting metadata capture capabilities across enterprise repositories.',
			],
		},
		{
			id: 'bp',
			company: 'Black Pearl Global',
			logo: bpLogo,
			position: 'Venture Capital Intern',
			period: 'Jun – Aug 2025',
			description: 'Scaled deal flow and shaped investment strategy for a VC firm, focusing on integrating AI into the VC lifecycle and developing strategic partnerships.',
			bullets: [
				'Scaled up deal flow by sourcing a network of 15+ strategic ecosystem partners and 30+ prospective limited partners',
				"Authored the firm's strategic roadmap for integrating Generative and Agentic AI into the VC lifecycle",
				'Engineered a proof-of-concept LLM-based tool to automate due diligence, reducing initial screening time by an estimated 40%',
				'Co-authored a $10M fund thesis with explicit entry & kill signals, shortening IC prep by 25% and improving go/no-go clarity',
			],
		},
	];

	let dropdownOpen  = $state(false);
	let hoveredId     = $state(null);
	let activeId      = $state(null);
	let detailCardEl  = $state(null);

	$effect(() => {
		if (activeId) {
			tick().then(() => {
				detailCardEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
			});
		}
	});

	// The experience to display in the centered card
	let displayExp = $derived(
		experiences.find(e => e.id === (activeId ?? hoveredId)) ?? null
	);

	function toggleDropdown() { dropdownOpen = !dropdownOpen; }
	function toggleCard(id)   { activeId = activeId === id ? null : id; }
</script>

<div class="page">
	<!-- ── Title with nav dropdown (exact mirror of About Me on home) ── -->
	<button class="section-title-btn" onclick={toggleDropdown} aria-expanded={dropdownOpen}>
		<h1 class="section-title font-bodoni">Work Experience</h1>
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

	<!-- ── Timeline (always visible, like the about body text) ── -->
	<div class="timeline-outer">
		<div class="nodes">
			{#each experiences as exp (exp.id)}
				<div class="node-col">
					<span class="period font-garamond">{exp.period}</span>

					<button
						class="logo-btn"
						class:active={activeId === exp.id}
						onmouseenter={() => (hoveredId = exp.id)}
						onmouseleave={() => (hoveredId = null)}
						onclick={() => toggleCard(exp.id)}
						aria-pressed={activeId === exp.id}
						aria-label={exp.company}
					>
						<img class="logo-img" src={exp.logo} alt={exp.company} />
					</button>

					<span class="company-name font-bodoni">{exp.company}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Centered detail card — shown for whichever node is hovered or active -->
	{#if displayExp}
		{#key displayExp.id}
			<div class="detail-card" bind:this={detailCardEl} transition:fly={{ y: 10, duration: 200 }}>
				<h3 class="card-title font-bodoni">{displayExp.position}</h3>
				<p class="card-desc font-garamond">{displayExp.description}</p>

				{#if activeId === displayExp.id}
					<ul class="bullets font-garamond" transition:slide={{ duration: 260 }}>
						{#each displayExp.bullets as bullet}
							<li>{bullet}</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/key}
	{/if}

	<!-- ── Social row (exact copy from home page) ── -->
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
		max-width: 860px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	/* ── Title button (exact mirror of about-title-btn on home) ── */
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

	.section-title-btn:hover {
		transform: scale(1.04);
		transform-origin: right center;
	}

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

	.section-chevron.open {
		transform: rotate(180deg);
	}

	/* ── Nav dropdown (exact mirror of about-dropdown on home) ── */
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

	.dropdown-item:hover {
		opacity: 1;
		transform: scale(1.12);
	}

	/* ── Timeline ── */
	.timeline-outer {
		position: relative;
		margin-top: 52px;
		margin-bottom: 52px;
	}

	.timeline-outer::before {
		content: '';
		position: absolute;
		top: 74px;
		left: 12.5%;
		right: 12.5%;
		height: 1.5px;
		background: rgba(0, 0, 0, 0.14);
		pointer-events: none;
	}

	.nodes {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 16px;
	}

	.node-col {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 0;
	}

	.period {
		font-size: 13px;
		color: rgba(0, 0, 0, 0.48);
		margin-bottom: 16px;
		text-align: center;
		letter-spacing: 0.03em;
		white-space: nowrap;
	}

	.logo-btn {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		border: 1.5px solid rgba(0, 0, 0, 0.12);
		background: rgba(255, 255, 255, 0.88);
		overflow: hidden;
		cursor: pointer;
		padding: 0;
		flex-shrink: 0;
		position: relative;
		z-index: 1; /* sits above the ::before track line */
		transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1),
		            box-shadow 0.22s ease,
		            border-color 0.22s ease;
	}

	.logo-btn:hover,
	.logo-btn.active {
		transform: scale(1.16);
		box-shadow: 0 6px 26px rgba(0, 0, 0, 0.13);
		border-color: rgba(0, 0, 0, 0.28);
	}

	.logo-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.company-name {
		font-size: 13px;
		font-weight: 400;
		color: rgba(0, 0, 0, 0.62);
		margin-top: 10px;
		text-align: center;
		letter-spacing: 0.01em;
	}

	/* ── Centered detail card ── */
	.detail-card {
		margin: 40px auto 0;
		padding: 28px 36px;
		background: rgba(255, 255, 255, 0.80);
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 12px;
		width: 75%;
		max-width: 680px;
	}

	.card-title {
		font-size: clamp(22px, 2.1vw, 32px);
		font-weight: 400;
		line-height: 1.25;
		color: #000;
		margin-bottom: 14px;
	}

	.card-desc {
		font-size: clamp(18px, 1.7vw, 26px);
		line-height: 1.72;
		color: rgba(0, 0, 0, 0.68);
	}

	.bullets {
		list-style: none;
		padding: 0;
		margin-top: 18px;
		border-top: 1px solid rgba(0, 0, 0, 0.07);
		padding-top: 16px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.bullets li {
		font-size: clamp(16px, 1.55vw, 22px);
		line-height: 1.68;
		color: rgba(0, 0, 0, 0.72);
		padding-left: 20px;
		position: relative;
	}

	.bullets li::before {
		content: '·';
		position: absolute;
		left: 6px;
		color: rgba(0, 0, 0, 0.32);
	}

	/* ── Social row (exact copy from home page) ── */
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

	.social-item:hover .social-icon {
		transform: scale(1.55);
	}

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

	.social-item:hover .social-label {
		opacity: 1;
		transform: translateY(0);
	}
</style>

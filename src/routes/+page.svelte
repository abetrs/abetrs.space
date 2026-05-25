<script>
	import TypewriterText from '$lib/components/TypewriterText.svelte';
	import { fly, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import resumePdf from '$lib/assets/AbhaypradJhaResume.pdf';

	let expanded        = $state(false);
	let startTypewriter = $state(false);
	let hindiRef        = $state(null);
	let arrowTopVh      = $state(56);
	let dropdownOpen    = $state(false);

	function expand() {
		if (expanded) return;
		expanded = true;
		setTimeout(() => { startTypewriter = true; }, 1400);
	}

	function toggleDropdown() { dropdownOpen = !dropdownOpen; }

	const navLinks = [
		{ label: 'Bio',             href: '/'            },
		{ label: 'Work Experience', href: '/internships' },
		{ label: 'Hobbies',         href: '/hobbies'     },
	];

	onMount(() => {
		function measure() {
			if (hindiRef && !expanded) {
				const rect = hindiRef.getBoundingClientRect();
				arrowTopVh = (rect.bottom + 20) / window.innerHeight * 100;
			}
		}
		measure();
		window.addEventListener('resize', measure, { passive: true });
		return () => window.removeEventListener('resize', measure);
	});

	const aboutText = `I'm Abhayprad Jha, a Computer Science and Economics student at William & Mary (Class of 2026), blending my passion for building products with a fascination for modelling the world around me. I come from a global background, having grown across 5 different countries. My experience learning from different perspectives has fostered a habit of interdisciplinary thinking and innovation. With internships at Deloitte, TCS and Black Pearl Global Investments, I've honed skills in full-stack development, data analysis, and digital transformation. My goal is to craft user-centered digital experiences that solve real-world challenges.`;
</script>

<div class="page" class:expanded>
	<div class="name-block">
		<h1 class="name-en font-bodoni">Abhayprad Jha</h1>
		<p bind:this={hindiRef} class="name-hi font-bodoni">अभयप्रद झा</p>
	</div>

	{#if expanded}
		<section class="about" transition:fly={{ y: 30, duration: 700, delay: 400 }}>
			<button class="about-title-btn" onclick={toggleDropdown} aria-expanded={dropdownOpen}>
				<h2 class="about-title font-bodoni">About Me</h2>
				<svg class="about-chevron" class:open={dropdownOpen} width="24" height="14" viewBox="0 0 24 14" fill="none" aria-hidden="true">
					<polyline points="2,2 12,12 22,2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>

			{#if dropdownOpen}
				<nav class="about-dropdown font-garamond" transition:slide={{ duration: 340 }}>
					{#each navLinks as link (link.href)}
						<a class="dropdown-item" href={link.href}>{link.label}</a>
					{/each}
				</nav>
			{/if}

			<div class="about-body font-garamond">
				{#if startTypewriter}
					<TypewriterText text={aboutText} speed={22} cursor={true} />
				{:else}
					<span style="opacity:0">{aboutText}</span>
				{/if}
			</div>

			<!-- Social icons row -->
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
		</section>
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
			<line x1="14" y1="2" x2="14" y2="22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
			<polyline points="6,15 14,24 22,15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
		transition: padding-top 0.9s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.page.expanded { padding-top: 72px; }

	.name-block { text-align: center; }

	.name-en {
		font-size: clamp(48px, 8vw, 118px);
		font-weight: 400;
		line-height: 1;
		letter-spacing: -0.02em;
		color: #000;
		transition: font-size 0.9s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.page.expanded .name-en { font-size: clamp(26px, 3.6vw, 50px); }

	.name-hi {
		margin-top: 0.5rem;
		font-size: clamp(18px, 2.4vw, 40px);
		font-weight: 400;
		color: #000;
		opacity: 0.72;
		transition: font-size 0.9s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.9s ease;
	}
	.page.expanded .name-hi { font-size: clamp(12px, 1.3vw, 20px); opacity: 0.45; }

	.about { margin-top: 52px; }

	.social-row {
		display: flex;
		justify-content: center;
		gap: 40px;
		margin-top: 52px;
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

	.about-title-btn {
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
	.about-title-btn:hover { transform: scale(1.04); transform-origin: right center; }

	.about-title {
		font-size: clamp(40px, 5vw, 80px);
		font-weight: 400;
		text-align: right;
		line-height: 1;
		margin-bottom: 0;
		color: #000;
	}
	.about-chevron {
		color: #000;
		flex-shrink: 0;
		transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
	}
	.about-chevron.open { transform: rotate(180deg); }

	.about-dropdown {
		display: flex;
		flex-direction: column;
		gap: 0;
		margin-bottom: 32px;
		border-right: 2px solid rgba(0,0,0,0.12);
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

	.about-body {
		font-size: clamp(15px, 1.3vw, 20px);
		line-height: 1.9;
		color: #000;
	}

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
	@media (max-width: 600px) {
		.social-row   { flex-direction: column; align-items: center; gap: 18px; margin-top: 36px; }
		.social-item  { flex-direction: row; gap: 14px; }
		.social-icon  { width: 22px; height: 22px; }
		.social-label { font-size: 18px; opacity: 1; transform: none; }
		.social-item:hover .social-icon { transform: none; }
	}

	@keyframes bounce {
		0%, 100% { transform: translate(-50%, -50%) translateY(0); }
		50%       { transform: translate(-50%, -50%) translateY(7px); }
	}
</style>

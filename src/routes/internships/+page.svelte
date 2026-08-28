<script>
	import SocialRow from '$lib/components/SocialRow.svelte';
	import { experiences } from '$lib/data/experiences.js';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/#work">← Portfolio</a>

	<h1 class="section-title font-bodoni">Work Experience</h1>

	<div class="exp-list">
		{#each experiences as exp (exp.id)}
			<article class="exp">
				<div class="exp-head">
					<span class="exp-logo"><img src={exp.logo} alt="" /></span>
					<div class="exp-id">
						<h2 class="exp-company font-bodoni">{exp.company}</h2>
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

	<SocialRow />
</div>

<style>
	.page {
		position: relative;
		z-index: 20;
		padding: 72px 2rem 6rem;
		min-height: 100vh;
		max-width: 960px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	.back-link {
		font-size: clamp(13px, 1.1vw, 16px);
		color: rgba(0, 0, 0, 0.45);
		text-decoration: none;
		letter-spacing: 0.02em;
		margin-bottom: 40px;
		align-self: flex-start;
		transition: color 0.15s ease;
	}
	.back-link:hover {
		color: #000;
	}

	.section-title {
		font-size: clamp(40px, 5vw, 80px);
		font-weight: 400;
		line-height: 1;
		text-align: right;
		color: #000;
		margin: 0 0 40px;
	}

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
		content: '—';
		position: absolute;
		left: 0;
		color: rgba(0, 0, 0, 0.28);
	}

	.cue {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: clamp(13px, 1.05vw, 16px);
		color: rgba(0, 0, 0, 0.72);
		text-decoration: none;
		align-self: flex-start;
		transition:
			color 0.15s ease,
			gap 0.15s ease;
	}
	.cue:hover {
		color: #000;
		gap: 10px;
	}

	@media (max-width: 700px) {
		.section-title {
			text-align: left;
		}
		.exp-head {
			flex-wrap: wrap;
		}
		.exp-period {
			width: 100%;
			padding-top: 0;
		}
	}
</style>

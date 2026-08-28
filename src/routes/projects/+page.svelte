<script>
	import SocialRow from '$lib/components/SocialRow.svelte';
	import { projects } from '$lib/data/projects.js';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/#projects">← Portfolio</a>

	<h1 class="section-title font-bodoni">Projects</h1>

	<a class="ux-token font-garamond" href="/projects/ux-philosophy">
		About the UX philosophy of this site →
	</a>

	<div class="projects-grid">
		{#each projects as project (project.id)}
			<article class="project-card">
				<h2 class="card-title font-bodoni">{project.title}</h2>
				<span class="card-meta font-garamond">{project.meta}</span>
				<p class="card-summary font-garamond">{project.summary}</p>
				<a class="card-learn-more font-garamond" href={project.storyHref}>
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
		margin: 0 0 24px;
	}

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
		margin: 0 0 32px auto;
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
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 22px;
		margin-top: 24px;
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
		font-size: clamp(17px, 1.5vw, 22px);
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

	.card-learn-more {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: clamp(13px, 1.1vw, 16px);
		color: rgba(0, 0, 0, 0.72);
		text-decoration: none;
		letter-spacing: 0.01em;
		align-self: flex-start;
		transition:
			color 0.15s ease,
			gap 0.15s ease;
	}
	.card-learn-more:hover {
		color: #000;
		gap: 10px;
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

	@media (max-width: 700px) {
		.projects-grid {
			grid-template-columns: minmax(0, 1fr);
		}
		.section-title {
			text-align: left;
		}
		.ux-token {
			margin-left: 0;
		}
	}
	@media (min-width: 701px) and (max-width: 960px) {
		.projects-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>

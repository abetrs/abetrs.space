<script>
	import SocialRow from '$lib/components/SocialRow.svelte';
</script>

<div class="page">
	<a class="back-link font-garamond" href="/">← Portfolio</a>

	<h1 class="section-title font-bodoni">Hobbies</h1>

	<div class="under-construction font-garamond">
		<p class="uc-label">Under Construction</p>
		<p class="uc-sub">Something interesting is being built here. Check back soon.</p>
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

	.under-construction {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		gap: 16px;
		padding-top: 40px;
	}

	.uc-label {
		font-size: clamp(28px, 3.5vw, 52px);
		font-weight: 400;
		color: rgba(0, 0, 0, 0.22);
		letter-spacing: 0.04em;
		margin: 0;
	}

	.uc-sub {
		font-size: clamp(14px, 1.2vw, 19px);
		color: rgba(0, 0, 0, 0.35);
		line-height: 1.7;
		margin: 0;
	}

	@media (max-width: 700px) {
		.section-title {
			text-align: left;
		}
	}
</style>

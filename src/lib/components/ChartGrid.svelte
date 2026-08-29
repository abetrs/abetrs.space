<script>
	import DatawrapperChart from '$lib/components/DatawrapperChart.svelte';

	/** @type {{ charts: any[] }} */
	let { charts } = $props();
</script>

<div class="chart-grid" class:single={charts.length === 1}>
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

<style>
	.chart-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 22px;
	}
	.chart-grid.single {
		grid-template-columns: minmax(0, 1fr);
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

	@media (max-width: 760px) {
		.chart-grid {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>

<script>
	import { onMount } from 'svelte';

	/**
	 * Sticky contents rail. Highlights whichever section is currently under the
	 * top of the viewport and lets the reader jump straight to it.
	 *
	 * @type {{ sections: { id: string, label: string }[], offset?: number }}
	 */
	let { sections, offset = 140 } = $props();

	let activeId = $state(sections[0]?.id ?? '');

	onMount(() => {
		let ticking = false;

		function measure() {
			ticking = false;
			let current = sections[0]?.id ?? '';

			// Compare against the viewport directly — the sections sit inside
			// positioned wrappers, so offsetTop would be relative to the wrong box.
			for (const section of sections) {
				const el = document.getElementById(section.id);
				if (el && el.getBoundingClientRect().top <= offset) current = section.id;
			}

			// At the very bottom of the page the last section may never cross the
			// line, so claim it explicitly.
			const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
			if (atBottom) current = sections[sections.length - 1]?.id ?? current;

			activeId = current;
		}

		function onScroll() {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(measure);
		}

		measure();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});
</script>

<nav class="toc font-garamond" aria-label="Contents">
	<span class="toc-label">Contents</span>
	<ul>
		{#each sections as section (section.id)}
			<li>
				<a
					class="toc-item"
					class:active={activeId === section.id}
					href="#{section.id}"
					aria-current={activeId === section.id ? 'true' : undefined}
				>
					{section.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.toc {
		position: sticky;
		top: 150px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 14px;
		padding-right: 20px;
		border-right: 2px solid rgba(0, 0, 0, 0.12);
		text-align: right;
	}

	.toc-label {
		font-size: 11px;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: rgba(0, 0, 0, 0.32);
	}

	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin: 0;
		padding: 0;
		width: 100%;
	}

	li {
		display: flex;
		justify-content: flex-end;
	}

	.toc-item {
		display: inline-block;
		font-size: clamp(15px, 1.15vw, 18px);
		color: #000;
		text-decoration: none;
		padding: 7px 0;
		letter-spacing: 0.02em;
		opacity: 0.45;
		transform-origin: right center;
		transition:
			opacity 0.16s ease,
			transform 0.16s ease;
	}
	.toc-item:hover {
		opacity: 0.9;
		transform: scale(1.08);
	}
	.toc-item.active {
		opacity: 1;
	}

	/* ── Narrow screens: the rail becomes a sticky chip strip ── */
	@media (max-width: 1080px) {
		.toc {
			position: sticky;
			/* Clears the fixed clock in the top-left corner. */
			top: 64px;
			flex-direction: row;
			align-items: center;
			gap: 12px;
			padding: 10px 0;
			border-right: none;
			border-bottom: 1px solid rgba(0, 0, 0, 0.1);
			background: rgba(255, 255, 255, 0.88);
			backdrop-filter: blur(14px);
			-webkit-backdrop-filter: blur(14px);
			text-align: left;
			z-index: 30;
			margin-bottom: 8px;
			/* Bleed out to the viewport edges. The parent sets --toc-bleed to
			   whatever horizontal padding the page is using. */
			margin-inline: calc(-1 * var(--toc-bleed, 0px));
			padding-inline: var(--toc-bleed, 0px);
		}
		.toc-label {
			display: none;
		}
		ul {
			flex-direction: row;
			gap: 8px;
			overflow-x: auto;
			scrollbar-width: none;
			padding-bottom: 2px;
		}
		ul::-webkit-scrollbar {
			display: none;
		}
		li {
			justify-content: flex-start;
		}
		.toc-item {
			padding: 5px 13px;
			font-size: 14px;
			white-space: nowrap;
			border: 1px solid rgba(0, 0, 0, 0.14);
			border-radius: 20px;
			transform: none;
		}
		.toc-item:hover {
			transform: none;
		}
		.toc-item.active {
			border-color: rgba(0, 0, 0, 0.55);
		}
	}

	/* ── Night mode ── */
	:global(html[data-theme='night']) .toc {
		border-right-color: rgba(255, 255, 255, 0.18);
	}
	:global(html[data-theme='night']) .toc-label {
		color: rgba(255, 255, 255, 0.32);
	}
	:global(html[data-theme='night']) .toc-item {
		color: rgba(255, 255, 255, 0.88);
	}

	@media (max-width: 1080px) {
		:global(html[data-theme='night']) .toc {
			background: rgba(8, 18, 36, 0.92);
			border-bottom-color: rgba(255, 255, 255, 0.14);
			border-right-color: transparent;
		}
		:global(html[data-theme='night']) .toc-item {
			border-color: rgba(255, 255, 255, 0.2);
		}
		:global(html[data-theme='night']) .toc-item.active {
			border-color: rgba(255, 255, 255, 0.65);
		}
	}
</style>

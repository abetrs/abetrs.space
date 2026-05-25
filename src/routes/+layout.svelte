<script>
	import '../app.css';
	import favicon from '$lib/assets/iconforportfolio.jpg';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { slide } from 'svelte/transition';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	// ── Timezone options ────────────────────────────────────────────────────
	const ZONES = [
		{ label: 'London',      abbr: 'GMT', tz: 'Europe/London',       lat:  51.51, lon:  -0.13 },
		{ label: 'New York',    abbr: 'EST', tz: 'America/New_York',    lat:  40.71, lon: -74.01 },
		{ label: 'Los Angeles', abbr: 'PST', tz: 'America/Los_Angeles', lat:  34.05, lon:-118.24 },
		{ label: 'Mumbai',      abbr: 'IST', tz: 'Asia/Kolkata',        lat:  19.08, lon:  72.88 },
		{ label: 'Tokyo',       abbr: 'JST', tz: 'Asia/Tokyo',          lat:  35.68, lon: 139.69 },
		{ label: 'Dubai',       abbr: 'GST', tz: 'Asia/Dubai',          lat:  25.20, lon:  55.27 },
		{ label: 'Melbourne',   abbr: 'AET', tz: 'Australia/Melbourne', lat: -37.81, lon: 144.96 },
		{ label: 'Beijing',     abbr: 'CST', tz: 'Asia/Shanghai',       lat:  39.91, lon: 116.39 },
	];

	let selectedZone  = $state(null); // null = device local
	let dropdownOpen  = $state(false);

	// ── Clock ────────────────────────────────────────────────────────────────
	let now = $state(new Date());

	const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

	function getClockStr(date, zone) {
		if (!zone) {
			return String(date.getHours()).padStart(2,'0') + ':' + String(date.getMinutes()).padStart(2,'0');
		}
		return new Intl.DateTimeFormat('en-GB', {
			timeZone: zone.tz, hour: '2-digit', minute: '2-digit', hour12: false
		}).format(date);
	}

	function getDateStr(date, zone) {
		if (!zone) {
			return DAYS[date.getDay()] + ' ' + date.getDate() + ' ' + MONTHS[date.getMonth()];
		}
		const parts = new Intl.DateTimeFormat('en-GB', {
			timeZone: zone.tz, weekday: 'long', day: 'numeric', month: 'short'
		}).formatToParts(date);
		const get = (t) => parts.find(p => p.type === t)?.value ?? '';
		return get('weekday') + ' ' + get('day') + ' ' + get('month');
	}

	let clockStr = $derived(getClockStr(now, selectedZone));
	let dateStr  = $derived(getDateStr(now, selectedZone));

	// ── Sun times & theme ────────────────────────────────────────────────────
	let sunrise = $state(null);
	let sunset  = $state(null);

	// 'day' | 'golden' | 'night'
	let theme = $state('day');

	function computeTheme(t) {
		const h = (() => {
			if (!selectedZone) return t.getHours();
			const parts = new Intl.DateTimeFormat('en-GB', {
				timeZone: selectedZone.tz, hour: 'numeric', hour12: false
			}).formatToParts(t);
			return parseInt(parts.find(p => p.type === 'hour')?.value ?? '12', 10);
		})();

		if (!sunrise || !sunset) {
			if (h >= 8 && h < 17)              return 'day';
			if ((h >= 6 && h < 8) || (h >= 17 && h < 19)) return 'golden';
			return 'night';
		}
		const TWO_H = 2 * 60 * 60 * 1000;
		const tMs   = t.getTime();
		const srMs  = sunrise.getTime();
		const ssMs  = sunset.getTime();
		if (tMs < srMs - TWO_H || tMs >= ssMs + TWO_H) return 'night';
		if ((tMs >= srMs - TWO_H && tMs <= srMs + TWO_H) ||
		    (tMs >= ssMs - TWO_H && tMs <= ssMs + TWO_H)) return 'golden';
		return 'day';
	}

	// Cache: "tz-YYYY-MM-DD" → {sunrise, sunset}
	const sunCache = new Map();

	function getCityDate(tz) {
		return new Intl.DateTimeFormat('sv-SE', { timeZone: tz }).format(new Date());
	}

	async function fetchSunTimes(lat, lon, tz) {
		const date    = tz ? getCityDate(tz) : new Date().toISOString().slice(0, 10);
		const cacheKey = (tz ?? 'local') + '-' + date;
		if (sunCache.has(cacheKey)) {
			const c = sunCache.get(cacheKey);
			sunrise = c.sunrise; sunset = c.sunset;
			theme = computeTheme(now);
			return;
		}
		try {
			const res  = await fetch(
				`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0&date=${date}`
			);
			const data = await res.json();
			if (data.status === 'OK') {
				const sr = new Date(data.results.sunrise);
				const ss = new Date(data.results.sunset);
				sunCache.set(cacheKey, { sunrise: sr, sunset: ss });
				sunrise = sr; sunset = ss;
				theme = computeTheme(now);
			}
		} catch { /* keep heuristic */ }
	}

	function selectZone(zone) {
		selectedZone = zone;
		dropdownOpen = false;
		// Reset sun times so theme re-derives from new zone immediately
		sunrise = null; sunset = null;
		theme = computeTheme(now);
		fetchSunTimes(zone.lat, zone.lon, zone.tz);
	}

	function toggleDropdown() { dropdownOpen = !dropdownOpen; }

	onMount(() => {
		theme = computeTheme(now);

		const tick = setInterval(() => {
			now   = new Date();
			theme = computeTheme(now);
		}, 30_000);

		// Initial geo-based sun times (for local / no zone selected)
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => fetchSunTimes(pos.coords.latitude, pos.coords.longitude, null),
				() => {} // keep heuristic
			);
		}

		return () => clearInterval(tick);
	});

	$effect(() => {
		if (browser) document.documentElement.dataset.theme = theme;
	});

	// Fade between pages using View Transitions API (Chrome 111+)
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Libre+Barcode+128&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="site-root">

	<!-- Dynamic background layer -->
	<div class="bg-layer bg-{theme}" aria-hidden="true"></div>

	<!-- Clock — top left, z-index 15 (above blur veil) -->
	<div class="clock-display">
		<button class="clock-btn" onclick={toggleDropdown} aria-expanded={dropdownOpen} aria-haspopup="listbox">
			<span class="clock-time">{clockStr}</span>
			{#if selectedZone}
				<span class="clock-abbr">{selectedZone.abbr}</span>
			{/if}
			<svg class="clock-chevron" class:open={dropdownOpen} width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
				<polyline points="1,1 6,7 11,1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
		<div class="clock-date">{dateStr}</div>

		{#if dropdownOpen}
			<!-- Click-outside overlay -->
			<div class="tz-overlay" onclick={toggleDropdown} aria-hidden="true"></div>
			<!-- Dropdown -->
			<ul class="tz-dropdown" role="listbox" transition:slide={{ duration: 180 }}>
				{#each ZONES as zone (zone.tz)}
					<li>
						<button
							class="tz-item"
							class:active={selectedZone?.tz === zone.tz}
							role="option"
							aria-selected={selectedZone?.tz === zone.tz}
							onclick={() => selectZone(zone)}
						>
							<span class="tz-city">{zone.label}</span>
							<span class="tz-abbr">{zone.abbr}</span>
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>

	<!-- Barcode — z-index 5 -->
	<div class="barcode-corner">Abhayprad Jha</div>

	<!-- Blur veil — z-index 10 -->
	<div class="blur-veil" aria-hidden="true"></div>

	<main>
		{@render children?.()}
	</main>

</div>

<style>
	:global(*) { box-sizing: border-box; margin: 0; padding: 0; }

	:global(body) {
		background: #ffffff;
		min-height: 100vh;
		overflow-x: hidden;
	}

	/* ── Background layer ── */
	.bg-layer {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		transition: background 2s ease;
	}
	.bg-day    { background: linear-gradient(to bottom, #f0f8ff 0%, #c8e8f4 50%, #9ECCD6 100%); }
	.bg-golden {
		background:
			radial-gradient(ellipse at 50% 115%,
				rgba(255,210, 60,.90)  0%,
				rgba(255,120, 30,.70) 22%,
				rgba(220, 50, 10,.40) 42%,
				transparent           62%),
			linear-gradient(to bottom, #c0dcf0 0%, #f0d898 42%, #f09050 68%, #d85020 84%, #a82800 100%);
	}
	.bg-night  { background: linear-gradient(to bottom, #020509 0%, #05101f 45%, #091828 100%); }

	/* ── Clock display (fixed, top-left, above blur-veil) ── */
	.clock-display {
		position: fixed;
		top: 18px;
		left: 32px;
		z-index: 15;
		font-family: 'Compacta', 'Bebas Neue', 'Barlow Condensed', sans-serif;
		line-height: 1;
		color: #000;
		user-select: none;
		transition: color 1.5s ease;
	}

	/* Row 1: time + abbr + chevron */
	.clock-btn {
		display: flex;
		align-items: flex-end;
		gap: 7px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		color: inherit;
		font-family: inherit;
	}

	.clock-time {
		font-size: 54px;
		letter-spacing: 0.01em;
		line-height: 1;
	}

	.clock-abbr {
		font-size: 17px;
		opacity: 0.50;
		letter-spacing: 0.05em;
		margin-bottom: 7px;
	}

	.clock-chevron {
		opacity: 0.55;
		margin-bottom: 9px;
		transition: transform 0.22s ease;
		flex-shrink: 0;
	}
	.clock-chevron.open { transform: rotate(180deg); }

	/* Row 2: date */
	.clock-date {
		font-size: 14px;
		letter-spacing: 0.04em;
		opacity: 0.60;
		margin-top: 3px;
		text-transform: uppercase;
		margin-left: 2px;
	}

	/* Click-outside overlay */
	.tz-overlay {
		position: fixed;
		inset: 0;
		z-index: 150;
		cursor: default;
	}

	/* Timezone dropdown */
	.tz-dropdown {
		position: absolute;
		top: calc(100% + 10px);
		left: 0;
		z-index: 200;
		list-style: none;
		background: rgba(255, 255, 255, 0.94);
		backdrop-filter: blur(18px);
		-webkit-backdrop-filter: blur(18px);
		border: 1px solid rgba(0, 0, 0, 0.09);
		border-radius: 10px;
		padding: 5px 0;
		min-width: 180px;
		overflow: hidden;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.10);
	}

	.tz-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 9px 16px;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		transition: background 0.12s ease;
	}
	.tz-item:hover { background: rgba(0, 0, 0, 0.05); }
	.tz-item.active .tz-city { color: #006A82; }

	.tz-city {
		font-family: 'EB Garamond', Garamond, Georgia, serif;
		font-size: 17px;
		color: #000;
		transition: color 0.12s ease;
	}

	.tz-abbr {
		font-family: 'Compacta', 'Bebas Neue', sans-serif;
		font-size: 12px;
		letter-spacing: 0.06em;
		color: rgba(0, 0, 0, 0.38);
	}

	/* ── Barcode ── */
	.barcode-corner {
		position: fixed;
		top: 20px;
		right: 32px;
		z-index: 5;
		font-family: 'Libre Barcode 128', monospace;
		font-size: 48px;
		line-height: 1;
		color: #000;
		user-select: none;
		transition: color 1.5s ease;
	}

	/* ── Blur veil ── */
	.blur-veil {
		position: fixed;
		inset: 0;
		z-index: 10;
		pointer-events: none;
		backdrop-filter: blur(40px);
		-webkit-backdrop-filter: blur(40px);
	}

	main { position: relative; }

	.site-root { min-height: 100vh; background: transparent; }

	/* ── Font helpers ── */
	:global(.font-bodoni)  { font-family: 'Bodoni Moda', 'Bodoni 72', 'Didot', Georgia, serif; }
	:global(.font-garamond){ font-family: 'EB Garamond', Garamond, Georgia, serif; }
	:global(.font-barcode) { font-family: 'Libre Barcode 128', monospace; }

	/* ════════════════════════════════════════════════════════════════
	   NIGHT MODE — flip all dark foreground elements to white
	   ════════════════════════════════════════════════════════════════ */
	:global(html[data-theme="night"]) .clock-display,
	:global(html[data-theme="night"]) .barcode-corner { color: rgba(255,255,255,.78); }

	:global(html[data-theme="night"]) .tz-dropdown {
		background: rgba(8, 18, 36, 0.96);
		border-color: rgba(255,255,255,.12);
		box-shadow: 0 8px 32px rgba(0,0,0,.45);
	}
	:global(html[data-theme="night"]) .tz-city  { color: rgba(255,255,255,.82); }
	:global(html[data-theme="night"]) .tz-abbr  { color: rgba(255,255,255,.30); }
	:global(html[data-theme="night"]) .tz-item:hover { background: rgba(255,255,255,.07); }
	:global(html[data-theme="night"]) .tz-item.active .tz-city { color: #5cd4e8; }

	:global(html[data-theme="night"] .name-en),
	:global(html[data-theme="night"] .name-hi),
	:global(html[data-theme="night"] .about-title),
	:global(html[data-theme="night"] .about-title-btn),
	:global(html[data-theme="night"] .about-chevron),
	:global(html[data-theme="night"] .section-title),
	:global(html[data-theme="night"] .section-title-btn),
	:global(html[data-theme="night"] .section-chevron),
	:global(html[data-theme="night"] .page-title),
	:global(html[data-theme="night"] .back-link),
	:global(html[data-theme="night"] .card-title),
	:global(html[data-theme="night"] .company-name),
	:global(html[data-theme="night"] .social-item) { color: rgba(255,255,255,.90) !important; }

	:global(html[data-theme="night"] .card-desc),
	:global(html[data-theme="night"] .about-body),
	:global(html[data-theme="night"] .period),
	:global(html[data-theme="night"] .bullets li),
	:global(html[data-theme="night"] .dropdown-item) { color: rgba(255,255,255,.68) !important; }

	:global(html[data-theme="night"] .nav-dropdown),
	:global(html[data-theme="night"] .about-dropdown) { border-color: rgba(255,255,255,.18) !important; }

	:global(html[data-theme="night"] .card) {
		background: rgba(255,255,255,.06) !important;
		border-color: rgba(255,255,255,.10) !important;
	}
	:global(html[data-theme="night"] .logo-btn) {
		background: rgba(255,255,255,.10) !important;
		border-color: rgba(255,255,255,.16) !important;
	}

	/* Golden hour: keep all text very dark (near-black) */
	:global(html[data-theme="golden"] .name-en),
	:global(html[data-theme="golden"] .name-hi),
	:global(html[data-theme="golden"] .about-title),
	:global(html[data-theme="golden"] .about-title-btn),
	:global(html[data-theme="golden"] .section-title),
	:global(html[data-theme="golden"] .section-title-btn),
	:global(html[data-theme="golden"] .page-title),
	:global(html[data-theme="golden"] .card-title),
	:global(html[data-theme="golden"] .card-desc),
	:global(html[data-theme="golden"] .dropdown-item),
	:global(html[data-theme="golden"] .social-item),
	:global(html[data-theme="golden"] .company-name),
	:global(html[data-theme="golden"] .period),
	:global(html[data-theme="golden"] .bullets li) { color: #0a0a0a !important; }
</style>

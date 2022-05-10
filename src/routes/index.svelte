<script lang="ts">
	import Canvas from '$lib/canvas.svelte';
	import Palette from '$lib/palette.svelte';
	import DimensionControls from '$lib/dimension-controls.svelte';
	import Code from '$lib/code.svelte';
	import Logo from '$lib/logo.svelte';
	import Tabs from '$lib/tabs.svelte';

	const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

	const defaultX = 20;
	const defaultY = 20;
	const defaultCanvases = [new Array(defaultX * defaultY).fill(null).map((_) => 0)];
	const defaultPalettes = [new Array(1).fill(null).map((_) => `#${randomColor()}`)];

	let appState = {
		canvases: defaultCanvases,
		palettes: defaultPalettes,
		x: defaultX,
		y: defaultY
	};

	if (typeof localStorage !== 'undefined') {
		const savedData = localStorage.getItem('savedData');
		if (savedData) appState = JSON.parse(savedData);
	}

	let x = appState.x;
	let y = appState.y;
	let canvases = appState.canvases;
	let palettes = appState.palettes;

	let activeCanvas: number = 0;
	let selectedPaletteIndex = 1;

	let previewed: number[] = [];

	$: {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('savedData', JSON.stringify({ canvases, palettes, x, y }));
		}
	}

	$: selectedPaletteIndex = 1;
</script>

<div class="app h-screen bg-dark2 text-silver text-xs">
	<div class="tabs">
		<Tabs bind:canvases bind:activeCanvas bind:palettes bind:previewed />
	</div>
	<div class="canvas">
		<Canvas
			xDim={x}
			yDim={y}
			bind:canvases
			{activeCanvas}
			{selectedPaletteIndex}
			{palettes}
			bind:previewed
		/>
	</div>
	<div class="sidebar">
		<DimensionControls bind:x bind:y bind:canvases />
		<Palette bind:palettes bind:selectedPaletteIndex {activeCanvas} />
	</div>
	<div class="code">
		<Code {canvases} {activeCanvas} {palettes} />
	</div>
	<div class="logo">
		<Logo />
	</div>
</div>

<style>
	.app {
		display: grid;
		grid-template-columns: 220px 1fr 500px;
		grid-template-rows: 50px 1fr;
		grid-template-areas: 'logo tabs code-header' 'sidebar canvas code';
	}

	.canvas {
		grid-area: canvas;
		display: flex;
		justify-content: center;
		padding-top: 10%;
	}

	.sidebar {
		grid-area: sidebar;
		display: flex;
	}

	.code {
		grid-area: code;
	}

	.tabs {
		grid-area: tabs;
	}

	.logo {
		grid-area: logo;
	}
</style>

<script lang="ts">
	import Canvas from '$lib/canvas.svelte';
	import Palette from '$lib/palette.svelte';
	import DimensionControls from '$lib/dimension-controls.svelte';
	import CanvasControls from '$lib/canvas-controls.svelte';
	import Code from '$lib/code.svelte';
	import Logo from '$lib/logo.svelte';
	import Tabs from '$lib/tabs.svelte';
	import Optimizer from '$lib/optimizer.svelte';
	import type { AppState } from '$lib/types';

	const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

	const defaultX = 20;
	const defaultY = 20;
	const defaultCanvas = new Array(defaultX * defaultY).fill(null).map((_) => 0);
	const defaultPalette = new Array(1).fill(null).map((_) => `#${randomColor()}`);
	const defaultName = 'Untitled1';
	const defaultBackgroundColor = '#ffffff';

	let appState: AppState = {
		layers: [
			{
				canvas: defaultCanvas,
				palette: defaultPalette,
				name: defaultName
			}
		],
		x: defaultX,
		y: defaultY
	};

	if (typeof localStorage !== 'undefined') {
		const savedData = localStorage.getItem('savedData');
		if (savedData) appState = JSON.parse(savedData);
	}

	let x = appState.x;
	let y = appState.y;
	let layers = appState.layers;

	let activeCanvas: number = 0;
	let selectedPaletteIndex = 1;

	let previewed: number[] = [];

	$: {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('savedData', JSON.stringify({ layers, x, y }));
		}
	}

	$: selectedPaletteIndex = 1;
</script>

<div class="app h-screen bg-dark2 text-silver text-xs">
	<div class="tabs">
		<Tabs bind:layers bind:activeCanvas bind:previewed />
	</div>
	<div class="canvas">
		<CanvasControls bind:layers bind:activeCanvas bind:selectedPaletteIndex />
		<Canvas xDim={x} yDim={y} bind:layers {activeCanvas} {selectedPaletteIndex} bind:previewed />
		<Optimizer {layers} {activeCanvas} />
	</div>
	<div class="sidebar">
		<div class="container bg-dark flex flex-col py-8 px-2">
			<DimensionControls bind:x bind:y bind:layers />
			<Palette bind:layers bind:selectedPaletteIndex {activeCanvas} />
		</div>
	</div>
	<div class="code">
		<Code {layers} />
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
		flex-direction: column;
		align-items: center;
		gap: 20px;
		padding-bottom: 30%;
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

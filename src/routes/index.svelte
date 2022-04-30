<script lang="ts">
	import Canvas from '$lib/canvas.svelte';
	import Palette from '$lib/palette.svelte';
	import Code from '$lib/code.svelte';
	import Tabs from '$lib/tabs.svelte';

	const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

	let x = 20;
	let y = 20;

	let canvases: number[][] = [new Array(x * y).fill(null).map((_) => 0)];
	let activeCanvas: number = 0;

	let palette: string[] = new Array(1).fill(null).map((_) => `#${randomColor()}`);
	let selectedPaletteIndex = 1;
</script>

<div class="app h-screen">
	<div class="tabs">
		<Tabs bind:canvases bind:activeCanvas />
	</div>
	<div class="canvas">
		<Canvas xDim={x} yDim={y} bind:canvases {activeCanvas} {selectedPaletteIndex} {palette} />
	</div>
	<div class="sidebar">
		<Palette bind:palette bind:selectedPaletteIndex />
	</div>
	<div class="code">
		<Code {canvases} {activeCanvas} {palette} />
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
</style>

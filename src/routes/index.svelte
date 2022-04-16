<script lang="ts">
	import Canvas from '$lib/canvas.svelte';
	import Palette from '$lib/palette.svelte';

	const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

	let colors: string[] = new Array(16).fill(null).map((_) => `#${randomColor()}`);
	let palette: string[] = new Array(4).fill(null).map((_) => `#${randomColor()}`);
	let selectedPaletteIndex = 0;

	const fillCanvasPixel = (index: number, color: string) => (colors[index] = color);
</script>

<div class="flex flex-col">
	<Canvas xDim={4} yDim={4} bind:colors />
	<Palette bind:palette bind:selectedPaletteIndex />
	<button>add color</button>
</div>

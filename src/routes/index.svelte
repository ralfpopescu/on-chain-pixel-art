<script lang="ts">
	import Canvas from '$lib/canvas.svelte';
	import Palette from '$lib/palette.svelte';

	const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

	let x = 4;
	let y = 4;

	let colors: number[] = new Array(x * y).fill(null).map((_) => 0);
	let palette: string[] = new Array(4).fill(null).map((_) => `#${randomColor()}`);
	let selectedPaletteIndex = 0;
</script>

<div class="flex flex-col">
	<Canvas xDim={4} yDim={4} bind:colors {selectedPaletteIndex} {palette} />
	<Palette bind:palette bind:selectedPaletteIndex />
	<button>add color</button>
</div>

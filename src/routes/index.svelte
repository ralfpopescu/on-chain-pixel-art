<script lang="ts">
	import Canvas from '$lib/canvas.svelte';
	import Palette from '$lib/palette.svelte';

	const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

	let x = 4;
	let y = 4;

	let colors: string[] = new Array(x * y).fill(null).map((_) => `#${randomColor()}`);
	let palette: string[] = new Array(4).fill(null).map((_) => `#${randomColor()}`);
	let selectedPaletteIndex = 0;

	$: selectedPaletteColor = palette[selectedPaletteIndex];
</script>

<div class="flex flex-col">
	<Canvas xDim={4} yDim={4} bind:colors {selectedPaletteColor} />
	<Palette bind:palette bind:selectedPaletteIndex />
	<button>add color</button>
</div>

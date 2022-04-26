<script lang="ts">
	import Canvas from '$lib/canvas.svelte';
	import Palette from '$lib/palette.svelte';
	import Code from '$lib/code.svelte';

	const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

	let x = 20;
	let y = 20;

	let colors: number[] = new Array(x * y).fill(null).map((_) => 0);
	let palette: string[] = new Array(1).fill(null).map((_) => `#${randomColor()}`);
	let selectedPaletteIndex = 1;
</script>

<div class="flex flex-col">
	<Canvas xDim={x} yDim={y} bind:colors {selectedPaletteIndex} {palette} />
	<Palette bind:palette bind:selectedPaletteIndex />
	<Code {colors} {palette} />
</div>

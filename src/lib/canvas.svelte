<script lang="ts">
	import Pixel from './pixel.svelte';
	export let canvases: number[][];
	export let activeCanvas: number;
	export let palette: string[];

	$: canvas = canvases[activeCanvas];

	export let xDim: number;
	export let yDim: number;
	export let selectedPaletteIndex;

	console.log({ canvas, canvases, activeCanvas });
</script>

<div
	style={`display: grid; grid-template-rows: repeat(${yDim}, 20px); grid-template-columns: repeat(${xDim}, 20px);`}
>
	{#each canvas as color, i}
		<Pixel
			color={palette[color - 1]}
			handleClick={() => (canvases[activeCanvas][i] = selectedPaletteIndex)}
			isSelected={false}
		/>
	{/each}
</div>

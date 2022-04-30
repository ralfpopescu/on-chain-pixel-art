<script lang="ts">
	import Pixel from './pixel.svelte';
	export let canvases: number[][];
	export let activeCanvas: number;
	export let palettes: string[][];

	$: canvas = canvases[activeCanvas];
	$: palette = palettes[activeCanvas];

	export let xDim: number;
	export let yDim: number;
	export let selectedPaletteIndex;

	console.log({ canvas, canvases, activeCanvas });
</script>

<div
	class="border-8 border-dark"
	style={`display: grid; grid-template-rows: repeat(${yDim}, 20px); grid-template-columns: repeat(${xDim}, 20px); max-height: ${
		yDim * 20 + 16
	}px;`}
>
	{#each canvas as color, i}
		<Pixel
			color={palette[color - 1] || 'rgba(255, 255, 255, 0.9)'}
			handleClick={() => (canvases[activeCanvas][i] = selectedPaletteIndex)}
			isSelected={false}
		/>
	{/each}
</div>

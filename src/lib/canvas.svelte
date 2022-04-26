<script lang="ts">
	import Palette from './palette.svelte';
	import Pixel from './pixel.svelte';
	export let colors: number[];
	export let palette: string[];

	export let xDim: number;
	export let yDim: number;
	export let selectedPaletteIndex;
</script>

<div
	style={`display: grid; grid-template-rows: repeat(${yDim}, 20px); grid-template-columns: repeat(${xDim}, 20px);`}
>
	{#each colors as color, i}
		<Pixel
			color={palette[color - 1]}
			handleClick={() => (colors[i] = selectedPaletteIndex)}
			isSelected={false}
		/>
	{/each}
</div>

<script lang="ts">
	import Pixel from './pixel.svelte';
	export let colors: string[];
	export let xDim: number;
	export let yDim: number;
	export let selectedPaletteColor: string = 'none';
</script>

<div
	style={`display: grid; grid-template-rows: repeat(${yDim}, 20px); grid-template-columns: repeat(${xDim}, 20px);`}
>
	{#each colors as color, i}
		<Pixel {color} handleClick={() => (colors[i] = selectedPaletteColor)} isSelected={false} />
	{/each}
</div>

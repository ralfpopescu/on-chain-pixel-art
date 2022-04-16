<script lang="ts">
	import Pixel from './pixel.svelte';
	export let colors: string[];
	export let xDim: number;
	export let yDim: number;
</script>

<div
	style={`display: grid; grid-template-rows: repeat(${yDim}, 20px); grid-template-columns: repeat(${xDim}, 20px);`}
>
	{#each colors as color}
		<Pixel {color} on:click isSelected={false} />
	{/each}
</div>

<script lang="ts">
	import PaletteColor from './palette-color.svelte';
	import type { Layer } from './types';
	export let layers: Layer[];
	export let selectedPaletteIndex = 0;
	export let activeCanvas;
</script>

<div class="container bg-dark flex flex-col py-8 px-2">
	{#each layers[activeCanvas].palette as _, i}
		<PaletteColor
			bind:layers
			{activeCanvas}
			paletteIndex={i}
			handleClick={() => {
				return (selectedPaletteIndex = i + 1);
			}}
			isSelected={selectedPaletteIndex - 1 === i}
		/>
	{/each}
	<div class="flex flex-row content-center">
		<button
			class="w-8 h-8 flex bg-white rounded-full my-2 justify-center content-center mx-2"
			on:click={() => (layers[activeCanvas].palette = [...layers[activeCanvas].palette, '#000000'])}
			>+</button
		>
		<div>add color to layer</div>
	</div>
	<button
		class="w-8 h-8 flex bg-white rounded-full my-2 justify-center content-center mx-2"
		on:click={() => (selectedPaletteIndex = 0)}>-</button
	>
</div>

<style>
	.container {
		width: 220px;
	}
</style>

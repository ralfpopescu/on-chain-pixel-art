<script lang="ts">
	import PaletteColor from './palette-color.svelte';
	import Add from './graphics/add.svelte';
	import Eraser from './graphics/eraser.svelte';
	import type { Layer } from './types';
	export let layers: Layer[];
	export let selectedPaletteIndex = 0;
	export let activeCanvas;
</script>

<div class="flex flex-col text-xs container gap-1">
	palette
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
	<div
		class="w-full h-8 flex justify-start items-center mx-3 text-xxs gap-4 my-4"
		on:click={() => (layers[activeCanvas].palette = [...layers[activeCanvas].palette, '#000000'])}
		role="button"
	>
		<Add />
		add color to palette
	</div>
	<div
		class="w-full h-8 flex justify-start items-center mx-2 text-xxs gap-4"
		role="button"
		on:click={() => (selectedPaletteIndex = 0)}
	>
		<Eraser />
		erase
	</div>
</div>

<style>
	.container {
		max-height: 500px;
		overflow: auto;
	}
</style>

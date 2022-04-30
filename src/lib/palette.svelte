<script lang="ts">
	import PaletteColor from './palette-color.svelte';
	export let palettes: string[][];
	export let selectedPaletteIndex = 0;
	export let activeCanvas;
</script>

<div class="container bg-dark flex flex-col py-8 px-2">
	{#each palettes[activeCanvas] as _, i}
		<PaletteColor
			bind:palettes
			{activeCanvas}
			paletteIndex={i}
			handleClick={() => {
				return (selectedPaletteIndex = i + 1);
			}}
			isSelected={selectedPaletteIndex - 1 === i}
		/>
	{/each}
	<button
		class="w-8 h-8 flex bg-white rounded-full my-2 justify-center content-center mx-2"
		on:click={() => (palettes[activeCanvas] = [...palettes[activeCanvas], '#000000'])}>+</button
	>
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

<script lang="ts">
	import PaletteColor from './palette-color.svelte';
	export let palette: string[] = [];
	export let selectedPaletteIndex = 0;
</script>

<div class="container bg-black flex flex-col py-8 px-2">
	{#each palette as _, i}
		<PaletteColor
			bind:palette
			paletteIndex={i}
			handleClick={() => {
				return (selectedPaletteIndex = i + 1);
			}}
			isSelected={selectedPaletteIndex - 1 === i}
		/>
	{/each}
	<button
		class="w-8 h-8 flex bg-white rounded-full my-2 justify-center content-center mx-2"
		on:click={() => (palette = [...palette, '#000000'])}>+</button
	>
	<button
		class="w-8 h-8 flex bg-white rounded-full my-2 justify-center content-center mx-2"
		on:click={() => (selectedPaletteIndex = 0)}>-</button
	>
	>
</div>

<style>
	.container {
		width: 220px;
	}
</style>

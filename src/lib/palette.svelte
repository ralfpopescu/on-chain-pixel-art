<script lang="ts">
	import PaletteColor from './palette-color.svelte';
	export let palette: string[] = [];
	export let selectedPaletteIndex = 0;
</script>

<div class="bg-black">
	{#each palette as _, i}
		<PaletteColor
			bind:palette
			paletteIndex={i}
			handleClick={() => {
				return (selectedPaletteIndex = i);
			}}
			isSelected={selectedPaletteIndex === i}
		/>
	{/each}
	<button on:click={() => (palette = [...palette, '#000000'])}>+</button>
</div>

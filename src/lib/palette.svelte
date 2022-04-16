<script lang="ts">
	import PaletteColor from './palette-color.svelte';
	export let palette: string[] = [];
	export let selectedPaletteIndex = 0;
</script>

<div>
	{#each palette as _, i}
		<PaletteColor
			bind:palette
			paletteIndex={i}
			on:click={() => (selectedPaletteIndex = i)}
			isSelected={selectedPaletteIndex === i}
		/>
	{/each}
</div>

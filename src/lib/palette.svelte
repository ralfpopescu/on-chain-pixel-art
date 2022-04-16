<script lang="ts">
	import PaletteColor from './palette-color.svelte';
	export let palette: string[] = [];
	export let selectedPaletteIndex = 0;

	console.log(selectedPaletteIndex);
</script>

<div>
	{#each palette as _, i}
		<PaletteColor
			bind:palette
			paletteIndex={i}
			handleClick={() => {
				console.log(i);
				return (selectedPaletteIndex = i);
			}}
			isSelected={selectedPaletteIndex === i}
		/>
	{/each}
</div>

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
				return (selectedPaletteIndex = i + 1);
			}}
			isSelected={selectedPaletteIndex - 1 === i}
		/>
	{/each}
	<button class="bg-white p-2 rounded my-2" on:click={() => (palette = [...palette, '#000000'])}
		>+</button
	>
	<button class="bg-white p-2 rounded my-2" on:click={() => (selectedPaletteIndex = 0)}>-</button>
	>
</div>

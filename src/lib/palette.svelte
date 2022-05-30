<script lang="ts">
	import PaletteColor from './palette-color.svelte';
	import Add from './graphics/add.svelte';
	import Eraser from './graphics/eraser.svelte';
	import type { Tabber } from '../util/tabber';
	export let selectedPaletteIndex = 0;
	export let activeCanvas;
	export let tabber: Tabber;
</script>

<div class="flex flex-col">
	{#each tabber.layer(activeCanvas).palette as _, i}
		<PaletteColor
			{tabber}
			{activeCanvas}
			paletteIndex={i}
			handleClick={() => {
				return (selectedPaletteIndex = i + 1);
			}}
			isSelected={selectedPaletteIndex - 1 === i}
		/>
	{/each}
	<div class="flex flex-row content-center">
		<div
			class="w-8 h-8 flex justify-center content-center mx-2"
			on:click={() =>
				(tabber.layer(activeCanvas).palette = [...tabber.layer(activeCanvas).palette, '#000000'])}
			role="button"
		>
			<Add />
		</div>
	</div>
	<div
		class="w-8 h-8 flex my-2 justify-center content-center mx-2"
		role="button"
		on:click={() => (selectedPaletteIndex = 0)}
	>
		<Eraser />
	</div>
</div>

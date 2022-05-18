<script lang="ts">
	import type { Layer } from './types';
	import Delete from './graphics/delete.svelte';
	export let layers: Layer[];
	export let paletteIndex: number;
	export let activeCanvas;
	export let isSelected: boolean = false;
	export let handleClick;

	$: color = layers[activeCanvas].palette[paletteIndex];
</script>

<div class="flex flex-row w-40 px-2 py-2 text-dark">
	<div
		style={`background-color: ${color}; ${
			isSelected ? 'border: 4px solid #eeeeee;' : 'border: 1px solid #eeeeee'
		}`}
		class={`size cursor-pointer hover:border-2 rounded-full`}
		on:click={handleClick}
		on:dragover={handleClick}
		draggable={true}
	/>
	<input
		value={color}
		on:input={(e) => (layers[activeCanvas].palette[paletteIndex] = e.currentTarget.value)}
		class="rounded mx-4 p-1 w-20"
	/>
	<div
		class={`size cursor-pointer hover:border-2 flex flex-row content-center justify-center`}
		role="button"
		on:click={() => {
			const newPalette = [...layers[activeCanvas].palette];
			newPalette[paletteIndex] = 'RM';
			layers[activeCanvas].palette = newPalette.filter((p) => p !== 'RM');
		}}
	>
		<Delete />
	</div>
</div>

<style>
	.size {
		min-width: 32px;
		min-height: 32px;
	}
</style>

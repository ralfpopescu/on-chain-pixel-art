<script lang="ts">
	import Pixel from './pixel.svelte';
	export let palette: string[] = [];
	export let paletteIndex: number;
	export let isSelected: boolean = false;
	export let handleClick;

	$: color = palette[paletteIndex];
</script>

<div class="flex flex-row w-40 px-2 py-8">
	<div
		style={`background-color: ${color}; ${
			isSelected ? 'border: 2px solid #eeeeee;' : 'border: 1px dotted grey'
		}`}
		class={`w-8 cursor-pointer hover:border-2 rounded-full`}
		on:click={handleClick}
		on:dragover={handleClick}
		draggable={true}
	/>
	<input
		value={color}
		on:input={(e) => (palette[paletteIndex] = e.currentTarget.value)}
		class="rounded mx-4 p-1 w-20"
	/>
</div>

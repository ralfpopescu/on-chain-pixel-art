<script lang="ts">
	import Pixel from './pixel.svelte';
	export let palette: string[] = [];
	export let paletteIndex: number;
	export let isSelected: boolean = false;
	export let handleClick;

	$: color = palette[paletteIndex];
</script>

<div class="flex flex-row">
	<Pixel {color} {isSelected} {handleClick} rounded={true} />
	<input
		value={color}
		on:input={(e) => (palette[paletteIndex] = e.currentTarget.value)}
		class="rounded w-24 mx-4 p-1"
	/>
</div>

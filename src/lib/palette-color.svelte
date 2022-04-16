<script lang="ts">
	import Pixel from './pixel.svelte';
	export let palette: string[] = [];
	export let paletteIndex: number;
	export let isSelected: boolean = false;

	$: color = palette[paletteIndex];
</script>

<div class="flex flex-row">
	<Pixel {color} {isSelected} />
	<input value={color} on:input={(e) => (palette[paletteIndex] = e.currentTarget.value)} />
</div>

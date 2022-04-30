<script lang="ts">
	export let palettes: string[][] = [];
	export let paletteIndex: number;
	export let activeCanvas;
	export let isSelected: boolean = false;
	export let handleClick;

	$: color = palettes[activeCanvas][paletteIndex];
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
		on:input={(e) => (palettes[activeCanvas][paletteIndex] = e.currentTarget.value)}
		class="rounded mx-4 p-1 w-20"
	/>
	<button
		class={`size cursor-pointer hover:border-2 rounded-full bg-white`}
		on:click={() => {
			const newPalette = [...palettes[activeCanvas]];
			newPalette[paletteIndex] = 'RM';
			palettes[activeCanvas] = newPalette.filter((p) => p !== 'RM');
		}}>-</button
	>
</div>

<style>
	.size {
		min-width: 32px;
		min-height: 32px;
	}
</style>

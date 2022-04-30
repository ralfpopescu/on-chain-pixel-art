<script lang="ts">
	export let palette: string[] = [];
	export let paletteIndex: number;
	export let isSelected: boolean = false;
	export let handleClick;

	$: color = palette[paletteIndex];
</script>

<div class="flex flex-row w-40 px-2 py-2">
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
		on:input={(e) => (palette[paletteIndex] = e.currentTarget.value)}
		class="rounded mx-4 p-1 w-20"
	/>
	<button
		class={`size cursor-pointer hover:border-2 rounded-full bg-white`}
		on:click={() => {
			const newPalette = [...palette];
			newPalette[paletteIndex] = 'RM';
			palette = newPalette.filter((p) => p !== 'RM');
		}}>-</button
	>
</div>

<style>
	.size {
		min-width: 32px;
		min-height: 32px;
	}
</style>

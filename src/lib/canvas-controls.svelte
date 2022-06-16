<script lang="ts">
	import Edit from './graphics/edit.svelte';
	import Trash from './graphics/trash.svelte';
	import type { Layer } from './types';
	export let layers: Layer[];
	export let activeCanvas: number;
	export let selectedPaletteIndex: number;
	let editMode;
	let editName;

	$: name = layers[activeCanvas].name;
</script>

<div class="grid grid-cols-2 w-full p-4 bg-light/20">
	<div class="text-lg flex gap-8">
		{#if editMode}
			<input
				bind:value={editName}
				on:blur={() => {
					layers[activeCanvas].name = editName;
					editMode = false;
				}}
			/>
		{:else}
			<div
				class="cursor-text"
				on:click={() => {
					editMode = true;
					editName = name;
				}}
			>
				{name}
			</div>
		{/if}
		<Edit />
	</div>
	<button
		class="flex flex-row justify-center align-center"
		on:click={() => {
			layers = layers.filter((_, i) => i !== activeCanvas);
			activeCanvas = 0;
			selectedPaletteIndex = 0;
		}}
		disabled={true}><Trash />delete layer</button
	>
</div>

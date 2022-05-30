<script lang="ts">
	import type { Tabber } from 'src/util/tabber';
	import type { Tab } from './types';
	export let tabs: Tab[];
	export let activeCanvas: number;
	export let selectedPaletteIndex: number;
	export let selectedAttributes: number[];
	export let tabber: Tabber;
	let editMode;
	let editName;

	$: name = tabber.layer(activeCanvas).name;
</script>

<div class="grid grid-cols-2 w-full p-4 bg-light/20">
	<div class="text-lg">
		{#if editMode}
			<input
				bind:value={editName}
				on:blur={() => {
					tabber.layer(activeCanvas).name = editName;
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
	</div>
	<button
		on:click={() => {
			tabs = tabs.filter((_, i) => i !== activeCanvas);
			selectedAttributes = selectedAttributes.filter((_, i) => i !== activeCanvas);
			activeCanvas = 0;
			selectedPaletteIndex = 0;
		}}>delete layer</button
	>
</div>

<script lang="ts">
	import type { Layer } from './types';
	export let layers: Layer[];
	export let activeCanvas: number;
	let editMode;
	let editName;

	$: name = layers[activeCanvas].name;
</script>

<div class="flex flex-row">
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
	<button
		on:click={() => {
			layers = layers.filter((_, i) => i !== activeCanvas);
		}}>delete layer</button
	>
</div>

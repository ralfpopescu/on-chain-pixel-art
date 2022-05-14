<script lang="ts">
	export let activeCanvas: number;
	export let canvases: number[][];
	export let palettes: string[][];
	export let previewed: number[];
	export let names: string[];
</script>

<div class="bg-dark flex h-full container">
	{#each canvases as _, i}
		<div class={`px-8 h-full tab ${activeCanvas == i ? 'bg-dark2' : ''} border-x-2 border-dark2`}>
			<span on:click={() => (activeCanvas = i)}>{names[i]}</span>
			<button
				class="bg-white"
				on:click={() => {
					if (previewed.includes(i)) {
						previewed = previewed.filter((p) => p !== i);
						return;
					}
					previewed = [...previewed, i];
				}}>preview</button
			>
		</div>
	{/each}
	<div
		class="tab px-8"
		on:click={() => {
			canvases = [...canvases, canvases[canvases.length - 1].map(() => 0)];
			palettes = [...palettes, ['#000000']];
		}}
	>
		+new layer
	</div>
</div>

<style>
	.tab {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		opacity: 0.7;
	}
</style>

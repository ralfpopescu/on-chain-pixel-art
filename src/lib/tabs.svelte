<script lang="ts">
	import type { Layer } from './types';
	import Eye from './graphics/eye.svelte';
	export let activeCanvas: number;
	export let previewed: number[];
	export let layers: Layer[];
</script>

<div class="bg-dark flex h-full container">
	{#each layers as _, i}
		<div
			class={`px-8 h-full tab ${activeCanvas == i ? 'bg-dark2' : ''} border-x-2 border-dark2 gap-4`}
		>
			<span on:click={() => (activeCanvas = i)}>{layers[i].name}</span>
			<div
				on:click={() => {
					if (previewed.includes(i)) {
						previewed = previewed.filter((p) => p !== i);
						return;
					}
					previewed = [...previewed, i];
				}}
				class="hover:scale-110"
				style={previewed.includes(i) || activeCanvas === i ? '' : 'opacity: 0.5'}
			>
				<Eye />
			</div>
		</div>
	{/each}
	<div
		class="tab px-8"
		on:click={() => {
			layers = [
				...layers,
				{
					canvas: layers[layers.length - 1].canvas.map(() => 0),
					palette: ['#000000'],
					name: 'Untitled'
				}
			];
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

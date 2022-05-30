<script lang="ts">
	import type { Tab } from './types';
	import Eye from './graphics/eye.svelte';
	export let activeCanvas: number;
	export let previewed: number[];
	export let tabs: Tab[];
	export let x: number;
	export let y: number;
</script>

<div class="bg-dark flex h-full container">
	{#each tabs as tab, i}
		<div
			class={`px-8 h-full tab ${activeCanvas == i ? 'bg-dark2' : ''} border-x-2 border-dark2 gap-4`}
		>
			<span on:click={() => (activeCanvas = i)}>{tab.name}</span>
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
			tabs = [
				...tabs,
				{
					canvas: new Array(x * y).fill(0),
					palette: ['#000000'],
					name: 'Untitled Layer',
					type: 'layer'
				}
			];
		}}
	>
		+new layer
	</div>
	<div
		class="tab px-8"
		on:click={() => {
			tabs = [
				...tabs,
				{
					name: 'Untitled Attribute',
					type: 'attribute',
					layers: [
						{
							canvas: new Array(x * y).fill(0),
							palette: ['#000000'],
							name: 'Untitled Layer',
							type: 'layer'
						}
					]
				}
			];
		}}
	>
		+new attribute
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

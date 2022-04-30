<script lang="ts">
	import Canvas from './canvas.svelte';

	export let activeCanvas: number;
	export let canvases: number[][];
</script>

<div class="bg-secondary flex">
	{#each canvases as canvas, i}
		<div
			style={`border: ${activeCanvas == i ? '2px solid white' : ''}`}
			on:click={() => (activeCanvas = i)}
		>
			Untitled
		</div>
	{/each}
	<div on:click={() => (canvases = [...canvases, canvases[canvases.length - 1].map(() => 0)])}>
		ADD
	</div>
</div>

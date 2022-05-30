<script lang="ts">
	import { asDraggable } from 'svelte-drag-and-drop-actions';
	import type { Layer } from './types';
	export let color: string;
	export let isSelected: boolean = false;
	export let handleClick = () => null;
	export let rounded = false;

	export let undoStack: Layer[][];
	export let layers: Layer[];
	let snapshot: Layer[];
</script>

<div
	style={`background-color: ${color}; user-drag: none; ${
		isSelected ? 'border: 2px solid #eeeeee;' : 'border: 1px dotted grey'
	}`}
	class={`pixel w-5 cursor-crosshair hover:opacity-90 ${rounded ? 'rounded-full' : ''}`}
	on:click={handleClick}
	on:dragover={handleClick}
	on:mousedown={() => {
		console.log('mousedown');
		console.log(layers[0].canvas);
		let snapshotLayers = [];
		for (let i = 0; i < layers.length; i += 1) {
			const { canvas, palette, name } = layers[i];
			snapshotLayers[i] = { canvas: [...canvas], palette: [...palette], name };
		}
		console.log({ snapshotLayers });
		snapshot = [...snapshotLayers];
		console.log(snapshot);
	}}
	on:dragend={() => {
		undoStack = [...undoStack, snapshot];
		console.log({ undoStack, snapshot, layers });
		snapshot = null;
	}}
	use:asDraggable={{ Dummy: `<div style="opacity: 0; cursor: crosshair;">.</div>` }}
/>

<style>
	:global([draggable]) {
		-webkit-touch-callout: none;
		-ms-touch-action: none;
		touch-action: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
		cursor: crosshair;
	}
</style>

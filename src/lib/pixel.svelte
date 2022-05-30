<script lang="ts">
	import { asDraggable } from 'svelte-drag-and-drop-actions';
	import type { Tab } from './types';
	import type { Tabber } from '../util/tabber';
	export let color: string;
	export let isSelected: boolean = false;
	export let handleClick = () => null;
	export let rounded = false;

	export let undoStack: Tab[][];
	export let tabs: Tab[];
	let snapshot: Tab[];

	let tempSnap: Tab[];

	const layerName = 'layer' as 'layer';
</script>

<div
	style={`background-color: ${color}; user-drag: none; ${
		isSelected ? 'border: 2px solid #eeeeee;' : 'border: 1px dotted grey'
	}`}
	class={`pixel w-5 cursor-crosshair hover:opacity-90 ${rounded ? 'rounded-full' : ''}`}
	on:click={handleClick}
	on:dragover={handleClick}
	on:mousedown={() => {
		tempSnap = [];
		for (let i = 0; i < tabs.length; i += 1) {
			const tab = tabs[i];
			if (tab.type == 'layer')
				tempSnap[i] = {
					canvas: [...tab.canvas],
					palette: [...tab.palette],
					name: tab.name,
					type: 'layer'
				};
			else {
				const layersClone = tab.layers.map((layer) => ({
					canvas: [...layer.canvas],
					palette: [...layer.palette],
					name: layer.name,
					type: layerName
				}));
				tempSnap[i] = {
					layers: layersClone,
					name: tab.name,
					type: 'attribute'
				};
			}
		}
		snapshot = [...tempSnap];
	}}
	on:dragend={() => {
		undoStack = [...undoStack, snapshot];
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

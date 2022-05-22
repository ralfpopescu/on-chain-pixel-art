<script lang="ts">
	import { asDraggable } from 'svelte-drag-and-drop-actions';
	export let color: string;
	export let isSelected: boolean = false;
	export let handleClick = () => null;
	export let rounded = false;

	const preventDefault = (handler: () => any) => (e: any) => {
		e.preventDefault();
		handler();
	};
</script>

<div
	style={`background-color: ${color}; user-drag: none; ${
		isSelected ? 'border: 2px solid #eeeeee;' : 'border: 1px dotted grey'
	}`}
	class={`pixel w-5 cursor-crosshair hover:opacity-90 ${rounded ? 'rounded-full' : ''}`}
	on:click={preventDefault(handleClick)}
	on:dragover={preventDefault(handleClick)}
	on:dragstart={() => console.log('start')}
	on:dragend={() => console.log('end')}
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

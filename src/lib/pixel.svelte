<script lang="ts">
	export let color: string;
	export let isSelected: boolean = false;
	export let handleClick = () => null;
	export let rounded = false;
</script>

<div
	style={`background-color: ${color}; ${
		isSelected ? 'border: 2px solid #eeeeee;' : 'border: 1px dotted grey'
	}`}
	class={`w-5 cursor-crosshair hover:border-2 ${rounded ? 'rounded-full' : ''}`}
	on:click={handleClick}
	on:dragover={handleClick}
	draggable={true}
/>

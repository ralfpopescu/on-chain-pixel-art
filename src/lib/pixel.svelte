<script lang="ts">
	export let color: string;
	export let isSelected: boolean = false;
	export let handleClick = () => null;
</script>

<div
	style={`background-color: ${color}; ${
		isSelected ? 'border: 4px solid red;' : 'border: 1px dotted grey'
	}`}
	class="w-5 cursor-pointer hover:border-2"
	on:click={handleClick}
/>

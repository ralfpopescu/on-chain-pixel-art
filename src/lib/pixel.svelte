<script lang="ts">
	export let color: string;
	export let isSelected: boolean = false;
</script>

<div
	style={`background-color: ${color}; ${
		isSelected ? 'border: 1px solid red;' : 'border: 1px dotted grey'
	}`}
	class="w-5 cursor-pointer hover:border-2"
/>

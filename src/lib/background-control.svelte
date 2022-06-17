<script lang="ts">
	export let backgroundColor: string;
</script>

<div class="flex flex-col">
	background color
	<div class="flex flex-row w-40 px-2 py-2 text-dark">
		<div
			style={`background-color: ${backgroundColor}`}
			class={`size cursor-pointer hover:border-2 rounded-full`}
		/>
		<input
			value={backgroundColor}
			on:input={(e) => (backgroundColor = e.currentTarget.value)}
			class="rounded mx-4 p-1 w-20"
		/>
	</div>

	<style>
		.size {
			min-width: 32px;
			min-height: 32px;
		}
	</style>
</div>

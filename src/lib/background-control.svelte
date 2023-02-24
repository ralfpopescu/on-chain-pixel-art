<script lang="ts">
	export let backgroundColor: string;
	export let backgroundColorActive: boolean;
</script>

<div class="flex flex-col">
	<div class="flex justify-between pr-4">
		<div>background color</div>
		<input type="checkbox" on:change={(e) => (backgroundColorActive = e.currentTarget.checked)} />
	</div>
	{#if backgroundColorActive}
		<div class="flex flex-row px-2 py-2 text-dark">
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
	{/if}
</div>

<style>
	.size {
		min-width: 32px;
		min-height: 32px;
	}
</style>

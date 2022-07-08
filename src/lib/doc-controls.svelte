<script>
	export let activeDocIndex = 0;

	const options = ['Docs', 'Code-Gen', 'Source & Addresses', 'Project Backup'];
</script>

<div class="flex flex-row align-center justify-center items-center h-full">
	{#each options as option, i}
		<div
			class={`px-8 h-full tab ${
				activeDocIndex == i ? 'bg-light' : 'bg-dark2'
			} border-x-2 border-dark2 flex gap-4 align-center justify-center items-center`}
			on:click={() => (activeDocIndex = i)}
			role="button"
		>
			{option}
		</div>
	{/each}
</div>

<style>
	.tab {
		max-width: 125px;
		min-width: 125px;
	}
</style>

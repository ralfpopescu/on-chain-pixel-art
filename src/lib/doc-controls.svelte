<script>
	export let activeDocIndex = 0;

	const options = ['Docs', 'Code-Gen', 'Project Backup', 'Source & Addresses'];
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

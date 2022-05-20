<script>
	export let activeCodeIndex = 0;

	const options = ['Renderer.sol', 'ERC721.sol', 'Project backup'];
</script>

<div class="flex flex-row">
	{#each options as option, i}
		<div
			class={`px-8 h-full tab ${
				activeCodeIndex == i ? 'bg-dark2' : ''
			} border-x-2 border-dark2 gap-4`}
			on:click={() => (activeCodeIndex = i)}
			role="button"
		>
			{option}
		</div>
	{/each}
</div>

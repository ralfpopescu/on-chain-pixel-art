<script>
	export let activeCodeIndex = 0;

	const options = ['Renderer.sol', 'IOnChainPixelArt.sol', 'MyOnChainNFT.sol'];
</script>

<div class="flex flex-row align-center justify-center items-center">
	{#each options as option, i}
		<div
			class={`px-8 py-1 min-h-40 max-h-40 tab ${
				activeCodeIndex == i ? 'bg-light' : 'bg-dark2'
			} border-x-2 border-dark2 flex gap-4 align-center justify-center items-center`}
			on:click={() => (activeCodeIndex = i)}
			role="button"
		>
			{option}
		</div>
	{/each}
</div>

<script lang="ts">
	import Chain from './graphics/chain.svelte';
	import Draw from './graphics/draw.svelte';
	import { ethers } from 'ethers';
	export let web3: { provider: ethers.providers.Web3Provider; signer: ethers.Signer };
	export let onChainRenderingEnabled: boolean;

	const handleConnect = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await provider.send('eth_requestAccounts', []);
		const signer = provider.getSigner();
		web3 = { provider, signer };
	};

	$: chainIdFetch = web3?.provider.getNetwork();

	$: buttonMessage = onChainRenderingEnabled ? 'draw more' : 'render on-chain';
</script>

<div class="min flex">
	{#if typeof window !== 'undefined' && window?.ethereum}
		{#if !web3 || !web3.provider}
			<button class="w-60 buttonRow" on:click={handleConnect}
				><div style="margin-right: 8px"><Chain /></div>
				connect</button
			>
		{:else}
			{#await chainIdFetch then chainId}
				<button
					class="w-60 buttonRow"
					on:click={() => (onChainRenderingEnabled = !onChainRenderingEnabled)}
					><div style="margin-right: 8px">
						{#if onChainRenderingEnabled}<Draw />{:else if chainId.chainId === 1}<Chain />{/if}
					</div>
					{chainId.chainId === 1
						? buttonMessage
						: 'chain not supported - please use mainnet'}</button
				>
			{/await}
		{/if}
	{:else}
		<a class="w-60 buttonRow" href="https://metamask.io/" target="_blank">Get Metamask</a>
	{/if}
</div>

<style>
	.buttonRow {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.min {
		min-width: 200px;
		width: 200px;
	}
</style>

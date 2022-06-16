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

	$: buttonMessage = onChainRenderingEnabled ? 'draw more' : 'render on-chain';
</script>

{#if typeof window !== 'undefined' && window?.ethereum}
	{#if !web3 || !web3.provider}
		<button class="w-60 buttonRow" on:click={handleConnect}
			><div style="margin-right: 8px"><Chain /></div>
			connect</button
		>
	{:else}
		<button
			class="w-60 buttonRow"
			on:click={() => (onChainRenderingEnabled = !onChainRenderingEnabled)}
			><div style="margin-right: 8px">
				{#if onChainRenderingEnabled}<Draw />{:else}<Chain />{/if}
			</div>
			{buttonMessage}</button
		>
	{/if}
{:else}
	Get Metamask
{/if}

<style>
	.buttonRow {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>

<script lang="ts">
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
		<button class="w-36" on:click={handleConnect}>connect</button>
	{:else}
		<button class="w-36" on:click={() => (onChainRenderingEnabled = !onChainRenderingEnabled)}
			>{buttonMessage}</button
		>
	{/if}
{:else}
	Get Metamask
{/if}

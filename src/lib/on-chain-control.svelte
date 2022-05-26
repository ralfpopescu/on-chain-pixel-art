<script lang="ts">
	import { ethers } from 'ethers';
	export let web3: { provider: ethers.providers.Provider; signer: ethers.Signer };

	const handleConnect = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await provider.send('eth_requestAccounts', []);
		const signer = provider.getSigner();
		web3 = { provider, signer };
	};
</script>

{#if typeof window !== 'undefined' && window?.ethereum}
	{#if !web3 || !web3.provider}
		<button on:click={handleConnect}>connect</button>
	{:else}
		render on chain
	{/if}
{:else}
	Get Metamask
{/if}

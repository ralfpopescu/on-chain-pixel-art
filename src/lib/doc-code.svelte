<script lang="ts">
	import CodeControls from './code-controls.svelte';
	import CodeGen from './code-gen.svelte';
	import CodeInterface from './code-gen-interface.svelte';
	import CodeNFT from './code-gen-erc721.svelte';
	import CodeBackup from './code-backup.svelte';
	import type { Layer } from './types';
	export let layers: Layer[];
	let activeCodeIndex = 0;
	export let x;
	export let y;
</script>

<div class="container bg-dark">
	<CodeControls bind:activeCodeIndex />
	{#if activeCodeIndex == 0}
		<CodeGen {x} {y} {layers} />
	{:else if activeCodeIndex == 1}
		<CodeInterface />
	{:else if activeCodeIndex == 2}
		<CodeNFT />
	{:else}
		<CodeBackup {x} {y} {layers} />
	{/if}
</div>

<style>
	.container {
		color: white;
		opacity: 0.95;
		overflow: auto;
		height: 800px;
		display: flex;
		flex-direction: column;
	}
</style>

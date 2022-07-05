<script lang="ts">
	import CodeGen from './code-gen.svelte';
	import CodeInterface from './code-gen-interface.svelte';
	import CodeBackup from './code-backup.svelte';
	import type { Layer } from './types';
	export let layers: Layer[];
	export let activeCodeIndex = 0;
	export let x;
	export let y;
</script>

<div class="container bg-dark">
	{#if activeCodeIndex == 0}
		<CodeGen {x} {y} layerCount={2} compression={4} {layers} />
	{:else if activeCodeIndex == 1}
		<CodeInterface />
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
	}
</style>

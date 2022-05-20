<script lang="ts">
	import CodeGen from './code-gen.svelte';
	import CodeBackup from './code-backup.svelte';
	import type { Layer } from './types';
	export let layers: Layer[];
	export let activeCodeIndex = 0;
</script>

<div class="container bg-dark">
	{#if activeCodeIndex == 0}
		<CodeGen x={20} y={20} layerCount={2} compression={4} {layers} />
	{:else if activeCodeIndex == 1}
		<CodeGen x={20} y={20} layerCount={2} compression={4} {layers} />
	{:else}
		<CodeBackup x={20} y={20} {layers} />
	{/if}
</div>

<style>
	.container {
		color: white;
		opacity: 0.95;
		padding: 16px;
		overflow: auto;
		height: 800px;
	}
</style>

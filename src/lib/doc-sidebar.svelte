<script lang="ts">
	import { onMount } from 'svelte';
	import DocCode from './doc-code.svelte';
	import DocDocumentation from './doc-documentation.svelte';
	import DocSource from './doc-source.svelte';
	import CodeBackup from './code-backup.svelte';
	import type { Layer } from './types';
	export let layers: Layer[];
	export let activeDocIndex = 0;
	export let x;
	export let y;

	let h: number;
	let maxHeight;
	onMount(() => {
		maxHeight = h;
	});
</script>

<div
	class="container bg-dark p-4 h-full"
	bind:clientHeight={h}
	style={`max-height: ${maxHeight}px`}
>
	{#if h}
		{#if activeDocIndex == 0}
			<DocDocumentation />
		{:else if activeDocIndex == 1}
			<DocCode {x} {y} {layers} />
		{:else if activeDocIndex == 2}
			<DocSource />
		{:else}
			<CodeBackup {x} {y} {layers} />
		{/if}
	{/if}
</div>

<style>
	.container {
		color: white;
		opacity: 0.95;
		overflow: auto;
	}
</style>

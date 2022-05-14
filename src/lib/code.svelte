<script lang="ts">
	import CodeGen from './code-gen.svelte';
	export let canvases: number[][];
	export let palettes;
</script>

<div>
	<CodeGen x={20} y={20} layerCount={2} compression={4} {canvases} {palettes} />
</div>

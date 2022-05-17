<script lang="ts">
	import CodeGen from './code-gen.svelte';
	import type { Layer } from './types';
	export let layers: Layer[];
</script>

<div>
	<CodeGen x={20} y={20} layerCount={2} compression={4} {layers} />
</div>

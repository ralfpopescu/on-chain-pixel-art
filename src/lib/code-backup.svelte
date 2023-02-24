<script lang="ts">
	export let layers;
	export let x;
	export let y;
</script>

<div class="container">
	{JSON.stringify({ layers, x, y }, null, 4)}
</div>

<style>
	.container {
		word-break: break-all;
	}
</style>

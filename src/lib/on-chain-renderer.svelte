<script lang="ts">
	import type { Layer } from './types';
	import type { Renderer } from '../util/contract';
	// @ts-ignore
	import SVG from 'svelte-inline-svg';
	import { encodeCanvas, encodePalette } from '../util/code-gen';

	export let renderer: Renderer;
	export let layers: Layer[];
	export let compression: number;
	export let x: number;
	export let y: number;

	$: canvasesEncoded = layers.map(({ canvas, palette }) =>
		encodeCanvas(canvas, compression, palette.length)
	);
	$: palettesEncoded = layers.map(({ palette }) => encodePalette(palette));

	$: console.log({
		canvas: canvasesEncoded ? canvasesEncoded[0] : null,
		palette: palettesEncoded ? palettesEncoded[0] : null
	});

	$: fetchSrc = renderer.render(canvasesEncoded[0], palettesEncoded[0], x, y);
</script>

{#await fetchSrc}
	<p>rendering...</p>
{:then src}
	<div style="width: 50%">
		<SVG src={`data:image/svg+xml;base64,${btoa(src)}`} />
	</div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

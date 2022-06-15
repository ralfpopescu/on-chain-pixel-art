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

	export let previewed: number[];
	export let activeCanvas: number;

	$: canvasesEncoded = layers.map(({ canvas, palette }) =>
		encodeCanvas(canvas, compression, palette.length)
	);
	$: palettesEncoded = layers.map(({ palette }) => encodePalette(palette));

	$: console.log({
		canvas: canvasesEncoded ? canvasesEncoded[0] : null,
		palette: palettesEncoded ? palettesEncoded[0] : null
	});

	let fetchSrc;

	const getSrc = async () => {
		try {
			console.log({ previewed });
			if (previewed.length > 0) {
				const previewedStack = previewed.map((index) => ({
					canvas: canvasesEncoded[index],
					palette: palettesEncoded[index]
				}));

				let composition = canvasesEncoded[activeCanvas];
				let composedPalette = palettesEncoded[activeCanvas];
				let colorCount = layers[activeCanvas].palette.length;

				console.log('about to loop');
				for (let i = 0; i < previewedStack.length; i += 1) {
					console.log('LOOOOP');
					console.log({ previewed, i });
					composition = await renderer.composeCanvases(composition, canvasesEncoded[i], x * y);
					composedPalette = await renderer.composePalettes(
						composedPalette,
						palettesEncoded[i],
						colorCount,
						layers[i].palette.length
					);

					console.log({ composition, composedPalette });

					colorCount += layers[i].palette.length;
				}
				console.log('composed!!');

				return renderer.render(composition, composedPalette, x, y);
			}
			console.log({ x, y });
			return renderer.render(canvasesEncoded[activeCanvas], palettesEncoded[activeCanvas], x, y);
		} catch (e) {
			console.log(e);
			throw e;
		}
	};
	// force a rerender by checking
	$: fetchSrc =
		!!canvasesEncoded && !!palettesEncoded && activeCanvas > -1 && previewed ? getSrc() : null;
</script>

{#await fetchSrc}
	<p>rendering...</p>
{:then src}
	<div style="width: 50%">
		<SVG src={`data:image/svg+xml;base64,${btoa(src)}`} />
	</div>
{:catch error}
	<p style="color: red; max-width: 500px; overflow: hidden;">{error}</p>
{/await}

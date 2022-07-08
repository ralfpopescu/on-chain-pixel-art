<script lang="ts">
	import type { Layer } from './types';
	import type { Renderer } from '../util/contract';
	// @ts-ignore
	import SVG from 'svelte-inline-svg';
	import { encodeCanvas, encodePalette } from '../util/code-gen';

	export let renderer: Renderer;
	export let layers: Layer[];
	export let backgroundColor: string;
	export let x: number;
	export let y: number;

	export let previewed: number[];
	export let activeCanvas: number;

	$: canvasesEncoded = layers.map(encodeCanvas);
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
					palette: palettesEncoded[index],
					colorCount: layers[index].palette.length
				}));

				let composition = canvasesEncoded[activeCanvas];
				let composedPalette = palettesEncoded[activeCanvas];
				let colorCount = layers[activeCanvas].palette.length;

				console.log('about to loop');
				for (let i = 0; i < previewedStack.length; i += 1) {
					console.log('LOOOOP');
					console.log({ previewed, i });
					composition = await renderer.composeCanvases(
						composition,
						previewedStack[i].canvas,
						x * y
					);
					composedPalette = await renderer.composePalettes(
						composedPalette,
						previewedStack[i].palette,
						colorCount,
						previewedStack[i].colorCount
					);

					console.log({ composition, composedPalette });

					colorCount += previewedStack[i].colorCount;
				}
				return renderer.render(composition, composedPalette, x, y, backgroundColor);
			}
			return renderer.render(
				canvasesEncoded[activeCanvas],
				palettesEncoded[activeCanvas],
				x,
				y,
				backgroundColor
			);
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

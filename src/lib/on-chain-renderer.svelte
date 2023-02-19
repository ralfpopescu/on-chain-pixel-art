<script lang="ts">
	import type { Layer } from './types';
	import type { Renderer } from '../util/contract';
	// @ts-ignore
	import SVG from 'svelte-inline-svg';
	import { encodeCanvas, encodePalette } from '../util/code-gen';

	export let renderer: Renderer;
	export let layers: Layer[];
	export let backgroundColor: string;
	export let backgroundColorActive: boolean;
	export let x: number;
	export let y: number;
	export let paddingX: number;
	export let paddingY: number;

	export let previewed: number[];
	export let activeCanvas: number;

	$: canvasesEncoded = layers.map(encodeCanvas);
	$: palettesEncoded = layers.map(({ palette }) => encodePalette(palette));

	let fetchSrc;

	const getSrc = async () => {
		try {
			if (previewed.length > 0) {
				const previewedStack = previewed.map((index) => ({
					canvas: canvasesEncoded[index],
					palette: palettesEncoded[index],
					colorCount: layers[index].palette.length
				}));

				let composition = canvasesEncoded[activeCanvas];
				let composedPalette = palettesEncoded[activeCanvas];
				let colorCount = layers[activeCanvas].palette.length;

				for (let i = 0; i < previewedStack.length; i += 1) {
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

					colorCount += previewedStack[i].colorCount;
				}
				return renderer.render(
					composition,
					composedPalette,
					x,
					y,
					backgroundColorActive ? backgroundColor : '',
					paddingX,
					paddingY
				);
			}
			return renderer.render(
				canvasesEncoded[activeCanvas],
				palettesEncoded[activeCanvas],
				x,
				y,
				backgroundColorActive ? backgroundColor : '',
				paddingX,
				paddingY
			);
		} catch (e) {
			console.log(e);
			throw e;
		}
	};
	// force a rerender by checking
	$: fetchSrc =
		!!canvasesEncoded &&
		!!palettesEncoded &&
		activeCanvas > -1 &&
		previewed &&
		backgroundColorActive != null
			? getSrc()
			: null;
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

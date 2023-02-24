<script lang="ts">
	import Pixel from './pixel.svelte';
	import type { Layer } from './types';
	export let layers: Layer[];
	export let undoStack: Layer[][];
	export let activeCanvas: number;
	export let previewed: number[];
	export let backgroundColor: string;
	export let paddingX: number;
	export let paddingY: number;

	let canvas: string[];

	$: paddingStyle = `padding-left: ${paddingX * 20}px; padding-right: ${
		paddingX * 20
	}px; padding-top: ${paddingY * 20}px; padding-bottom: ${paddingY * 20}px;`;

	$: {
		if (previewed.length) {
			// layer on top of active canvas
			const composed = [...layers[activeCanvas].canvas].map((pixel) => {
				if (pixel > 0) {
					return layers[activeCanvas].palette[pixel - 1];
				}
				return backgroundColor;
			});

			previewed.forEach((previewIndex) => {
				const preview = layers[previewIndex].canvas;
				preview.forEach((pixel, i) => {
					if (pixel > 0) {
						composed[i] = layers[previewIndex].palette[pixel - 1];
					}
				});
			});

			canvas = composed;
		} else {
			canvas = layers[activeCanvas].canvas.map((pixel) => {
				if (pixel > 0) {
					return layers[activeCanvas].palette[pixel - 1];
				}
				return backgroundColor;
			});
		}
	}
	$: {
	}

	export let xDim: number;
	export let yDim: number;
	export let selectedPaletteIndex;
</script>

<div
	class="border-8 border-dark"
	style={`display: grid; grid-template-rows: repeat(${yDim}, 20px); grid-template-columns: repeat(${xDim}, 20px); max-height: ${
		(yDim + paddingY * 2) * 20 + 16
	}px; background-color: ${backgroundColor}; ${paddingStyle}`}
>
	{#each canvas as color, i}
		<Pixel
			{color}
			handleClick={() => (layers[activeCanvas].canvas[i] = selectedPaletteIndex)}
			isSelected={false}
			bind:undoStack
			bind:layers
		/>
	{/each}
</div>

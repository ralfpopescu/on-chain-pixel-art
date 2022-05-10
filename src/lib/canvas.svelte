<script lang="ts">
	import Pixel from './pixel.svelte';
	export let canvases: number[][];
	export let activeCanvas: number;
	export let palettes: string[][];
	export let previewed: number[];

	let canvas: string[];

	$: {
		console.log({ previewed });
		if (previewed.length) {
			// layer on top of active canvas
			const composed = [...canvases[activeCanvas]].map((pixel) => {
				if (pixel > 0) {
					return palettes[activeCanvas][pixel - 1];
				}
				return '#ffffff';
			});

			previewed.forEach((previewIndex) => {
				const preview = canvases[previewIndex];
				preview.forEach((pixel, i) => {
					if (pixel > 0) {
						composed[i] = palettes[previewIndex][pixel - 1];
					}
				});
			});

			canvas = composed;
		} else {
			canvas = canvases[activeCanvas].map((pixel) => {
				if (pixel > 0) {
					return palettes[activeCanvas][pixel - 1];
				}
				return '#ffffff';
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
		yDim * 20 + 16
	}px;`}
>
	{#each canvas as color, i}
		<Pixel
			{color}
			handleClick={() => (canvases[activeCanvas][i] = selectedPaletteIndex)}
			isSelected={false}
		/>
	{/each}
</div>

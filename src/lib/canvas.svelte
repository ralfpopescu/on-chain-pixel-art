<script lang="ts">
	import Pixel from './pixel.svelte';
	import type { Tab } from './types';
	import type { Tabber } from '../util/tabber';
	export let tabs: Tab[];
	export let undoStack: Tab[][];
	export let activeCanvas: number;
	export let previewed: number[];
	export let backgroundColor: string;
	export let tabber: Tabber;

	let canvas: string[];

	$: {
		if (previewed.length) {
			// layer on top of active canvas
			const composed = [...tabber.layer(activeCanvas).canvas].map((pixel) => {
				if (pixel > 0) {
					return tabber.layer(activeCanvas).palette[pixel - 1];
				}
				return backgroundColor;
			});

			previewed.forEach((previewIndex) => {
				const preview = tabber.layer(previewIndex).canvas;
				preview.forEach((pixel, i) => {
					if (pixel > 0) {
						composed[i] = tabber.layer(previewIndex).palette[pixel - 1];
					}
				});
			});

			canvas = composed;
		} else {
			canvas = tabber.layer(activeCanvas).canvas.map((pixel) => {
				if (pixel > 0) {
					return tabber.layer(activeCanvas).palette[pixel - 1];
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
		yDim * 20 + 16
	}px;`}
>
	{#each canvas as color, i}
		<Pixel
			{color}
			handleClick={() => (tabber.layer(activeCanvas).canvas[i] = selectedPaletteIndex)}
			isSelected={false}
			bind:undoStack
			bind:tabs
		/>
	{/each}
</div>

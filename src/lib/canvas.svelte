<script lang="ts">
	import Pixel from './pixel.svelte';
	import type { Tabber } from '../util/tabber';
	import { store, getLayer } from '../store';
import Tabs from './tabs.svelte';
import Add from './graphics/add.svelte';
	export let activeCanvas: number;
	export let previewed: number[];
	export let backgroundColor: string;
	export let tabber: Tabber;

	let canvas: string[];

	$: {
		if ($store.selected.previewed.length) {
			const composed = [...getLayer(activeCanvas, $store).canvas].map((pixel) => {
				if (pixel > 0) {
					return getLayer(activeCanvas, $store).palette[pixel - 1];
				}
				return backgroundColor;
			});

			previewed.forEach((previewIndex) => {
				const preview = getLayer(previewIndex, $store).canvas;
				preview.forEach((pixel, i) => {
					if (pixel > 0) {
						composed[i] = tabber.layer(previewIndex).palette[pixel - 1];
					}
				});
			});

			canvas = composed;
		} else {
			canvas = getLayer(activeCanvas, $store).canvas.map((pixel) => {
				if (pixel > 0) {
					return getLayer(activeCanvas, $store).palette[pixel - 1];
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
			handleClick={() => {
				const { tabs, selected } = $store;
				const updatedStore = { ...$store };
				const tab = updatedStore.tabs[selected.activeCanvas];
				
				if(tab.type == 'layer') {
					const { canvas } = updatedStore.tabs[selected.activeCanvas];
					const updatedCanvas = [...canvas]
					updatedCanvas[i] = selected.paletteIndex;
					const updatedTabs = [...tabs];
					updatedTabs[selected.activeCanvas] = { ...updatedTabs[selected.activeCanvas], canvas: updatedCanvas }
					store.set({ ...$store, tabs: tabs[selected.activeCanvas] = { ...tabs[selected.activeCanvas], })
				}
			}}
			isSelected={false}
		/>
	{/each}
</div>

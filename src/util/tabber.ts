import type { Tab } from '$lib/types';

export const getTabber = (tabs: Tab[], selectedAttributes: number[]) => ({
	layer: (i: number) => {
		const tab = tabs[i];
		if (tab.type == 'attribute') return tab.layers[selectedAttributes[i]];
		return tab;
	},
	changePixel: (tabIndex: number, pixelIndex: number, colorIndex: number) => {
		const updatedTabs = [...tabs];
		const tab = updatedTabs[tabIndex];
		if (tab.type == 'attribute') {
			const updatedLayers = [...tab.layers];
			const updatedCanvas = [...updatedLayers[selectedAttributes[tabIndex]].canvas];
			updatedCanvas[pixelIndex] = colorIndex;
			updatedLayers[selectedAttributes[tabIndex]].canvas = updatedCanvas;
			tab.layers = updatedLayers;
		} else {
			const updatedCanvas = tab.canvas;
			updatedCanvas[pixelIndex] = colorIndex;
			tab.canvas = updatedCanvas;
		}
		console.log('okay!');
		console.log({ tabs });
		tabs = updatedTabs;
	}
});

export type Tabber = ReturnType<typeof getTabber>;

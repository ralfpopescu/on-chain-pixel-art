import type { Tab } from '$lib/types';

export const getTabber = (tabs: Tab[], selectedAttributes: number[]) => ({
	layer: (i: number) => {
		const tab = tabs[i];
		if (tab.type == 'attribute') return tab.layers[selectedAttributes[i]];
		return tab;
	}
});

export type Tabber = ReturnType<typeof getTabber>;

import { writable } from 'svelte/store';
import type { AppState, Tab } from '$lib/types';
import { randomColor } from './util';

const defaultX = 20;
const defaultY = 20;
const defaultCanvas = new Array(defaultX * defaultY).fill(null).map(() => 0);
const defaultPalette = new Array(1).fill(null).map(() => `#${randomColor()}`);
const defaultName = 'Untitled1';
const defaultBackgroundColor = '#ffffff';

const tabStateInitial: AppState = {
	tabs: [
		{
			canvas: defaultCanvas,
			palette: defaultPalette,
			name: defaultName,
			type: 'layer'
		}
	],
	x: defaultX,
	y: defaultY,
	backgroundColor: defaultBackgroundColor
};

type Selected = {
	activeCanvas: number;
	paletteIndex: number;
	activeCodeIndex: number;
	attributes: number[];
	previewed: number[];
};

const selectedInitial: Selected = {
	activeCanvas: 0,
	paletteIndex: 1,
	activeCodeIndex: 0,
	attributes: [],
	previewed: []
};

type UndoRedo = {
	undo: Tab[][];
	redo: Tab[][];
};

const undoRedoIntial: UndoRedo = {
	undo: [],
	redo: []
};

type Store = {
	tabs: AppState;
	selected: Selected;
	undoRedo: UndoRedo;
};

const storeInitial: Store = {
	tabs: tabStateInitial,
	selected: selectedInitial,
	undoRedo: undoRedoIntial
};

export const store = writable(storeInitial);

export const getLayer = (i: number, store: Store) => {
	const tab = store.tabs[i];
	if (tab.type == 'attribute') return tab.layers[store.selected.attributes[i]];
	return tab;
};

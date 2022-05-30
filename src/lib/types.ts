export type Layer = {
	canvas: number[];
	palette: string[];
	name: string;
	type: 'layer';
};

export type Attribute = {
	name: string;
	layers: Layer[];
	type: 'attribute';
};

export type Tab = Layer | Attribute;

export type AppState = {
	x: number;
	y: number;
	backgroundColor: string;
	tabs: Tab[];
};

<script lang="ts">
	import type { Tab, Layer } from './types';
	import Add from './graphics/add.svelte';
	import Minus from './graphics/minus.svelte';

	export let tabs: Tab[];
	export let x;
	export let y;

	const processTab = (tab: Tab, n: number, callback: (tab: Tab, n: number) => Layer): Tab => {
		if (tab.type == 'layer') {
			return callback(tab, n);
		} else {
			const updatedLayers = tab.layers.map((layer) => callback(layer, n));
			return { ...tab, layers: updatedLayers };
		}
	};

	const addNToXLayer = (layer: Layer, n: number) => {
		const { canvas } = layer;
		const newCanvas = [];
		canvas.forEach((p, i) => {
			newCanvas.push(p);
			if (i % x == 0) {
				// push empty pixels at the end of a row
				for (let j = 0; j < n; j += 1) {
					newCanvas.push(0);
				}
			}
		});
		return { ...layer, canvas: newCanvas };
	};

	const addNToYLayer = (layer: Layer, n: number) => {
		const { canvas } = layer;
		const newCanvas = [...canvas];
		for (let i = 0; i < n * x; i += 1) {
			newCanvas.push(0);
		}
		return { ...layer, canvas: newCanvas };
	};

	const removeNFromXLayer = (layer: Layer, n: number) => {
		const { canvas } = layer;
		const newCanvas = [];
		canvas.forEach((p, i) => {
			if (i % x >= n) {
				newCanvas.push(canvas[i]);
			}
		});
		return { ...layer, canvas: newCanvas };
	};

	const removeNFromYLayer = (layer: Layer, n: number) => {
		const { canvas } = layer;
		const newCanvas = [];
		for (let i = 0; i < canvas.length - x * n; i += 1) {
			newCanvas.push(canvas[i]);
		}

		return { ...layer, canvas: newCanvas };
	};

	const addNToX = (n: number) => {
		tabs = tabs.map((tab) => processTab(tab, n, addNToXLayer));
		x = x + n;
	};

	const addNToY = (n: number) => {
		tabs = tabs.map((tab) => processTab(tab, n, addNToYLayer));
		y = y + n;
	};

	const removeNFromX = (n: number) => {
		tabs = tabs.map((tab) => processTab(tab, n, removeNFromXLayer));
		x = x - n;
	};

	const removeNFromY = (n: number) => {
		tabs = tabs.map((tab) => processTab(tab, n, removeNFromYLayer));
		y = y - n;
	};
</script>

<div>
	<div class="flex flex-row justify-center align-center text-2xl">
		<div
			on:click={() => removeNFromX(1)}
			class="flex flex-row justify-center align-center mr-4"
			role="button"
		>
			<Minus />
		</div>
		<dix>x({x})</dix>
		<div
			on:click={() => addNToX(1)}
			class="flex flex-row justify-center align-center ml-4"
			role="button"
		>
			<Add />
		</div>
	</div>
	<div class="flex flex-row justify-center align-center text-2xl">
		<div
			on:click={() => removeNFromY(1)}
			class="flex flex-row justify-center align-center mr-4"
			role="button"
		>
			<Minus />
		</div>
		<dix>y({y})</dix>
		<div
			on:click={() => addNToY(1)}
			class="flex flex-row justify-center align-center ml-4"
			role="button"
		>
			<Add />
		</div>
	</div>
</div>

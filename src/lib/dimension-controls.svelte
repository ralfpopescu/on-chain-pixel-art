<script lang="ts">
	import type { Layer } from './types';
	export let layers: Layer[];
	export let x;
	export let y;

	const addNToX = (n: number) => {
		const updatedLayers = layers.map((layer) => {
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
		});
		x = x + n;
		layers = updatedLayers;
	};

	const addNToY = (n: number) => {
		const updatedLayers = layers.map((layer) => {
			const { canvas } = layer;
			const newCanvas = [...canvas];
			for (let i = 0; i < n * x; i += 1) {
				newCanvas.push(0);
			}
			return { ...layer, canvas: newCanvas };
		});

		y = y + n;
		layers = updatedLayers;
	};

	const removeNFromX = (n: number) => {
		const updatedLayers = layers.map((layer) => {
			const { canvas } = layer;
			const newCanvas = [];
			canvas.forEach((p, i) => {
				if (i % x >= n) {
					newCanvas.push(canvas[i]);
				}
			});
			return { ...layer, canvas: newCanvas };
		});
		x = x - n;
		layers = updatedLayers;
	};

	const removeNFromY = (n: number) => {
		const updatedLayers = layers.map((layer) => {
			const { canvas } = layer;
			const newCanvas = [];
			for (let i = 0; i < canvas.length - x * n; i += 1) {
				newCanvas.push(canvas[i]);
			}

			return { ...layer, canvas: newCanvas };
		});
		y = y - n;
		layers = updatedLayers;
	};
</script>

<div>
	<div class="flex flex-row">
		<button on:click={() => removeNFromX(1)}>-</button>
		<dix>x</dix>
		<button on:click={() => addNToX(1)}>+</button>
	</div>
	<div class="flex flex-row">
		<button on:click={() => removeNFromY(1)}>-</button>
		<dix>y</dix>
		<button on:click={() => addNToY(1)}>>+</button>
	</div>
</div>

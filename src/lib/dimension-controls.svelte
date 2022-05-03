<script lang="ts">
	export let canvases: number[][];
	export let x;
	export let y;

	const addNToX = (n: number) => {
		const updatedCanvases = canvases.map((canvas) => {
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
			return newCanvas;
		});
		x = x + n;
		canvases = updatedCanvases;
	};

	const addNToY = (n: number) => {
		const updatedCanvases = canvases.map((canvas) => {
			const newCanvas = [...canvas];
			for (let i = 0; i < n * x; i += 1) {
				newCanvas.push(0);
			}
			return newCanvas;
		});

		y = y + n;
		canvases = updatedCanvases;
	};

	const removeNFromX = (n: number) => {
		const updatedCanvases = canvases.map((canvas) => {
			const newCanvas = [];
			canvas.forEach((p, i) => {
				if (i % x >= n) {
					newCanvas.push(canvas[i]);
				}
			});
			return newCanvas;
		});
		x = x - n;
		canvases = updatedCanvases;
	};

	const removeNFromY = (n: number) => {
		const updatedCanvases = canvases.map((canvas) => {
			const newCanvas = [];
			for (let i = 0; i < canvas.length - x * n; i += 1) {
				newCanvas.push(canvas[i]);
			}

			return newCanvas;
		});
		y = y - n;
		canvases = updatedCanvases;
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

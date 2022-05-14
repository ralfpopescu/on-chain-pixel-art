<script lang="ts">
	import {
		getColorCompression,
		compressColors,
		packetsToBinary,
		binaryToUint256
	} from '../util/code-gen';
	export let canvases: number[][];
	export let palettes: string[][];
	export let activeCanvas: number;

	let optimalProjectCompression = 1;
	let optimalCanvasCompression = 1;
	let optimalCanvasBits = 0;
	let optimalCanvasPackets = 0;
	let optimalCanvasUints = 0;

	$: {
		let bestUint256Count = 10000;
		let bestCanvasBinary = 1000000000000;

		for (let compression = 1; compression <= 8; compression += 1) {
			// compress each canvas with this compression to run some stats
			const canvasStats = canvases.map((canvas, i) => {
				const colorCompression = getColorCompression(palettes[i].length);
				const compressed = compressColors(compression, canvas);
				const binary = packetsToBinary(compressed, compression, colorCompression);
				const uints = binaryToUint256(binary, compression, colorCompression);
				return { binary, colorCompression, compression, packetCount: compressed.length, uints };
			});

			const totalUints = canvasStats.reduce((count, encoded) => count + encoded.uints.length, 0);

			const activeCanvasBitsUsed = canvasStats[activeCanvas].binary.length;

			if (activeCanvasBitsUsed < bestCanvasBinary) {
				const activeCanvasUint256Count = canvasStats[activeCanvas].uints.length;
				optimalCanvasUints = activeCanvasUint256Count;
				optimalCanvasBits = activeCanvasBitsUsed;
				optimalCanvasPackets = canvasStats[activeCanvas].packetCount;
				optimalCanvasCompression = compression;
				bestCanvasBinary = activeCanvasBitsUsed;
			}

			// we only care about how many uints are made, since they get packed.
			// we want the biggest possible compression because we get render wins from bigger svg blocks
			if (totalUints <= bestUint256Count) {
				bestUint256Count = totalUints;
				optimalProjectCompression = compression;
			}
		}
	}
</script>

<div class="flex flex-col">
	<div>optimal project compression: {optimalProjectCompression}</div>
	<div>optimal canvas compression: {optimalCanvasCompression}</div>
	<div>canvas uint256 count: {optimalCanvasUints}</div>
	<div>
		canvas bits used: {optimalCanvasBits} ({256 - (optimalCanvasBits % 256)} bits until next uint)
	</div>
	<div>canvas packets used: {optimalCanvasPackets}</div>
</div>

<script lang="ts">
	export let colors: number[];

	type Packet = {
		colorIndex: number;
		numberOfPixels: number;
	};

	const compressColors = (pixelCompression: number, canvas: number[]) => {
		let pixel = 0;
		let packets: Packet[] = [];

		while (pixel < canvas.length) {
			console.log(pixel);
			let colorCount = 0;
			let initialColor = canvas[pixel];
			let color = initialColor;

			while (
				color === initialColor &&
				pixel + colorCount <= canvas.length &&
				colorCount <= 2 ** pixelCompression
			) {
				console.log('loopin');
				colorCount += 1;
				color = canvas[pixel + colorCount];
			}

			pixel += colorCount;

			packets.push({ colorIndex: initialColor, numberOfPixels: colorCount });
		}
	};

	$: packets = compressColors(2, colors);

	console.log(packets);
</script>

<div>{JSON.stringify(packets)}</div>

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
			let colorCount = 0;
			let initialColor = canvas[pixel];
			let color = initialColor;

			while (
				color === initialColor &&
				pixel + colorCount <= canvas.length &&
				colorCount < 2 ** pixelCompression - 1
			) {
				colorCount += 1;
				color = canvas[pixel + colorCount];
			}

			pixel += colorCount;

			packets.push({ colorIndex: initialColor, numberOfPixels: colorCount });
		}

		return packets;
	};

	const packetsToBinary = (p: Packet[], pixelCompression: number, colorCompression: number) => {
		const result = p
			.map(({ colorIndex, numberOfPixels }) => {
				const paddedColor = colorIndex.toString(2).padStart(colorCompression, '0');
				const paddedPixels = numberOfPixels.toString(2).padStart(pixelCompression, '0');
				console.log({ paddedColor, paddedPixels });
				return `${paddedColor}${paddedPixels}`;
			})
			.reduce((acc, curr) => `${curr}${acc}`);

		console.log({ result });
		return result;
	};

	const byteToHex = {
		'0000': 0,
		'0001': 1,
		'0010': 2,
		'0011': 3,
		'0100': 4,
		'0101': 5,
		'0110': 6,
		'0111': 7,
		'1000': 8,
		'1001': 9,
		'1010': 10,
		'1011': 11,
		'1100': 12,
		'1101': 13,
		'1110': 14,
		'1111': 15
	};

	const binaryToHex = (binary: string) => {
		let paddedBinary = binary;
		let converted = '';
		let failSafe = 0;

		while (paddedBinary.length % 4 || failSafe > 4) {
			paddedBinary = paddedBinary.padStart(1, '0');
			failSafe += 1;
		}

		for (let i = 0; i < paddedBinary.length / 4; i += 1) {
			const end = paddedBinary.length - i * 4;
			const byte = paddedBinary.slice(end - 4, end);

			if (!byteToHex[byte]) {
				console.log('conversion failed: ', byte);
			}

			converted = byte + byteToHex[byte];
		}
		return `0x${converted}`;
	};

	const binaryToUint256 = (binary: string) => {
		if (binary.length <= 256) return [binaryToHex(binary)];

		const uint256s = [];
		let binaryReduction = binary;

		let processing = true;
		let failSafe = 0;

		while (processing || failSafe > 10) {
			const slice = binaryReduction.slice(binaryReduction.length - 256, binaryReduction.length);
			binaryReduction = binaryReduction.slice(0, binaryReduction.length - 256);

			console.log(slice, binaryToHex(slice));

			if (binaryReduction.length < 256) {
				processing = false;
				uint256s.push(binaryToHex(binaryReduction));
			}
			uint256s.push(binaryToHex(slice));

			failSafe += 1;
		}

		return uint256s;
	};

	$: packets = compressColors(4, colors);

	console.log(packets);
</script>

<div>
	{JSON.stringify(packets)} total bits: {packets.length * (4 + 3)} naive: {colors.length * 3}
	{JSON.stringify(binaryToUint256(packetsToBinary(packets, 4, 3)))}
</div>

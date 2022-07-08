import { ethers } from 'ethers';
import type { Layer } from '$lib/types';

export const getColorCompression = (numberOfColors: number) => {
	let c = 0;
	while (2 ** c - 1 < numberOfColors) {
		c += 1;
	}
	return c;
};

type Packet = {
	colorIndex: number;
	numberOfPixels: number;
};

export const compressColors = (pixelCompression: number, canvas: number[]) => {
	const packets: Packet[] = [];

	let endingPixel = canvas.length;

	while (canvas[endingPixel - 1] == 0) {
		endingPixel -= 1;
	}

	let pixel = 0;
	while (canvas[pixel] == 0) {
		pixel += 1;
	}

	while (pixel < endingPixel) {
		let colorCount = 0;
		const initialColor = canvas[pixel];
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

export const packetsToBinary = (
	p: Packet[],
	pixelCompression: number,
	colorCompression: number
) => {
	if (!p.length) return '0';

	const result = p
		.map(({ colorIndex, numberOfPixels }) => {
			const paddedColor = colorIndex.toString(2).padStart(colorCompression, '0');
			const paddedPixels = numberOfPixels.toString(2).padStart(pixelCompression, '0');
			return `${paddedColor}${paddedPixels}`;
		})
		.reduce((acc, curr) => `${curr}${acc}`);

	return result;
};

export const byteToHex = {
	'0000': '0',
	'0001': '1',
	'0010': '2',
	'0011': '3',
	'0100': '4',
	'0101': '5',
	'0110': '6',
	'0111': '7',
	'1000': '8',
	'1001': '9',
	'1010': 'a',
	'1011': 'b',
	'1100': 'c',
	'1101': 'd',
	'1110': 'e',
	'1111': 'f'
};

export const binaryToHex = (binary: string) => {
	let paddedBinary = binary;
	let converted = '';

	// make sure we are divisible by 4 bits
	while (paddedBinary.length % 4) {
		paddedBinary = `0${paddedBinary}`;
	}

	for (let i = 0; i < paddedBinary.length / 4; i += 1) {
		const end = paddedBinary.length - i * 4;
		const byte = paddedBinary.slice(end - 4, end);

		if (byteToHex[byte] == undefined) {
			console.log('conversion failed: ', byte);
		}

		converted = `${byteToHex[byte]}${converted}`;
	}

	return `0x${converted}`;
};

const metadataLength = 28;

export const binaryToUint256 = (
	binary: string,
	pixelCompression: number,
	colorCompression: number
) => {
	const packetSize = pixelCompression + colorCompression;
	const packetsPerLayer = Math.floor(256 / packetSize);
	const packetsPerLayerOne = Math.floor((256 - metadataLength) / packetSize);
	const layerOneLength = packetsPerLayerOne * packetSize;
	const layerLength = packetsPerLayer * packetSize;

	if (binary.length <= 256 - metadataLength) return [binaryToHex(binary)];

	const uint256s = [];
	let binaryReduction = binary;
	let maxIterations = 0;
	let processing = true;
	let layerOne = true;

	while (processing && maxIterations < 256) {
		if (
			(binaryReduction.length <= 256 && !layerOne) ||
			(binaryReduction.length <= 256 - metadataLength && layerOne)
		) {
			processing = false;
			console.log('DONE', binaryReduction.length, layerOne);
			uint256s.push(binaryToHex(binaryReduction));
			break;
		}

		const limit = layerOne
			? binaryReduction.length - layerOneLength
			: binaryReduction.length - layerLength;

		console.log({
			limit,
			length: binaryReduction.length,
			layerOneLength,
			layerLength,
			packetsPerLayerOne,
			packetSize
		});

		const slice = binaryReduction.slice(limit, binaryReduction.length);

		binaryReduction = binaryReduction.slice(0, limit);
		layerOne = false;

		console.log('FIRST LAYER', binaryReduction.length, layerOne);

		uint256s.push(binaryToHex(slice));

		maxIterations += 1;
	}

	return uint256s;
};

const createMetadata = (canvas: number[], pixelCompression: number, colorCount: number) => {
	let startingIndex = 0;
	while (canvas[startingIndex] == 0) {
		startingIndex += 1;
	}

	if (pixelCompression > 15) {
		throw new Error(`Pixel compression too high: ${pixelCompression}`);
	}

	console.log({ startingIndex, pixelCompression, colorCount });

	return ethers.BigNumber.from(startingIndex)
		.and('0xFFF')
		.shl(16)
		.add(ethers.BigNumber.from(colorCount || 1).shl(4))
		.add(pixelCompression || 1)
		.and('0xFFFFFFF');
};

const getOptimalCompression = (layer: Layer) => {
	const compressions = [1, 2, 3, 4, 5, 6, 7, 8];

	const results = compressions.map((compression) => {
		const { canvas, palette } = layer;
		const colorCompression = getColorCompression(palette.length);
		const compressed = compressColors(compression, canvas);
		const binary = packetsToBinary(compressed, compression, colorCompression);
		const uints = binaryToUint256(binary, compression, colorCompression);
		return { binary, colorCompression, compression, packetCount: compressed.length, uints };
	});

	return results.sort((a, b) => a.packetCount - b.packetCount)[0].compression;
};

export const encodeCanvas = (layer: Layer) => {
	const { canvas } = layer;
	const colorCount = layer.palette.length;
	const pixelCompression = getOptimalCompression(layer);
	const metadata = createMetadata(canvas, pixelCompression, colorCount);
	const colorCompression = getColorCompression(colorCount);
	const compressed = compressColors(pixelCompression, canvas);
	const binary = packetsToBinary(compressed, pixelCompression, colorCompression);
	const uint256s = binaryToUint256(binary, pixelCompression, colorCompression);
	console.log({ uint256s });
	console.log(metadata._hex);
	uint256s[0] = ethers.BigNumber.from(uint256s[0]).shl(metadataLength).add(metadata)._hex;
	console.log('okay', uint256s[0]);
	return uint256s;
};

export const encodePalette = (colors: string[]) => {
	const encoded = [];
	let layer = [];

	colors.forEach((color) => {
		layer.push(color.replace('#', ''));
		if (layer.length == 10) {
			encoded.push(`0x${layer.reverse().join('')}`);
			layer = [];
		}
	});

	encoded.push(`0x${layer.reverse().join('')}`);

	return encoded;
};

export const composePalettes = (palettes: string[][]) => {
	const colors = [];
	palettes.forEach((palette) => {
		palette.forEach((p) => {
			let pReduction = p;
			// 0x
			while (p.length > 2) {
				colors.push(pReduction.slice(pReduction.length - 6, pReduction.length));
			}
			pReduction = pReduction.slice(0, pReduction.length - 6);
		});
	});

	return encodePalette(colors);
};

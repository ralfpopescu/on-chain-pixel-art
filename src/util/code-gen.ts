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
  let pixel = 0;
  const packets: Packet[] = [];

  while (pixel < canvas.length) {
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

export const packetsToBinary = (p: Packet[], pixelCompression: number, colorCompression: number) => {
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

export const binaryToUint256 = (binary: string, pixelCompression: number, colorCompression: number) => {
  const maxBits = 256 - (256 % (pixelCompression + colorCompression));

  if (binary.length <= maxBits) return [binaryToHex(binary)];

  const uint256s = [];
  let binaryReduction = binary;
  let processing = true;
  let maxIterations = 0;

  while (processing && maxIterations < 256) {
    const slice = binaryReduction.slice(binaryReduction.length - maxBits, binaryReduction.length);
    binaryReduction = binaryReduction.slice(0, binaryReduction.length - maxBits);

    if (binaryReduction.length <= maxBits) {
      processing = false;
      uint256s.push(binaryToHex(binaryReduction));
    }
    uint256s.push(binaryToHex(slice));

    maxIterations += 1;
  }

  return uint256s;
};

export const encodeCanvas = (canvas: number[], pixelCompression: number, colorCount: number) => {
  const colorCompression = getColorCompression(colorCount);
  const compressed = compressColors(pixelCompression, canvas);
  const binary = packetsToBinary(compressed, pixelCompression, colorCompression);
  return binaryToUint256(binary, pixelCompression, colorCompression);
}

export const encodePalette = (colors: string[]) => {
  const encoded = [];
  let layer = [];

  colors.forEach(color => {
    layer.push(color.replace('#', ''))
    if (layer.length == 10) {
      encoded.push(`0x${layer.reverse().join('')}`)
      layer = []
    }
  })

  encoded.push(`0x${layer.reverse().join('')}`)

  return encoded;
}
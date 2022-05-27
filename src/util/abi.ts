export const abi = [
	{
		inputs: [
			{
				internalType: 'uint256[]',
				name: 'layer1',
				type: 'uint256[]'
			},
			{
				internalType: 'uint256[]',
				name: 'layer2',
				type: 'uint256[]'
			},
			{
				internalType: 'uint256',
				name: 'totalPixels',
				type: 'uint256'
			}
		],
		name: 'composeLayers',
		outputs: [
			{
				internalType: 'uint256[]',
				name: 'comp',
				type: 'uint256[]'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256[]',
				name: 'palette1',
				type: 'uint256[]'
			},
			{
				internalType: 'uint256[]',
				name: 'palette2',
				type: 'uint256[]'
			},
			{
				internalType: 'uint256',
				name: 'colorCount1',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'colorCount2',
				type: 'uint256'
			}
		],
		name: 'composePalettes',
		outputs: [
			{
				internalType: 'uint256[]',
				name: 'composedPalette',
				type: 'uint256[]'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256[]',
				name: 'colors',
				type: 'uint256[]'
			},
			{
				internalType: 'uint256',
				name: 'pixelCompression',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'colorCount',
				type: 'uint256'
			}
		],
		name: 'encodeColorArray',
		outputs: [
			{
				internalType: 'uint256[]',
				name: 'encoded',
				type: 'uint256[]'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256[]',
				name: 'pixels',
				type: 'uint256[]'
			},
			{
				internalType: 'uint256[]',
				name: 'pallette',
				type: 'uint256[]'
			},
			{
				internalType: 'uint256',
				name: 'xDim',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'yDim',
				type: 'uint256'
			}
		],
		name: 'render',
		outputs: [
			{
				internalType: 'string',
				name: 'svg',
				type: 'string'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'value',
				type: 'uint256'
			}
		],
		name: 'toString',
		outputs: [
			{
				internalType: 'string',
				name: '',
				type: 'string'
			}
		],
		stateMutability: 'pure',
		type: 'function'
	}
];

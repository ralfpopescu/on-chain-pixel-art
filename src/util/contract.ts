import type { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { abi } from './abi';

const RENDERER_CONTRACT_ADDRESS = '0xC3D6707E421d86E595c01247147320e49887D0ef';

const getContract = (lib: Web3Provider) => new ethers.Contract(RENDERER_CONTRACT_ADDRESS, abi, lib);

export const render =
	(lib: Web3Provider) =>
	async (
		canvas: number[],
		palette: string[],
		xDim: number,
		yDim: number,
		backgroundColor: string
	) => {
		const contract = getContract(lib);
		const signer = lib.getSigner();
		const code = await lib.getCode(RENDERER_CONTRACT_ADDRESS);
		console.log({ code });
		console.log({ backgroundColor });
		const result = await contract
			.connect(signer)
			.render(canvas, palette, xDim, yDim, `style="background-color: ${backgroundColor}"`);
		console.log(result);
		return result;
	};

export const encodeCanvas =
	(lib: Web3Provider) => (canvas: number[], compression: number, colorCount: number) => {
		const contract = getContract(lib);
		const signer = lib.getSigner();
		return contract.connect(signer).encodeColorArray(canvas, compression, colorCount);
	};

export const composeCanvases =
	(lib: Web3Provider) => (canvas1: number[], canvas2: number[], totalPixels: number) => {
		const contract = getContract(lib);
		const signer = lib.getSigner();
		return contract.connect(signer).composeLayers(canvas1, canvas2, totalPixels);
	};

export const composePalettes =
	(lib: Web3Provider) =>
	(palette1: string[], palette2: string[], colorCount1: number, colorCount2: number) => {
		const contract = getContract(lib);
		const signer = lib.getSigner();
		return contract.connect(signer).composePalettes(palette1, palette2, colorCount1, colorCount2);
	};

export type Renderer = {
	render: ReturnType<typeof render>;
	encodeCanvas: ReturnType<typeof encodeCanvas>;
	composeCanvases: ReturnType<typeof composeCanvases>;
	composePalettes: ReturnType<typeof composePalettes>;
};

export const getRenderer = (lib: Web3Provider) => ({
	render: render(lib),
	encodeCanvas: encodeCanvas(lib),
	composeCanvases: composeCanvases(lib),
	composePalettes: composePalettes(lib)
});

<script lang="ts">
	import type { ethers } from 'ethers';
	import Canvas from '$lib/canvas.svelte';
	import Palette from '$lib/palette.svelte';
	import DimensionControls from '$lib/dimension-controls.svelte';
	import CanvasControls from '$lib/canvas-controls.svelte';
	import BackgroundControl from '$lib/background-control.svelte';
	import OnChainControl from '$lib/on-chain-control.svelte';
	import OnChainRenderer from '$lib/on-chain-renderer.svelte';
	import DocSidebar from '$lib/doc-sidebar.svelte';
	import Logo from '$lib/logo.svelte';
	import Tabs from '$lib/tabs.svelte';
	import Optimizer from '$lib/optimizer.svelte';
	import type { AppState, Layer } from '$lib/types';
	import { getRenderer } from '../util/contract';
	import Undo from '$lib/graphics/undo.svelte';
	import Redo from '$lib/graphics/redo.svelte';
	import DocControls from '$lib/doc-controls.svelte';

	const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

	let web3: { provider: ethers.providers.Web3Provider; signer: ethers.Signer };
	let onChainRenderingEnabled = false;
	$: renderer = !!web3 ? getRenderer(web3.provider) : null;

	const defaultX = 20;
	const defaultY = 20;
	const defaultCanvas = new Array(defaultX * defaultY).fill(null).map((_) => 0);
	const defaultPalette = new Array(1).fill(null).map((_) => `#${randomColor()}`);
	const defaultName = 'Untitled1';
	const defaultBackgroundColor = '#ffffff';

	let appState: AppState = {
		layers: [
			{
				canvas: defaultCanvas,
				palette: defaultPalette,
				name: defaultName
			}
		],
		x: defaultX,
		y: defaultY,
		backgroundColor: defaultBackgroundColor
	};

	if (typeof localStorage !== 'undefined') {
		const savedData = localStorage.getItem('savedData');
		if (savedData) appState = JSON.parse(savedData);
	}

	let x = appState.x;
	let y = appState.y;
	let layers = appState.layers;
	let backgroundColor = appState.backgroundColor;

	let activeCanvas: number = 0;
	let selectedPaletteIndex = 1;
	let activeDocIndex = 0;

	let previewed: number[] = [];

	let undoStack: Layer[][] = [];
	let redoStack: Layer[][] = [];

	$: {
		if (typeof localStorage !== 'undefined') {
			console.log({ layers });
			localStorage.setItem('savedData', JSON.stringify({ layers, x, y, backgroundColor }));
		}
	}

	$: selectedPaletteIndex = 1;
</script>

<div class="h-screen w-screen flex font-press-start">
	<div class="app bg-dark2 text-silver text-xs w-full">
		<div class="tabs">
			<OnChainControl bind:web3 bind:onChainRenderingEnabled />
			<Tabs bind:layers bind:activeCanvas bind:previewed />
		</div>
		<div class="canvas">
			{#if onChainRenderingEnabled}
				<OnChainRenderer {renderer} {layers} {x} {y} {activeCanvas} {previewed} {backgroundColor} />
			{:else}
				<CanvasControls bind:layers bind:activeCanvas bind:selectedPaletteIndex />
				<Canvas
					xDim={x}
					yDim={y}
					bind:layers
					{activeCanvas}
					{selectedPaletteIndex}
					bind:previewed
					bind:undoStack
					{backgroundColor}
				/>
				<Optimizer {layers} {activeCanvas} />
			{/if}
		</div>
		<div class="sidebar">
			<div class="container bg-dark flex flex-col py-8 px-2 gap-8">
				<BackgroundControl bind:backgroundColor />
				<DimensionControls bind:x bind:y bind:layers />
				<Palette bind:layers bind:selectedPaletteIndex {activeCanvas} />
				<div class="flex flex-row gap-4 justify-start items-start text-xxs px-2">
					<button
						disabled={undoStack.length == 0}
						style={undoStack.length == 0 ? 'opacity: 0.3; cursor: not-allowed;' : ''}
						on:click={() => {
							const redo = [...layers];
							layers = [...undoStack[undoStack.length - 1]];
							undoStack.pop();
							redoStack = [...redoStack, redo];
						}}><Undo /> undo</button
					>
					<button
						on:click={() => {
							layers = [...redoStack[redoStack.length - 1]];
							redoStack.pop();
							redoStack = [...redoStack];
						}}
						disabled={redoStack.length == 0}
						style={redoStack.length == 0 ? 'opacity: 0.3; cursor: not-allowed;' : ''}
						><Redo /> redo</button
					>
				</div>
			</div>
		</div>
		<div class="code">
			<DocSidebar {layers} {activeDocIndex} {x} {y} />
		</div>
		<div class="logo">
			<Logo />
		</div>
		<div class="code-header">
			<DocControls bind:activeDocIndex />
		</div>
	</div>
</div>

<style>
	.app {
		display: grid;
		grid-template-columns: 220px 1fr 500px;
		grid-template-rows: 50px 1fr;
		grid-template-areas: 'logo tabs code-header' 'sidebar canvas code';
	}

	.canvas {
		grid-area: canvas;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 120px;
		padding-bottom: 20%;
		overflow: auto;
	}

	.sidebar {
		grid-area: sidebar;
		display: flex;
	}

	.code {
		grid-area: code;
		max-width: 500px;
	}

	.tabs {
		grid-area: tabs;
		display: flex;
		flex-direction: row;
	}

	.logo {
		grid-area: logo;
	}
</style>

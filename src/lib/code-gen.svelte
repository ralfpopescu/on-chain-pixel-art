<script lang="ts">
	import type { Tab } from './types';
	import { encodeCanvas, encodePalette } from '../util/code-gen';

	export let tabs: Tab[];
	export let layerCount: number;
	export let compression: number;
	export let x: number;
	export let y: number;

	const flatLayers = tabs.reduce((flattened, tab) => {
		if (tab.type == 'layer') return [...flattened, tab];
		return [...flattened, ...tab.layers];
	}, []);

	$: canvasesEncoded = flatLayers.map(({ canvas, palette }) =>
		encodeCanvas(canvas, compression, palette.length)
	);
	$: palettesEncoded = flatLayers.map(({ palette }) => encodePalette(palette));
</script>

<div class="flex flex-col">
	<span class="f">// SPDX-License-Identifier: MIT</span>
	<span class="f">// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)</span>
	<br />
	<span><span class="c">import</span> <span class="e">"./IRenderer.sol"</span>;</span>
	<span><span class="c">import</span> <span class="e">"hardhat/console.sol"</span>;</span>
	<br />
	<span><span class="c">pragma</span> <span class="b">solidity</span> ^0.8.0;</span>
	<br />
	<span><span class="b">contract</span> MyRenderer {`{`}</span>
	<span class="i1"><span class="d">IRenderer</span> <span class="b">private</span> renderer;</span>
	<br />
	<span class="i1"
		><span class="a">uint256</span>[][<span class="d">{layerCount}</span>]
		<span class="b">private</span> assets;</span
	>
	<span class="i1"
		><span class="a">uint256</span>[][<span class="d">{layerCount}</span>]
		<span class="b">private</span> palettes;</span
	>
	<span class="i1"
		><span class="a">uint256</span>[<span class="d">{layerCount}</span>]
		<span class="b">private</span> colorCounts;</span
	>
	<span class="i1"
		><span class="a">uint256</span> <span class="b">private constant</span> COMPRESSION =
		<span class="d">{compression}</span>;</span
	>
	<span class="i1"
		><span class="a">uint256</span> <span class="b">private constant</span> X =
		<span class="d">{x}</span>;</span
	>
	<span class="i1"
		><span class="a">uint256</span> <span class="b">private constant</span> Y =
		<span class="d">{y}</span>;</span
	>
	<br />
	<span class="i1"
		><span class="b">constructor</span>(<span class="a">address</span> _renderer) {`{`}</span
	>
	<span class="i2">renderer = <span class="d">IRenderer</span>(_renderer);</span>
	{#each canvasesEncoded as asset, i}
		<br />
		<span class="i2 f">// {tabs[i].name}</span>
		<span class="i2"
			>assets[<span class="d">{i}</span>] = [<span class="d">{asset.join(', ')}</span>];</span
		>
		<span class="i2"
			>palettes[<span class="d">{i}</span>] = [<span class="d">{palettesEncoded[i].join(',')}</span
			>];</span
		>
		<span class="i2"
			>colorCounts[<span class="d">{i}</span>] =
			<span class="d">{palettesEncoded[i].length}</span>;</span
		>
	{/each}
	<span class="i1">}</span>
	<br />
	<span class="i1"
		><span class="b">function</span> <span class="d">renderLayers</span>(<span class="a"
			>uint256</span
		>[] <span class="b">memory</span> layerIds)</span
	>
	<span class="i2 b">external</span>
	<span class="i2 b">view</span>
	<span class="i2"
		><span class="c">returns</span> (<span class="a">string</span> <span class="b">memory</span> svg)</span
	>
	<span class="i1">{`{`}</span>
	<span class="i2"
		><span class="a">uint256</span>[] <span class="b">memory</span> composedLayers =
		assets[layerIds[<span class="d">0</span>]];</span
	>
	<span class="i2"
		><span class="a">uint256</span>[] <span class="b">memory</span> composedPalettes =
		palettes[layerIds[<span class="d">0</span>]];</span
	>
	<span class="i2"
		><span class="a">uint256</span> colorCount = colorCounts[layerIds[<span class="d">0</span
		>]];</span
	>
	<span class="i2"><span class="a">uint256</span> nextLayer;</span>
	<br />
	<span class="i2"
		><span class="c">for</span> (<span class="a">uint256</span> i; i {`<`} layerIds.length -
		<span class="d">1</span>; i +=
		<span class="d">1</span>) {`{`}}</span
	>
	<span class="i3">nextLayer = layerIds[i + <span class="d">1</span>];</span>
	<span class="i3">composedLayers = renderer.<span class="d">composeLayers</span>(</span>
	<span class="i4">composedLayers,</span>
	<span class="i4">assets[nextLayer],</span>
	<span class="i4">colorCount,</span>
	<span class="i4">colorCounts[nextLayer],</span>
	<span class="i4">X * Y,</span>
	<span class="i4">COMPRESSION</span>
	<span class="i3">);</span>
	<br />
	<span class="i3">composedPalettes = renderer.<span class="d">composePalettes</span>(</span>
	<span class="i4">composedPalettes,</span>
	<span class="i4">palettes[nextLayer],</span>
	<span class="i4">colorCount,</span>
	<span class="i4">colorCounts[nextLayer]</span>
	<span class="i3">);</span>
	<br />
	<span class="i3">colorCount = colorCount + colorCounts[nextLayer];</span>
	<span class="i2">}</span>
	<br />
	<span class="i2 c">return</span>
	<span class="i3">renderer.<span class="d">render</span>(</span>
	<span class="i4">composedLayers,</span>
	<span class="i4">composedPalettes,</span>
	<span class="i4">X,</span>
	<span class="i4">Y,</span>
	<span class="i4">colorCount,</span>
	<span class="i4">COMPRESSION</span>
	<span class="i3">);</span>
	<span class="i1">}</span>
	<span>}</span>
</div>

<style>
	.a {
		color: #42e2b8;
	}

	.b {
		color: #00a7e1;
	}

	.c {
		color: #7261a3;
	}

	.d {
		color: #ffcb77;
	}

	.e {
		color: #f1a66a;
	}

	.f {
		color: #028090;
	}

	.i1 {
		padding-left: 16px;
	}

	.i2 {
		padding-left: 32px;
	}

	.i3 {
		padding-left: 64px;
	}

	.i4 {
		padding-left: 128px;
	}
</style>

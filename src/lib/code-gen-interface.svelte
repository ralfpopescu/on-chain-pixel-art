<div class="flex flex-col">
	<span class="f">// SPDX-License-Identifier: MIT</span>
	<br />
	<span><span class="c">pragma</span> <span class="b">solidity</span> ^0.8.0;</span>
	<br />
	<span><span class="b">interface</span> IRenderer {'{'}</span>
	<span class="f i1">/**</span>
	<span class="f i1"
		>* <span>@dev</span> Takes an encoded canvas, encoded palette, dimensions, and an optional svg
		extension and <span class="c">returns</span> an svg.</span
	>
	<span class="i1 f">* Dimensions must match what the canvas was encoded with.</span>
	<span class="i1 f"
		>* The svg extension is a <span class="a">string</span> that will be inserted into the {'<svg> '}tag.
	</span>
	<span class="i1 f">Use this for backgrounds, transforms, etc.</span>
	<span class="i1 f">*/</span>
	<span class="i1"><span class="b">function</span> <span class="d">render</span>(</span>
	<span class="i2"><span class="a">uint256</span>[] <span class="b">memory</span> canvas,</span>
	<span class="i2"><span class="a">uint256</span>[] <span class="b">memory</span> palette,</span>
	<span class="i2"><span class="a">uint256</span> xDim,</span>
	<span class="i2"><span class="a">uint256</span> yDim,</span>
	<span class="i2"><span class="a">string</span> <span class="b">memory</span> svgExtension</span>
	<span class="i1"
		>) <span class="b">external view <span class="c">returns</span></span> (<span class="a"
			>string</span
		>
		<span class="b">memory</span> svg);</span
	>
	<br />
	<span class="i1 f">/**</span>
	<span class="i1 f"
		>* <span class="b">@dev</span> Compresses and encodes an array of pixels into an canvas of
		<span class="a">uint256</span>s
	</span>
	<span class="i1 f"> * that can be rendered.</span>
	<span class="i1 f">* For example, a 3x3 image with a plus sign would be: </span>
	<span class="i1 f">* [0, 1, 0, 1, 1, 1, 0, 1, 0]</span>
	<span class="i1 f"
		>* Numbers are indexes into a palette, so say each pixel was a different color:</span
	>
	<span class="i1 f">* [0, 1, 0, 2, 3, 4, 0, 5, 0]</span>
	<span class="i1 f">* Supplied palette would then match the indexes.</span>
	<span class="i1 f"
		>* For example, each of these hex colors would correspond to its respective number
	</span>
	<span class="i1 f">* 0x555555444444333333222222111111</span>
	<span class="i1 f">* So 5 would be 0x555555, 4 0x444444, etc.</span>
	<span class="i1 f">*</span>
	<span class="i1 f">* pixelCompression indicates the max number of pixels in a block. </span>
	<span class="i1 f">* ie. pixelCompression 4 means you can have 2^4 (16) pixels in a block.</span>
	<span class="i1 f">* Use higher pixelCompressions for lots of repeated horizontal pixels.</span>
	<span class="i1 f">Use lower if there aren't many sequential pixels.</span>
	<span class="i1 f"
		>* You may want to try different compressions to get the optimal encoding size.</span
	>
	<span class="i1 f">*</span>
	<span class="i1 f">* colorCount is how many colors are in the array.</span>
	<span class="i1 f">*/</span>
	<span class="i1"><span class="b">function</span> <span class="d">encodeColorArray</span>(</span>
	<span class="i2"><span class="a">uint256</span>[] <span class="b">memory</span> colors,</span>
	<span class="i2"><span class="a">uint256</span> pixelCompression,</span>
	<span class="i2"><span class="a">uint256</span> colorCount</span>
	<span class="i1"
		>) <span class="b">external pure <span class="c">returns</span></span> (<span class="a"
			>uint256</span
		>[]
		<span class="b">memory</span> encoded);</span
	>
	<br />
	<span class="i1">/**</span>
	<span class="i1"
		>* <span class="b">@dev</span> Composes 2 palettes together into one palette.</span
	>
	<span class="i1">*/</span>
	<br />
	<span class="i1"><span class="b">function</span> <span class="d">composePalettes</span>(</span>
	<span class="i2"><span class="a">uint256</span>[] <span class="b">memory</span> palette1,</span>
	<span class="i2"><span class="a">uint256</span>[] <span class="b">memory</span> palette2,</span>
	<span class="i2"><span class="a">uint256</span> colorCount1,</span>
	<span class="i2"><span class="a">uint256</span> colorCount2</span>
	<span class="i1"
		>) <span class="b">external view <span class="c">returns</span></span> (<span class="a"
			>uint256</span
		>[]
		<span class="b">memory</span> composedPalette);</span
	>
	<br />
	<span class="i1 f">/**</span>
	<span class="i1 f"
		>* <span class="b">@dev</span> Composes 2 encoded canvases together into one canvas.</span
	>
	<span class="i1 f">*/</span>
	<br />
	<span class="i1"><span class="b">function</span> <span class="d">composeLayers</span>(</span>
	<span class="i2"><span class="a">uint256</span>[] <span class="b">memory</span> layer1,</span>
	<span class="i2"><span class="a">uint256</span>[] <span class="b">memory</span> layer2,</span>
	<span class="i2"><span class="a">uint256</span> totalPixels</span>
	<span class="i1"
		>) <span class="b">external pure <span class="c">returns</span></span> (<span class="a"
			>uint256</span
		>[]
		<span class="b">memory</span> comp);</span
	>
	<br />
	<span class="i1 f">/**</span>
	<span class="i1 f"
		>* <span class="b">@dev</span> Get number of colors that an encoded canvas contains.</span
	>
	<span class="i f1">*/</span>
	<span class="i1"
		><span class="b">function</span> <span class="d">getColorCount</span>(<span class="a"
			>uint256</span
		>[] <span class="b">memory</span> layer)</span
	>
	<span class="i2 b">external</span>
	<span class="i2 b">view</span>
	<span class="i2"
		><span class="b"><span class="c">returns</span></span> (<span class="a">uint256</span> colorCount);</span
	>
	<br />
	<span class="i1"
		><span class="b">function</span> <span class="d">toString</span>(<span class="a">uint256</span>
		value)
		<span class="b">external pure <span class="c">returns</span></span>
		(<span class="a">string</span> <span class="b">memory</span>);</span
	>
	<br />
	<span class="i1"
		><span class="b">function</span> <span class="d">toHexString</span>(<span class="a"
			>uint256</span
		>
		value) <span class="b">external pure <span class="c">returns</span> </span>(<span class="a"
			>string</span
		>
		<span class="b">memory</span>);</span
	>
	<br />
	<span class="i1"
		><span class="b">function</span> <span class="d">base64Encode</span>(bytes
		<span class="b">memory</span> data)</span
	>
	<span class="i2 b">external</span>
	<span class="i2 b">pure</span>
	<span class="i2 b"><span class="c">returns</span> (<span class="a">string</span> memory);</span>
	<br />
	<span class="i1 f"
		>// use to encode a JSON object into a URI. Use to render metadata on-chain.</span
	>
	<span class="i1 b"
		>function <span class="d">uri</span>(<span class="a">string</span> memory data) external pure
		<span class="c">returns</span> (<span class="a">string</span> memory);</span
	>
	<br />
	<span class="i1 f"
		>// for use in the on-chain metadata URI - encode your svg with this helper.</span
	>
	<span class="i1 b"
		>function <span class="d">uriSvg</span>(<span class="a">string</span> memory data) external pure
		<span class="c">returns</span> (<span class="a">string</span>
		memory);</span
	>
	<span>{'}'}</span>
	<br />
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
		padding-left: 48px;
	}

	.i4 {
		padding-left: 64px;
	}

	.i5 {
		padding-left: 80px;
	}

	.i6 {
		padding-left: 96px;
	}
</style>

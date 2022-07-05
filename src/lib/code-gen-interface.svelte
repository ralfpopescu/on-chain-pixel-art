<div class="flex flex-col">
	<span class="f">// SPDX-License-Identifier: MIT</span>
	<br />
	<span><span class="c">pragma</span> <span class="b">solidity</span> ^0.8.0;</span>
	<br />
	<span><span class="b">interface</span> IRenderer {'{'}</span>
	<span class="f i1">/**</span>
	<span class="f i1"
		>* <span>@dev</span> Takes an encoded canvas, encoded palette, dimensions, and an optional svg extension
		and returns an svg.</span
	>
	<span class="i1">* Dimensions must match what the canvas was encoded with.</span>
	<span class="i1"
		>* The svg extension is a string that will be inserted into the {'<svg> '}tag. Use this for
		backgrounds, transforms, etc.</span
	>
	<span class="i1">*/</span>
	<span class="i1">function render(</span>
	<span class="i2">uint256[] memory canvas,</span>
	<span class="i2">uint256[] memory palette,</span>
	<span class="i2">uint256 xDim,</span>
	<span class="i2">uint256 yDim,</span>
	<span class="i2">string memory svgExtension</span>
	<span class="i1">) external view returns (string memory svg);</span>
	<br />
	<span class="i1">/**</span>
	<span class="i1"
		>* @dev Compresses and encodes an array of pixels into an canvas of uint256s
	</span>
	<span class="i1"> * that can be rendered.</span>
	<span class="i1">* For example, a 3x3 image with a plus sign would be: </span>
	<span class="i1">* [0, 1, 0, 1, 1, 1, 0, 1, 0]</span>
	<span class="i1"
		>* Numbers are indexes into a palette, so say each pixel was a different color:</span
	>
	<span class="i1">* [0, 1, 0, 2, 3, 4, 0, 5, 0]</span>
	<span class="i1">* Supplied palette would then match the indexes.</span>
	<span class="i1"
		>* For example, each of these hex colors would correspond to its respective number
	</span>
	<span class="i1">* 0x555555444444333333222222111111</span>
	<span class="i1">* So 5 would be 0x555555, 4 0x444444, etc.</span>
	<span class="i1">*</span>
	<span class="i1">* pixelCompression indicates the max number of pixels in a block. </span>
	<span class="i1">* ie. pixelCompression 4 means you can have 2^4 (16) pixels in a block.</span>
	<span class="i1">* Use higher pixelCompressions for lots of repeated horizontal pixels.</span>
	<span class="i1">Use lower if there aren't many sequential pixels.</span>
	<span class="i1"
		>* You may want to try different compressions to get the optimal encoding size.</span
	>
	<span class="i1">*</span>
	<span class="i1">* colorCount is how many colors are in the array.</span>
	<span class="i1">*/</span>
	<span class="i1">function encodeColorArray(</span>
	<span class="i2">uint256[] memory colors,</span>
	<span class="i2">uint256 pixelCompression,</span>
	<span class="i2">uint256 colorCount</span>
	<span class="i1">) external pure returns (uint256[] memory encoded);</span>
	<br />
	<span class="i1">/**</span>
	<span class="i1">* @dev Composes 2 palettes together into one palette.</span>
	<span class="i1">*/</span>
	<br />
	<span class="i1">function composePalettes(</span>
	<span class="i2">uint256[] memory palette1,</span>
	<span class="i2">uint256[] memory palette2,</span>
	<span class="i2">uint256 colorCount1,</span>
	<span class="i2">uint256 colorCount2</span>
	<span class="i1">) external view returns (uint256[] memory composedPalette);</span>
	<br />
	<span class="i1">/**</span>
	<span class="i1">* @dev Composes 2 encoded canvases together into one canvas.</span>
	<span class="i1">*/</span>
	<br />
	<span class="i1">function composeLayers(</span>
	<span class="i2">uint256[] memory layer1,</span>
	<span class="i2">uint256[] memory layer2,</span>
	<span class="i2">uint256 totalPixels</span>
	<span class="i1">) external pure returns (uint256[] memory comp);</span>
	<br />
	<span class="i1">/**</span>
	<span class="i1">* @dev Get number of colors that an encoded canvas contains.</span>
	<span class="i1">*/</span>
	<span class="i1">function getColorCount(uint256[] memory layer)</span>
	<span class="i2">external</span>
	<span class="i2">view</span>
	<span class="i2">returns (uint256 colorCount);</span>
	<br />
	<span class="i1">function toString(uint256 value) external pure returns (string memory);</span>
	<br />
	<span class="i1">function toHexString(uint256 value) external pure returns (string memory);</span>
	<br />
	<span class="i1">function base64Encode(bytes memory data)</span>
	<span class="i2">external</span>
	<span class="i2">pure</span>
	<span class="i2">returns (string memory);</span>
	<br />
	<span class="i1">// use to encode a JSON object into a URI. Use to render metadata on-chain.</span
	>
	<span class="i1">function uri(string memory data) external pure returns (string memory);</span>
	<br />
	<span class="i1">// for use in the on-chain metadata URI - encode your svg with this helper.</span
	>
	<span class="i1">function uriSvg(string memory data) external pure returns (string memory);</span>
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
		padding-left: 64px;
	}

	.i4 {
		padding-left: 128px;
	}
</style>

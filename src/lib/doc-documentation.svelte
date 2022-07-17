<div class="flex flex-col gap-2">
	<span class="c text-xs bg-dark2 bg-opacity-50 p-4"
		>Getting value from OnChainPixelArt? Consider donating to
		0xC39043082AdF6D2Ec27F79075C77Fb80A9C03eB0 to support.</span
	>
	<br />
	<span class="a"> OnChainPixelArt Documentation</span>
	<br />
	<span
		>Want to have on-chain pixel art for your Ethereum-based project? Want to dynamically layer
		different images together on-chain for your attribute-based NFT? You’ve come to the right place!
	</span>
	<br />
	<span
		>OnChainPixelArt is not a token, or even a contract you can transact with - it’s an image
		encoding which can render light-weight integers into pixel art.
	</span>
	<br />
	<span>OCPA is simple:</span>
	<ol>
		<li>1. Create pixel art using the editor.</li>
		<li>
			2. Copy-paste the generated code/assets into your smart contract and tweak to your project.
		</li>
		<li>
			3. Use the OnChainPixelArt library or contract wrapper to layer your images together and
			render SVG strings.
		</li>
		<li>
			4. Use the OnChainPixelArt URI encoders to encode metadata and serve directly from the
			blockchain.
		</li>
	</ol>
	<br />
	<span class="a">Using the editor</span>
	<br />
	<span
		>Let’s start with the tabs at the top. Here is where all your layers are. Add new layers by
		clicking the “add layer” button at the very right of your existing tabs. Click on a tab to
		switch. Click on the eye icon to show that layer layered on top of your active layer - drawing
		will only affect the active layer.</span
	>
	<br />
	<span
		>On the left is the sidebar. Each layer will have it’s own separate palette; however, the
		background-color and dimensions are shared among all layers.</span
	>
	<br />
	<span
		>To draw, click on the color in your palette you want to draw with and click/drag on the canvas
		in the center of the editor. The eraser tool is below all your colors.</span
	>
	<br />
	<span
		>Directly above the canvas zone is the name of the layer, which you can edit, and a button to
		delete the layer.</span
	>
	<br />

	<span class="a">Code </span>
	<br />
	<span
		>(Before diving in, the Code-Gen tab provides a comprehensive example of how you can use OCPA.
		Tweaking is likely required for your project!)</span
	>
	<br />
	<span
		>OCPA provides all of its utilities via a library, or a contract which wraps the library. Check
		the Source & Addresses tab to see source code and addresses for the libraries/contracts!</span
	>
	<br />
	<span>Let’s go over the core functions:</span>
	<br />
	<span class="b">render</span>
	<br />
	<span>The core of OCPA is the render function. It accepts 5 parameters:</span>
	<br />
	<span
		><span class="c">canvas</span>: this is the encoded image. This can either be an image encoded
		in the brower editor Code-Gen tab, the function `encodeColorArray`, or a result of composing
		different layers via `composeLayers`.
	</span>
	<br />
	<span
		><span class="c">palette</span>: This is the color palette for the image. The palette encoding
		is simply the hex colors appended together from right to left. You can dynamically create
		palettes (imagine using someone’s address as a color palette), or use the palettes from the code
		generator, which will include the colors you drew the image with.
	</span>
	<br />
	<span
		>It is important that the palette you supply has enough colors to hydrate the original image.
		Each uint256 holds 10 colors, so if your image has 11 colors and you only supply an array with 1
		uint256, you will get an error.
	</span>
	<br />
	<span
		><span class="c">xDim/yDim</span>: x dimension and y dimension. Make sure they match what you
		encoded your images with, or you will get a mess!</span
	>
	<br />
	<span
		><span class="c">svgExtension</span>: This is an optional string which gets injected into the {'<svg>'}
		tag. Use to add backgrounds, transforms, etc.</span
	>
	<br />
	<span class="a">Composing images</span>
	<br />
	<span
		>The power of OCPA comes from being able to compose images together. You can use this feature
		for attribute-based profile pictures for example. The images need to have the same dimensions to
		work correctly. You’ll need 2 functions for this: composeLayers and composePalettes.</span
	>
	<br />
	<span class="b">composeLayers</span>
	<br />
	<span>This function takes 3 parameters: </span>
	<br />
	<span
		><span class="c">layer1</span>: This is the first image you want to layer. This is analogous to
		the render “canvas” argument - it’s an array of uint256s that can either be encoded by the
		editor, `encodeColorArray`, or
	</span>
	<br />
	<span
		><span class="c">layer2</span>: This is the second layer, following the same rules as the first.
		Layer2 will be imposed on top of layer1.</span
	>
	<br />
	<span
		><span class="c">totalPixels</span>: total pixels for the arts (x * y). The actual dimensions
		don’t matter, just the product of the 2!</span
	>
	<br />
	<span class="b">composePalettes</span>
	<br />
	<span><span class="c">palette1</span>: First palette to be composed.</span>
	<span
		><span class="c">palette2</span>: F: Second palette to be composed. Order matters - make sure to
		combine palettes in the same order you combine layers!</span
	>
	<span
		><span class="c">colorCount1</span>: number of colors in the first palette. Since this data is
		encoded in the layer itself, we'll need to supply it explicitly. There is another helper called
		<span class="c">getColorCount</span> that you can pass a canvas into to get the number of colors
		in the image.</span
	>
	<span><span class="c">colorCount2</span>: number of colors in the second palette.</span>
	<br />

	<span class="a">Chaining compositions</span>
	<br />
	<span
		>You can compose more than 2 images together by composing the result of composeLayers with
		another image, and the result of composePalettes with another palette. Check the `renderLayers`
		function in the Code-Gen to see an example.</span
	>
	<br />

	<span class="a">Previewing on-chain</span>
	<br />
	<span
		>To make sure that your images render as expected on-chain, you should render them on-chain in
		the browser.</span
	>
	<br />
	<span
		>Click the “connect” button to left of all your tabs. Once you’ve connected your wallet, you
		should see a “render on-chain” option.
	</span>
	<br />
	<span
		>Click to make a request to the blockchain to render your encoded image on-chain. Click on the
		eye icons of other layers to compose that layer on-chain and render on-chain.</span
	>
	<br />
	<span class="a">On-chain URI encoding</span>
	<br />
	<span
		>If you are making an ERC-721 contract or similar specification, you can use use OCPA to render
		your metadata on-chain in the tokenURI function. Where usually a contract would point to an
		off-chain URL, you can encode the JSON metadata with OCPA’s <span class="c">uri</span> and
		<span class="c">uriSvg</span> helpers that will let your contract serve its metadata directly from
		the chain.
	</span>
	<br />
	<span>Check the Code-Gen <span class="c">MyOnChainNFT.sol</span> contract for an example.</span>
	<br />
	<span class="a">Limitations & Optimization</span>
	<br />
	<span
		>Requests to the blockchain have gas limits - even view functions! Though OCPA has been
		developed with optimization in mind, it is not meant for large, complex pixel arts.
	</span>
	<br />
	<span
		>OCPA can render about 1300 “blocks” of color. A block is a horizontal sequence of identical
		color pixels (it can break into the next line). Therefore, images with lots of horizontal lines
		will be more optimized than images with frequently changing colors or vertical lines.</span
	>
	<br />
	<span
		>If your images are mostly vertical lines, you could draw the svgs turned 90* and rotate it back
		with the svgExtension parameter.</span
	>
	<br />
	<span
		>Below the canvas is an “optimizer” tool as well. It will give you information about your image
		encoding that you can use to draw your image in a more optimal fashion.</span
	>
</div>

<style>
	.a {
		font-weight: 600;
		color: #ffcb77;
	}

	.b {
		color: #00a7e1;
	}

	.c {
		color: #42e2b8;
	}
</style>

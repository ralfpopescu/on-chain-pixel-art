<div class="flex flex-col">
	<span class="f">// SPDX-License-Identifier: GPL-3.0</span>
	<br />
	<span><span class="c">pragma</span> <span class="b">solidity</span> {`>=0.8.0 <0.9.0;`}</span>
	<br />
	<span><span class="c">import</span> <span class="e">"./ERC721Enumerable.sol";</span></span>
	<span><span class="c">import</span> <span class="e">"./Ownable.sol";</span></span>
	<span><span class="c">import</span> <span class="e">"./Strings.sol";</span></span>
	<span><span class="c">import</span> <span class="e">"./IOnChainPixelArt.sol";</span></span>
	<br />
	<span
		><span class="b">contract</span> MyOnChainNFT <span class="b">is</span> ERC721Enumerable,
		Ownable, IOnChainPixelArt {'{'}</span
	>
	<span class="i1">
		<span class="a">uint256</span>[][] <span class="b">public</span> tokenIdToLayers;</span
	>
	<span class="i1"
		><span class="d">IOnChainPixelArt</span> <span class="b">private</span> onChainPixelArt;</span
	>
	<br />
	<span class="i1"
		><span class="b">constructor</span><span class="a">(address</span> _onChainPixelArt) {'{'}</span
	>
	<span class="i2"
		>onChainPixelArt = <span class="d">IOnChainPixelArt</span>(_onChainPixelArt);</span
	>
	<span class="i1">{'}'}</span>
	<br />
	<span class="i1"
		><span class="b">function</span> <span class="d">mint</span>(<span class="a">uint256</span>[]
		layers) <span class="b">external payable </span>{'{'}</span
	>
	<span class="i2"
		><span class="a">uint256</span> tokenId = tokenIdToLayers.length +
		<span class="d">1</span>;</span
	>
	<span class="i2">tokenIdToLayers.<span class="d">push</span>(layers);</span>
	<span class="i2">ERC721.<span class="d">_safeMint</span>(msg.sender, tokenId);</span>
	<span class="i1">{'}'}</span>
	<br />
	<span class="i1"
		><span class="b">function</span> <span class="d">tokenURI</span>(<span class="a">uint256</span>
		tokenId)</span
	>
	<span class="i2 b">public</span>
	<span class="i2 b">view</span>
	<span class="i2 b">override</span>
	<span class="i2"
		><span class="c">returns</span> (<span class="a">string</span>
		<span class="b">memory</span>)</span
	>
	<span class="i1">{'{'}</span>
	<span class="i2"
		>require(ERC721.<span class="d">_exists</span>(tokenId), "token does not exist");</span
	>
	<span class="i2 c">return</span>
	<span class="i3">onChainPixelArt.<span class="d">uri</span>(</span>
	<span class="i4">abi.<span class="d">encodePacked</span>(</span>
	<span class="i5 e">{`'{"name": "My OnChain NFT #,'`}</span>
	<span class="i5">{`onChainPixelArt.toString(tokenId)`},</span>
	<span class="i5 e"
		>{`'", "description": "This is an NFT rendered on-chain with OnChainPixelArt.", "image": "',`}</span
	>
	<span class="i5">onChainPixelArt.<span class="d">uriSvg</span>(</span>
	<span class="i6"
		><span class="d">renderLayers</span>(tokenIdToLayers[tokenId - <span class="d">1</span>])</span
	>
	<span class="i5">),</span>
	<span class="i5 e">{`'" }'`}</span>
	<span class="i4">)</span>
	<span class="i3">{`);`}</span>
	<span class="i1">{'}'}</span>
	<span>{'}'}</span>
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

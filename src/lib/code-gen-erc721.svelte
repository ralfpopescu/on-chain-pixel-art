<div class="flex flex-col">
	<span>// SPDX-License-Identifier: GPL-3.0</span>
	<br />
	<span>{`pragma solidity >=0.8.0 <0.9.0;`}</span>
	<br />
	<span>import "./ERC721Enumerable.sol";</span>
	<span>import "./Ownable.sol";</span>
	<span>import "./Strings.sol";</span>
	<span>import "./IOnChainPixelArt.sol";</span>
	<br />
	<span>contract MyOnChainNFT is ERC721Enumerable, Ownable, IOnChainPixelArt {'{'}</span>
	<span class="i1"> uint256[][] public tokenIdToLayers;</span>
	<span class="i1">IOnChainPixelArt private onChainPixelArt;</span>
	<br />
	<span class="i1">constructor(address _onChainPixelArt) {'{'}</span>
	<span class="i2">onChainPixelArt = IOnChainPixelArt(_onChainPixelArt);</span>
	<span class="i1">{'}'}</span>
	<br />
	<span class="i1">function mint(uint256[] layers) external payable {'{'}</span>
	<span class="i2">uint256 tokenId = tokenIdToLayers.length + 1;</span>
	<span class="i2">tokenIdToLayers.push(layers);</span>
	<span class="i2">ERC721._safeMint(msg.sender, tokenId);</span>
	<span class="i1">{'}'}</span>
	<br />
	<span class="i1">function tokenURI(uint256 tokenId)</span>
	<span class="i2">public</span>
	<span class="i2">view</span>
	<span class="i2">override</span>
	<span class="i2">returns (string memory)</span>
	<span class="i1">{'{'}</span>
	<span class="i2">require(ERC721._exists(tokenId), "token does not exist");</span>
	<span class="i2">return</span>
	<span class="i3">onChainPixelArt.uri(</span>
	<span class="i4">abi.encodePacked(</span>
	<span class="i5">{`{"name": "My OnChain NFT #,`}</span>
	<span class="i5">{`onChainPixelArt.toString(tokenId)`},</span>
	<span class="i5"
		>{`'", "description": "This is an NFT rendered on-chain with OnChainPixelArt.", "image": "',`}</span
	>
	<span class="i5">{`onChainPixelArt.uriSvg(`}</span>
	<span class="i6">{`renderLayers(tokenIdToLayers[tokenId - 1])`}</span>
	<span class="i5">),</span>
	<span class="i5">{`'" }'`}</span>
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

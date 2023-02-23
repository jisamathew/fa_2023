// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

// import "@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol";
import "@openzeppelin/contracts/drafts/Counters.sol";

contract MyToken is ERC721Full {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721Full("MyNFT", "MNFT") {
     
    }

    event TokenMinted(uint256 indexed tokenId);

    //Get unique application number on application form
    function getApplicationNo() public returns (uint256) {
           _tokenIds.increment();
        return _tokenIds.current();
        // _tokenIds.increment();
        // uint256 newApplicationNo = _tokenIds.current();
        // return newApplicationNo;
    }

    //Create token for an application which can be tracked
    //call this function from function within other contract

    function mintToken(address owner, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
       _tokenIds.increment();
        _mint(owner, newItemId);
        //set token with its URI -JSON format
        _setTokenURI(newItemId, tokenURI);
        
        _tokenIds.increment();

        uint256 newItemId2 = _tokenIds.current();
        emit TokenMinted(newItemId);

        return newItemId2;
    }

    function burnToken(address owner, uint256 tokenId) public returns (bool) {
        _burn(owner, tokenId);

        return true;
    }

    function transferToken(address _contractAddress, uint256 _tokenId)
        external
    {
        ERC721 token = ERC721(_contractAddress);

        require(token.balanceOf(msg.sender) > 0, "Caller must own nft");
        require(
            token.ownerOf(_tokenId) == msg.sender,
            "You must own the token"
        );

        token.transferFrom(msg.sender, address(this), _tokenId);
    }
    //set token with its URI -JSON format
    //_setTokenURI(newItemId, tokenURI);
    //https://ipfs.io/ipfs/ipfshash - tokenuri
	function ownerofToken(uint256 tokenId) public returns(address){
		return ownerOf(tokenId);
	}
    }

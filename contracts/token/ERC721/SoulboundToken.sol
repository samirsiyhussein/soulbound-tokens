// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./SBT_ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract SoulboundToken is SBT_ERC721, Ownable {
  
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdCounter;
  
  constructor(bool default_minting_locking_status) SBT_ERC721(default_minting_locking_status, "SoulboundToken", "SBT") {
    safeMint(msg.sender);
  }

  /**
   * Mint 1 token to owner
   */
  function safeMint(address to) public onlyOwner {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(to, tokenId);
  }


  /**
   * @notice Change locking status to locked
   * @param tokenId The identifier for an SBT
   */
  function lockToken(uint256 tokenId) public onlyOwner {
    _lockToken(tokenId);
  }

  /**
   * @notice Change locking status to unlocked
   * @param tokenId The identifier for an SBT
   */
  function unlockToken(uint256 tokenId) public onlyOwner {
    _unlockToken(tokenId);
  }
  
}

# Solidity - SoulBound Tokens Development

Use of hardhat for development, deployment and testing Soulbound Tokens interfaces with NFTs standards (ERC721 & ERC1155).



## Soulbound Tokens Interfaces

Testing the various Soulbound tokens interfaces as proposed in [Decentralized Society: Finding Web3's Soul](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4105763)

### EIPs test list

- [EIP-5484: Consensual Soulbound Tokens](https://eips.ethereum.org/EIPS/eip-5484) Statut: Final
- [EIP-5192: Minimal Soulbound NFTs](https://eips.ethereum.org/EIPS/eip-5192) Statut: Final
- [EIP-5516: Soulbound Multi-owner Tokens](https://eips.ethereum.org/EIPS/eip-5516) Statut: Review
- [EIP-5114: Soulbound Badge](https://eips.ethereum.org/EIPS/eip-5114) Statut: Draft (*Experimental*)
- [EIP-5727: Semi-Fungible Soulbound Token](https://eips.ethereum.org/EIPS/eip-5727) Statut: Draft (*Experimental*)
- [EIP-5633: Composable Soulbound NFT, EIP-1155 Extension](https://eips.ethereum.org/EIPS/eip-5633) Statut: Draft (*Experimental*)

## Test on ERC721

1. Implement the minimal for token to be a SBT (EIP-5192 -> Final)
2. Implement burning mechanism (EIP-5484 -> Final)

## Development SBT_ERC721
- Implement lockToken & unlockToken functions to change locking status (by contract owner)
- Implement locked function 
- Add immutable variable for default locking status on minting (otherwise by default will always be unlocked)
- Update ERC-721 constructor to initiliaze default locking status variable


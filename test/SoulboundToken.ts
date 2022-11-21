import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

/**
 * Default contract setup:
 * Use ownable for ACL
 * Use of counter for incrementing tokens Ids
 * Token ID 0 minted to owner account on deployment
 * Changing token locking status are made by function call
 */ 

describe("SoulboundToken contract", function () {
  
  // Define a fixture to reuse the same setup in every test
  async function deploySBTFixture () {
    // Contracts are deployed using the first signer/account by default
    const [owner, addr1, addr2] = await ethers.getSigners();
    
    const SoulboundToken = await ethers.getContractFactory("SoulboundToken")
    const soulboundToken = await SoulboundToken.deploy();

    return { soulboundToken, owner, addr1, addr2 }
  }

  // Verify that Unlocked event is fired when minting token
  it("Should emit Unlock event on token mint when locking status is unlocked", async function () {
    const { soulboundToken, owner } = await loadFixture(deploySBTFixture);

    await expect(soulboundToken.safeMint(owner.address))
      .to.emit(soulboundToken, "Unlocked");
  })

  // Verify that 
  it("Should revert with string message if status is already unlocked", async function () {
    const { soulboundToken, owner } = await loadFixture(deploySBTFixture);

    await expect(soulboundToken.unlockToken(0)).to.be.reverted;
  })

  // Verify that token is unlocked
  // Transfer token to other account
  // Verify that owner of token is other account
  it("Should allow token transfer when token unlocked", async function () {
    const { soulboundToken, owner, addr1 } = await loadFixture(deploySBTFixture);
    
    expect(await soulboundToken.locked(0)).equal(false);
    await soulboundToken.transferFrom(owner.address, addr1.address, 0);
    expect(await soulboundToken.ownerOf(0)).to.equal(addr1.address);
  })

  // Lock token
  // Verify that token is locked
  it("Should lock token and return locking status true", async function() {
    const { soulboundToken, owner } = await loadFixture(deploySBTFixture);

    await soulboundToken.lockToken(0);
    expect(await soulboundToken.locked(0)).equal(true);
  })

  // Verify that changing locking status from unlocked to locked emit Locked event
  it("Should emit Locked event on token locking status changed to locked", async function () {
    const { soulboundToken, owner } = await loadFixture(deploySBTFixture);

    await expect(soulboundToken.lockToken(0))
      .to.emit(soulboundToken, "Locked");
  })
  
  // Lock token
  // Verify that token cannot be transfered when locked
  // Verify that token has not been transfered
  it("Should revert transaction when token is locked & token not be transfered", async function () {
    const { soulboundToken, owner, addr1 } = await loadFixture(deploySBTFixture);

    await soulboundToken.lockToken(0);
    await expect(soulboundToken.transferFrom(owner.address, addr1.address, 0)).to.be.reverted;
    expect(await soulboundToken.ownerOf(0)).to.equal(owner.address);
  })

  // Interface EIP-5192 support verification
  it("Should return true on supportsInterface for EIP-721 with InterfaceId=0xb45a3c0e", async function () {
    const { soulboundToken, owner, addr1 } = await loadFixture(deploySBTFixture);

    expect(await soulboundToken.supportsInterface("0xb45a3c0e")).equal(true);
  })

})
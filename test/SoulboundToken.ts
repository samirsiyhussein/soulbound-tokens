import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';

// TEST NOT PASSING ERROR MESSAGE:
// FixtureSnapshotError: There was an error reverting the snapshot of the fixture.
// This might be caused by using nested loadFixture calls in a test, for example by using multiple beforeEach calls. This is not supported yet.

/**
 * Default contract setup:
 * Use ownable for ACL
 * Use of counter for incrementing tokens Ids
 * Token ID 0 minted to owner account on deployment
 * Changing token locking status are made by function call
 */ 

describe("SoulboundToken contract", function () {
  
  // Fixture with locked default minting 
  async function deploySoulboundTokenLockedFixture () {
    
    const [owner, addr1] = await ethers.getSigners();
    
    const SoulboundToken = await ethers.getContractFactory("SoulboundToken");
    const soulboundToken = await SoulboundToken.deploy(true);

    return { soulboundToken, owner, addr1 }
  }

  // Fixture with unlocked default minting 
  async function deploySoulboundTokenUnlockedFixture () {
    
    const [owner, addr1] = await ethers.getSigners();
    
    const SoulboundToken = await ethers.getContractFactory("SoulboundToken")
    const soulboundToken = await SoulboundToken.deploy(false);

    return { soulboundToken, owner, addr1 }
  }

  describe("Locked event", function () {
    
    it("Should emit Locked event on token locking status changed to locked", async function () {
      const { soulboundToken } = await loadFixture(deploySoulboundTokenUnlockedFixture);

      await expect(soulboundToken.lockToken(0))
        .to.emit(soulboundToken, "Locked");
    })

    it("Should emit Lock event on token mint when locking status is locked", async function () {
      const { soulboundToken, owner } = await loadFixture(deploySoulboundTokenLockedFixture);
  
      await expect(soulboundToken.safeMint(owner.address))
        .to.emit(soulboundToken, "Locked");
    })

  })
  
  describe("Unlocked event", function () {

    it("Should emit Unlocked event when locking status is changed to unlocked", async function () {
      const { soulboundToken } = await loadFixture(deploySoulboundTokenLockedFixture);
  
      await expect(soulboundToken.unlockToken(0))
        .to.emit(soulboundToken, "Unlocked");
    })

    it("Should emit Unlock event on token mint when locking status is unlocked", async function () {
      const { soulboundToken, owner } = await loadFixture(deploySoulboundTokenUnlockedFixture);
  
      await expect(soulboundToken.safeMint(owner.address))
        .to.emit(soulboundToken, "Unlocked");
    })

  })
  
  describe("Lock function", function () {
    
    it("Should lock token and return locking status true", async function() {
      const { soulboundToken, owner } = await loadFixture(deploySoulboundTokenUnlockedFixture);
      
      expect(await soulboundToken.locked(0)).equal(false);
      await soulboundToken.lockToken(0);
      expect(await soulboundToken.locked(0)).equal(true);
    })

    it("Should revert with string message if locking status is already locked", async function () {
      const { soulboundToken } = await loadFixture(deploySoulboundTokenLockedFixture);
  
      expect(await soulboundToken.lockToken(0)).to.be.reverted;
    })

  })

  describe("Unlock function", function () {

    it("Should revert with string message if locking status is already unlocked", async function () {
      const { soulboundToken, owner } = await loadFixture(deploySoulboundTokenUnlockedFixture);
  
      await expect(soulboundToken.unlockToken(0)).to.be.reverted;
    })

    it("Should unlock token and return locking status false", async function() {
      const { soulboundToken, owner } = await loadFixture(deploySoulboundTokenLockedFixture);
      
      expect(await soulboundToken.locked(0)).equal(true);
      await soulboundToken.unlockToken(0);
      expect(await soulboundToken.locked(0)).equal(false);
    })

  })

  describe("Locked function", function () {
    it("Should revert with string message if SBT assigned to zero address", async function () {
      const { soulboundToken, owner } = await loadFixture(deploySoulboundTokenLockedFixture);

      await expect(soulboundToken.locked(1)).to.be.reverted;
    })
  })
  
  describe("Transfer functions", function () {
    it("Should allow token transfer when token unlocked", async function () {
      const { soulboundToken, owner, addr1 } = await loadFixture(deploySoulboundTokenUnlockedFixture);
      
      expect(await soulboundToken.locked(0)).equal(false);
      await soulboundToken.transferFrom(owner.address, addr1.address, 0);
      expect(await soulboundToken.ownerOf(0)).to.equal(addr1.address);
    })

    it("Should not allow transfer when token is locked & token not be transfered", async function () {
      const { soulboundToken, owner, addr1 } = await loadFixture(deploySoulboundTokenLockedFixture);
  
      expect(await soulboundToken.locked(0)).equal(true);
      await expect(soulboundToken.transferFrom(owner.address, addr1.address, 0)).to.be.reverted;
      expect(await soulboundToken.ownerOf(0)).to.equal(owner.address);
    })

  })
  

  describe("Interface support", function () {
    
    it("Should return true on supportsInterface for EIP-721 with InterfaceId=0xb45a3c0e", async function () {
      const { soulboundToken } = await loadFixture(deploySoulboundTokenUnlockedFixture);

      expect(await soulboundToken.supportsInterface("0xb45a3c0e")).equal(true);
    })

  })

})
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { sbtLocked, sbtUnlocked } from './fixtures';

describe("Interface implementation", function () {

  describe("Locked function", function () {
    it("Should revert with string message if SBT assigned to zero address", async function () {
      const { soulboundToken, owner } = await loadFixture(sbtLocked);

      await expect(soulboundToken.locked(1000)).to.be.reverted;
    })
  })
  
  describe("Transfer functions", function () {
    it("Should allow token transfer when token unlocked", async function () {
      const { soulboundToken, owner, addr1 } = await loadFixture(sbtUnlocked);
      
      expect(await soulboundToken.locked(0)).equal(false);
      await soulboundToken.transferFrom(owner.address, addr1.address, 0);
      expect(await soulboundToken.ownerOf(0)).to.equal(addr1.address);
    })

    it("Should not allow transfer when token is locked & token not be transfered", async function () {
      const { soulboundToken, owner, addr1 } = await loadFixture(sbtLocked);
  
      expect(await soulboundToken.locked(0)).equal(true);
      expect(await soulboundToken.ownerOf(0)).equal(owner.address);
      await expect(soulboundToken.transferFrom(owner.address, addr1.address, 0)).to.be.reverted;
    })

  })
  

  describe("Interface support", function () {
    
    it("Should return true on supportsInterface for EIP-721 with InterfaceId=0xb45a3c0e", async function () {
      const { soulboundToken } = await loadFixture(sbtUnlocked);

      expect(await soulboundToken.supportsInterface("0xb45a3c0e")).to.equal(true);
    })

  })
})
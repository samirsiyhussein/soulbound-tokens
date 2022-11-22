import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { sbtLocked, sbtUnlocked } from './fixtures';

describe("Default locking status locked", function () { 
  
  describe("Locked event", function () {
    
    it("Should emit Locked event on token locking status changed to locked", async function () {
      const { soulboundToken } = await loadFixture(sbtUnlocked);

      await expect(soulboundToken.lockToken(0))
        .to.emit(soulboundToken, "Locked");
    })

    it("Should emit Lock event on token mint when locking status is locked", async function () {
      const { soulboundToken, owner } = await loadFixture(sbtLocked);
  
      await expect(soulboundToken.safeMint(owner.address))
        .to.emit(soulboundToken, "Locked");
    })

  })

  describe("Lock function", function () {
    
    it("Should lock token and return locking status true", async function() {
      const { soulboundToken, owner } = await loadFixture(sbtUnlocked);
      
      expect(await soulboundToken.locked(0)).equal(false);
      await soulboundToken.lockToken(0);
      expect(await soulboundToken.locked(0)).equal(true);
    })

    it("Should revert with string message if locking status is already locked", async function () {
      const { soulboundToken } = await loadFixture(sbtLocked);
      
      await expect(soulboundToken.lockToken(0)).to.be.reverted;
    })

  })

})
// import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
// import { expect } from 'chai';
// import { sbtLocked, sbtUnlocked } from './fixtures';

// describe("Default locking status unlocked", function () {
  
  
//   describe("Unlocked event", function () {

//     it("Should emit Unlocked event when locking status is changed to unlocked", async function () {
//       const { soulboundToken } = await loadFixture(sbtLocked);
  
//       await expect(soulboundToken.unlockToken(0))
//         .to.emit(soulboundToken, "Unlocked");
//     })

//     it("Should emit Unlock event on token mint when locking status is unlocked", async function () {
//       const { soulboundToken, owner } = await loadFixture(sbtUnlocked);
  
//       await expect(soulboundToken.safeMint(owner.address))
//         .to.emit(soulboundToken, "Unlocked");
//     })

//   })
  
  
//   describe("Unlock function", function () {

//     it("Should revert with string message if locking status is already unlocked", async function () {
//       const { soulboundToken, owner } = await loadFixture(sbtUnlocked);
  
//       await expect(soulboundToken.unlockToken(0)).to.be.reverted;
//     })

//     it("Should unlock token and return locking status false", async function() {
//       const { soulboundToken, owner } = await loadFixture(sbtLocked);
      
//       expect(await soulboundToken.locked(0)).to.equal(true);
//       await soulboundToken.unlockToken(0);
//       expect(await soulboundToken.locked(0)).to.equal(false);
//     })

//   }) 

// })
import { ethers } from 'hardhat';
// Fixture with locked default minting 
export const sbtLocked = async function deploySoulboundTokenLockedFixture () {
  
  const [owner, addr1] = await ethers.getSigners();
  
  const SoulboundToken = await ethers.getContractFactory("SoulboundToken");
  const soulboundToken = await SoulboundToken.deploy(true);

  return { soulboundToken, owner, addr1 }
}

// Fixture with unlocked default minting 
export const sbtUnlocked = async function deploySoulboundTokenUnlockedFixture () {
  
  const [owner, addr1] = await ethers.getSigners();
  
  const SoulboundToken = await ethers.getContractFactory("SoulboundToken")
  const soulboundToken = await SoulboundToken.deploy(false);

  return { soulboundToken, owner, addr1 }
}

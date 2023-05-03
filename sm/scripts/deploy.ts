import { ethers } from "hardhat";

async function main() {

  const Boneboss = await ethers.getContractFactory("boneboss");
  const boneboss = await Boneboss.deploy("boneboss","0x13D8CaF1EaBcCBBD00d1E6D2dbB4dc4FECF2a022");

  await boneboss.deployed();
  const txhash = boneboss.deployTransaction.hash;
  const txReceipt = await ethers.provider.waitForTransaction(txhash);
  console.log(`Contract deployed to :${'https://sepolia.etherscan.io/address/'+txReceipt.contractAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

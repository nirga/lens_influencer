// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const hubAddr = "0x038B86d9d8FAFdd0a02ebd1A476432877b0107C8";

  console.log("\n\t-- Deploying InfluencerRankingContract --");

  const InfluencerRankingContract = await hre.ethers.getContractFactory(
    "InfluencerRankingContract"
  );
  const influencerRankingContract = await InfluencerRankingContract.deploy();
  await influencerRankingContract.deployed();

  console.log(
    `InfluencerRankingContract address = ${influencerRankingContract.address}`
  );

  console.log("\n\t-- Deploying InfluencerReferenceModule --");

  const InfluencerReferenceModule = await hre.ethers.getContractFactory(
    "InfluencerReferenceModule"
  );
  const influencerReferenceModule = await InfluencerReferenceModule.deploy(
    hubAddr,
    influencerRankingContract.address
  );
  await influencerReferenceModule.deployed();

  console.log(
    `InfluencerReferenceModule address = ${influencerReferenceModule.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

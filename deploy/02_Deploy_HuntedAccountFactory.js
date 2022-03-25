const { network } = require("hardhat");
const {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config");
const { verify } = require("../helper-functions");
const { get } = require("react-hook-form");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  //set log level to ignore non errors
  ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR);

  const lensHub = networkConfig[chainId]["lensHub"];
  const mockProfileCreationProxy =
    networkConfig[chainId]["mockProfileCreationProxy"];
  const feeFollowModule = networkConfig[chainId]["feeFollowModule"];
  const twitterVerifier = (await get("TwitterVerifier")).address;

  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;
  const args = [
    lensHub,
    mockProfileCreationProxy,
    feeFollowModule,
    twitterVerifier,
  ];
  const huntedAccountFactory = await deploy("HuntedAccountFactory", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying...");
    await verify(huntedAccountFactory.address, args);
  }

  log(`Deployed to ${huntedAccountFactory.address}`);
  log("----------------------------------------------------");
};
module.exports.tags = ["all", "api", "main"];

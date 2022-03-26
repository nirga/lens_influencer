const { network } = require("hardhat");
const {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config");
const { verify } = require("../helper-functions");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  //set log level to ignore non errors
  ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR);

  console.log(`chainId = ${chainId}`);
  const linkTokenAddress = networkConfig[chainId]["linkToken"];
  const oracle = networkConfig[chainId]["oracle"];

  const jobId = ethers.utils.toUtf8Bytes(networkConfig[chainId]["jobId"]);
  const fee = networkConfig[chainId]["fee"];

  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;
  const args = [oracle, jobId, fee, linkTokenAddress];
  const twitterVerifier = await deploy("TwitterVerifier", {
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
    await verify(twitterVerifier.address, args);
  }

  log("Run Twitter Verifier contract with following command:");
  const networkName = network.name == "hardhat" ? "localhost" : network.name;
  log(
    `npx hardhat twitter-verify --contract ${twitterVerifier.address} --tweetid 1505977175488483339 --challenge Berlin --username elonmusk --network ${networkName}`
  );
  log("----------------------------------------------------");
};
module.exports.tags = ["all", "api", "main"];

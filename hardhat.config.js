require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("@appliedblockchain/chainlink-plugins-fund-link");
require("./tasks");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/*task("deploy", "Deploy Everything").setAction(async ({}, hre) => {
  const lensHub = process.env.LENS_HUB;

  console.log("Lens Hub:", lensHub);

  await hre.run("compile");

  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const HuntedAccountFactory = await hre.ethers.getContractFactory(
    "HuntedAccountFactory"
  );
  const huntedAccountFactory = await HuntedAccountFactory.deploy(lensHub);

  await huntedAccountFactory.deployed();

  console.log(
    "HuntedAccountFactory deployed to:",
    huntedAccountFactory.address
  );
});
*/
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    mumbai: {
      url: MUMBAI_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 80001,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    feeCollector: {
      default: 1,
    },
  },
  solidity: "0.8.10",
};

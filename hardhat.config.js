require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("@appliedblockchain/chainlink-plugins-fund-link");
require("./tasks");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

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
  solidity: {
    compilers: [
      {
        version: "0.8.10",
      },
    ],
  },
};

const networkConfig = {
  default: {
    name: "hardhat",
    fee: "100000000000000000",
    keyHash:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    jobId: "29fa9aa13bf1468788b7cc4a500a45b8",
    fundAmount: "1000000000000000000",
    keepersUpdateInterval: "30",
  },
  31337: {
    name: "localhost",
    fee: "100000000000000000",
    keyHash:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    jobId: "29fa9aa13bf1468788b7cc4a500a45b8",
    fundAmount: "1000000000000000000",
    keepersUpdateInterval: "30",
    ethUsdPriceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  },
  80001: {
    name: "mumbai",
    linkToken: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    oracle: "0x0bDDCD124709aCBf9BB3F824EbC61C87019888bb",
    jobId: "a79e6eaf562f4be981d601cfbf8f8d84",
    fee: "100000000000000000",
    fundAmount: "10000000000000000",
    lensHub: "0xd7B3481De00995046C7850bCe9a5196B7605c367",
  },
};

const developmentChains = ["hardhat", "localhost"];
const VERIFICATION_BLOCK_CONFIRMATIONS = 6;

module.exports = {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
};

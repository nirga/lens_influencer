const networkConfig = {
  default: {
    name: "hardhat",
    fee: "100000000000000000",
    keyHash:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    jobId: "29fa9aa13bf1468788b7cc4a500a45b8",
    fundAmount: "1000000000000000000",
    keepersUpdateInterval: "30",
    lensHub: ethers.constants.ZERO_ADDRESS,
    mockProfileCreationProxy: ethers.constants.ZERO_ADDRESS,
    feeFollowModule: ethers.constants.ZERO_ADDRESS,
  },
  80001: {
    name: "mumbai",
    linkToken: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
    oracle: "0x0bDDCD124709aCBf9BB3F824EbC61C87019888bb",
    jobId: "52d54fc095ad4327a092354b31ee1d3e",
    fee: "100000000000000000",
    fundAmount: "10000000000000000",
    lensHub: "0xd7B3481De00995046C7850bCe9a5196B7605c367",
    mockProfileCreationProxy: "0x9BB48d8F9c4596b98C8bB1fB6D67aaE238F81CC2",
    feeFollowModule: "0xfb7A602c73Ab80b314588A94574F26E7E459C236",
  },
};

const developmentChains = ["hardhat", "localhost"];
const VERIFICATION_BLOCK_CONFIRMATIONS = 6;

module.exports = {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
};

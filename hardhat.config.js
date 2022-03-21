require("@nomiclabs/hardhat-ethers");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

task("deploy").setAction(async ({}, hre) => {
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

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.10",
};
